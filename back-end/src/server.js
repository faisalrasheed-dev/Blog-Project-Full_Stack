import cors from 'cors';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const serviceAccountKey = JSON.parse(
  fs.readFileSync('./serviceAccountKey.json')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
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



// ✅ Get article by name
app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ articleName: name });
  res.json(article);
});


// ✅ Middleware for authentication (Option 1 - lowercase authtoken)
app.use(async (req, res, next) => {
  const token = req.headers.authtoken;  // 👈 axios sends lowercase headers
  if (token) {
    try {
      const user = await admin.auth().verifyIdToken(token);
      req.user = user;
      return next();
    } catch (e) {
      console.error("Invalid token:", e);
      return res.sendStatus(401); // invalid token
    }
  } else {
    return res.sendStatus(400); // no token
  }
});

// ✅ Upvote article (only once per user)
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
    res.sendStatus(401); // already upvoted
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
