import { createBrowserRouter } from "react-router-dom";
import { loader as bLoader } from './components/ArticlesSeparate';
import Layout from './Layout';
import About from './pages/About';
import { AddArticle } from "./pages/AddArticle";
import ArticleIndividual, { loader as aLoader } from "./pages/ArticleIndividual";
import Articles from './pages/Articles';
import CreateAccountPage from "./pages/CreateAccountPage";
import EditArticle, { loader as dLoader } from "./pages/EditArticle";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Profile, { loader as cLoader } from './pages/Profile';
import { loader as eLoader } from "./pages/HomePage";



const router = createBrowserRouter([{
    path:'/',
    element:<Layout/>,
    errorElement:<NotFound/>,
    children:[
    {
        path:'',
        element:<HomePage/>,
        loader:eLoader
    },
    {
        path:'about',
        element:<About/>
    },
    {
        path:'articles',
        element:<Articles/>,
        loader:bLoader
    },
    {
        path:'articles/:id',
        element:<ArticleIndividual/>,
        loader:aLoader
    },
    {
        path:'registration',
        element:<CreateAccountPage/>
    },
    {
        path:'login',
        element:<LoginPage/>
    },{
        path:'addarticle',
        element:<AddArticle/>
    },{
        path:'profile',
        element:<Profile/>,
        loader:cLoader
    },{
        path:'edit-article/:id',
        element:<EditArticle/>,
        loader:dLoader
    }
],}]

)

export default router