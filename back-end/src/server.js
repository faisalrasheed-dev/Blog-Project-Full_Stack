import cors from 'cors';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv'
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
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ articleName: name });
  res.json(article);
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
app.post('/api/articles/:name/upvotes', async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection('articles').findOne({ articleName: name });
  const upvoteIds = article.upvoteIds || [];
  const canUpvote = uid && !upvoteIds.includes(uid);

  if (canUpvote) {
    await db.collection('articles').updateOne(
      { articleName: name },
      {
        $inc: { upvotes: 1 },
        $push: { upvoteIds: uid },
      }
    );
    const updatedArticle = await db
      .collection('articles')
      .findOne({ articleName: name });
    res.json(updatedArticle);
  } else {
    res.sendStatus(401); 
  }
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { text } = req.body;
  const {email}=req.user


  const newComment = { postedBy:email,text };

  await db.collection('articles').updateOne(
    { articleName: name },
    { $push: { comments: newComment } }
  );

  const updatedArticle = await db
    .collection('articles')
    .findOne({ articleName: name });

  res.json(updatedArticle);
});

const startServer = async () => {
  const PORT=process.env.PORT || 8000
  await connectionDB();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startServer();
