import { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import type { Article } from "../interface/Article.tsx";
import Typography from "@mui/material/Typography";
import fetchArticle from "../function/fetchArticle.ts";
import {Button} from "@mui/material";

function Article() {
    const params = useParams();
    const articleId = params.articleId;

    const [article, setArticle] = useState<Article>();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData(){
        try {
            if (articleId != undefined){
                const data: Article = await fetchArticle(Number(articleId));
                setArticle(data);
            }
        } catch (error) {
            console.error("Erreur en récupérant les articles :", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    });

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if(article)return(<>
        <div key={`${article.id}`} style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <Typography variant={"subtitle1"}>Accueil / {article.id} / {article.title}</Typography>
            <Link to={'/home'} title="Home"><Button>Back to Home</Button></Link>
            <Typography variant={"h4"}>{article.title} </Typography>
            <img src={article.img} alt={article.img} style={{maxWidth: "60%"}}/>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {article.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {article.Category.key}
            </Typography>
        </div>
    </>)
    return <p>Error</p>;
}

export default Article;
