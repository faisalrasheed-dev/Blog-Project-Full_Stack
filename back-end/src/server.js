import cors from 'cors';
import express from 'express';
import { MongoClient, ServerApiVersion , ObjectId} from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv'
import { create } from 'domain';
dotenv.config()

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
const decodedServiceAccount = Buffer.from(serviceAccountBase64, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(decodedServiceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(cors());
app.use(express.json());

let db;

const connectionDB = async () => {
  const uri = process.env.MONGO_URI ||"mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });
  await client.connect();
  db = client.db('full-stack-react-app');
};
app.get('/api/articles/top-articles',async(req,res)=>{
  try{
    const article=await db.collection('articles').find({}).sort({upvotes:-1,createdAt:-1}).limit(10).toArray()
    res.json(article || [])
  }
  catch(e){
    console.log(e)
    res.status(500).json({status:false,message:"failed"})
  }
  
})

app.get('/api/articles', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalArticles = await db.collection('articles').countDocuments();

    const articles = await db.collection('articles')
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({
      articles,
      page,
      totalPages: Math.ceil(totalArticles / limit),
    });

  } catch (e) {
    console.error("Error fetching articles:", e);
    res.status(500).json({
      status: false,
      message: "Article showing Failed"
    });
  }
});

app.use(async (req, res, next) => {
  const token = req.headers.authtoken; 
  if (token) {
    try {
      const user = await admin.auth().verifyIdToken(token);
      req.user = user;
      return next();
    } catch (e) {
      console.error("Invalid token:", e);
      return res.sendStatus(401); 
    }
  } else {
    return res.sendStatus(400); 
  }
});
app.get('/api/articles/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const skip=parseInt(req.query.skip) || 0
    const limit=parseInt(req.query.limit) || 5
    const article = await db.collection('articles').findOne({ _id: new ObjectId(id) });
    const totalComments=article.comments.length
    const paginatedComments = article.comments.slice(skip, skip + limit);
    res.json({article:{...article,
    comments: paginatedComments },totalComments});
  }catch(e){
    res.status(500).json({status:false,message:"failed to load article"})
  }
  
});
app.post('/api/articles/:id/upvotes', async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user;

    if (!uid) return res.sendStatus(401);
    
    const article = await db.collection('articles').findOne({_id: new ObjectId(id)});
    if (!article) return res.status(404).json({ status: false, message: 'Article not found' });
    
    const upvoteIds = article.upvoteIds || [];
    let result;

    if (upvoteIds.includes(uid)) {
      result = await db.collection('articles').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { upvotes: -1 }, $pull: { upvoteIds: uid } },
        { returnDocument: "after" }
      );
      }
    else {
      result = await db.collection('articles').findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } },
        { returnDocument: "after" }
      );
    }
    
    const updatedArticle = await db.collection('articles').findOne({ _id: new ObjectId(id) });
    res.json(updatedArticle)
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to upvote' });
  }
});


app.post('/api/addarticle', async(req,res)=>{
  const{title,content}=req.body
  const {email}=req.user
  if(content.trim().split(/\s+/).length<50){
    return res.status(400).json({success:false,message:"Content must contain 50 words"})
  }
  try{
    const addNew={
      articleName:title,
      content,
      author:email,
      upvotes:0,
      comments:[],
      upvoteIds:[],
      createdAt:new Date()
      
    }
    const savedArticle=await db.collection('articles').insertOne(addNew)
    res.json({ success: true, message: "Article added successfully" });
    console.log("article added successfully")

  }catch(e){
    console.log("error",e)
  }
})

app.post('/api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const {email}=req.user


  const newComment = { postedBy:email,text };

  await db.collection('articles').updateOne(
    { _id: new ObjectId(id) },
    { $push: { comments: newComment } }
  );

  const updatedArticle = await db
    .collection('articles')
    .findOne({ _id: new ObjectId(id) });

  res.json(updatedArticle);
});
app.get('/api/profile',async (req,res)=>{
  try{
    const {email}=req.user
    if (!req.user) return res.status(401).json({ status: false, message: "Unauthorized" });
    const limit=parseInt(req.query.limit) || 5
    const skip=parseInt(req.query.skip) || 0
    const totalArticles=await db.collection('articles').countDocuments({author:email})
    const articles=await db.collection('articles').find({author:email}).
    sort({createdAt:-1}).skip(skip).limit(limit).toArray()
    res.json({articles,totalArticles})
  }
  catch(e){
    console.log(e)
    res.status(500).json({status:false,message:"failed to fetch profile"})
  }
})
app.delete('/api/articles/:id',async(req,res)=>{
  const {id}=req.params
  try{
    const response=await db.collection("articles").deleteOne({_id:new ObjectId(id)})
    res.json({status:true,message:"deleted successfully"})
  }
  catch(e){
    console.log(e)
    res.status(404).json({status:false,message:"failed to delete"})
  }
})
app.put('/api/articles/edit-article/:id',async (req,res)=>{
  const{id}=req.params
  const{title,content}=req.body
  try{
    const response=await db.collection('articles').updateOne({_id: new ObjectId(id)},
    {$set:{articleName:title,content:content}})
    if(response.modifiedCount===0){
      return res.status(404).json({status:false,message:"Article not found or Nothing Changed"})
    }
    res.json({status:true,message:"successfully updated"})
  }catch(e){
    console.log(e)
    res.status(500).json({status:false,message:"failed to update article"})
  }
})



const startServer = async () => {
  const PORT=process.env.PORT || 8000
  await connectionDB();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startServer();
