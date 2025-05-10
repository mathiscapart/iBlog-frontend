import { useState, useEffect } from "react";
import type { Article } from "../interface/Article.tsx";
import fetchArticles from "../function/fetchArtciles.ts";
import { Grid } from "@mui/material";
import {useAuthContext} from "../context/AuthContext.tsx";
import {CardArticle} from "./CardArticle.tsx";
import Typography from "@mui/material/Typography";

function CardArticles({filter, category}: {filter: string, category: string}) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext()

    async function fetchData() {
        try {
            const data = await fetchArticles();
            if (user?.role) {
                setArticles(data);
            } else {
                setArticles(data.filter(category => category.enable));
            }
        } catch (error: unknown) {
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

    return (
        <div>
            <Typography variant={"h3"} color={"primary"} style={{marginBottom: 30}}>Articles</Typography>
            <Grid container style={{marginLeft:"10%", marginRight:"10%"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} direction="row"
                  sx={{
                      justifyContent: "space-between",
                      alignItems: "center",}}
            >
            {articles.filter((article) => article.Category.name.includes(category)).filter((article) => article.title.includes(filter)).map((article: Article, index: number) => (
                <CardArticle index={index} article={article} user={user} fetchData={fetchData}></CardArticle>
            ))}
            </Grid>
        </div>
    );
}

export default CardArticles;
