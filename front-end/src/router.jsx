import { createBrowserRouter } from "react-router-dom";
import Articles from './pages/Articles';
import About from './pages/about';
import HomePage from './pages/HomePage';
import Layout from './Layout';
import ArticleIndividual, { loader as aLoader } from "./pages/ArticleIndividual";
import NotFound from "./pages/NotFound";
import  CreateAccountPage  from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";


const router = createBrowserRouter([{
    path:'/',
    element:<Layout/>,
    errorElement:<NotFound/>,
    children:[
    {
        path:'',
        element:<HomePage/>
    },
    {
        path:'about',
        element:<About/>
    },
    {
        path:'articles',
        element:<Articles/>
    },
    {
        path:'articles/:name',
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
    }
],}]

)

export default router