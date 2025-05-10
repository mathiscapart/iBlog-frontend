import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainDocument from "../template/MainDocument.tsx";
import Error from "../error/Error.tsx"
import Login from "../page/Login.tsx";
import Home from "../page/Home.tsx";
import Logout from "../page/Logout.tsx";
import Article from "../page/Article.tsx";
import Articles from "../page/Articles.tsx";
import Categorys from "../page/Categorys.tsx";
import Register from "../page/Register.tsx";
import Admin from "../page/Admin.tsx";
import EditCategory from "../page/EditCategory.tsx";
import EditArticle from "../page/EditArticle.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainDocument />,
        errorElement: <Error />,
        children: [
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/articles",
                element: <Articles />
            },
            {
                path: "/articles/:categoryName",
                element: <Articles />
            },
            {
                path: "/edit-article/:id",
                element: <EditArticle />
            },
            {
                path: "/article/:articleId",
                element: <Article />
            },
            {
                path: "/category",
                element: <Categorys />
            },
            {
                path: "/edit-category/:id",
                element: <EditCategory />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/home",
                element: (
                    <>
                        <Home />
                    </>
                ),
            },
            {
                path: "/logout",
                element: (
                    <>
                        <Logout />
                    </>
                )
            }
        ]
    },

]);

function Route() {
    return <RouterProvider  router={router} />;
}

export default Route;
