Blog Platform (MERN Stack)

Overview

A full-stack blogging platform developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Vite. Users can create, manage articles, upvote, and comment on articles. Authentication is handled via Firebase, and global state is managed using Context API.


---

Features

User Authentication: Login and Register via Firebase

Article Management: Users can create, view, edit, and delete their articles

Profile Page:

Displays total articles uploaded

Shows articles 8 at a time with "Load More" if there are more

Each article includes Edit and Delete options


Pagination & Load More: Articles and comments support pagination and "load more" buttons

Upvotes & Comments: Upvote toggle functionality and comments with load more for more than 5 comments

Trending & Recent Articles: Homepage shows top 10 trending (most upvotes) and most recent articles

Dynamic Routing: Each article links to its individual page

Responsive Design: Tailwind CSS, hamburger menu for mobile, reusable components

Loader & Authentication Check: Shows loader while verifying authentication; redirects to login if unauthenticated



---

Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: Firebase

State Management: Context API

Deployment: Frontend on Vercel, Backend on Render



---

Installation

1. Clone the repository:

git clone https://github.com/faisalrasheed-dev/Blog-Project-Full_Stack.git


2. Backend Setup:

cd backend
npm install
npm start


3. Frontend Setup:

cd frontend
npm install
npm start




---

Live Demo

Frontend: https://blog-project-full-stack.vercel.app

Backend: [Render Link] (Please provide the backend URL)



---

Author

Muhammed Faisal R

GitHub: https://github.com/faisalrasheed-dev

Email: faisalrasheed.pro@gmail.com



---
