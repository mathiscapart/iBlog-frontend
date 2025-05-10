import {useAuthContext} from "../context/AuthContext.tsx";
import Categorys from "./Categorys.tsx";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from "@mui/material/Typography";
import {Avatar, Card, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import type {Article} from "../interface/Article.tsx";
import fetchArticles from "../function/fetchArtciles.ts";
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";


function Home(){
    const { user } = useAuthContext()
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            const data = await fetchArticles();
            const dataSort = data.sort((a, b) => new Date(b.UpdateDate).getTime() - new Date(a.UpdateDate).getTime())
            setArticles(dataSort.slice(0,5));
        } catch (error) {
            console.error("Erreur en récupérant les articles :", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <p>Chargement...</p>;
    }


    return (
        <>
            <img src="/fond_Home.png" alt={"fond"} style={{width:'100%'}} />
            <div style={{display:'flex', justifyContent:'center', alignItems: 'center', flexDirection:"row", margin:"10%", marginTop: 30, marginBottom: 30}}>
                <ArrowBackIosIcon color={"primary"} />
                <ArrowBackIosIcon color={"primary"} />
                <Typography color={"primary"} variant={"h5"} align={"center"} > L'espace où les experts partagent leurs idées,
                    leurs innovations et les dernières tendances en ingénierie logicielle,
                    pour inspirer et faire grandir la communauté tech.</Typography>
                <ArrowForwardIosIcon color={"primary"} />
                <ArrowForwardIosIcon color={"primary"} />
            </div>
            { user ? (
                <>
                    <div style={{ display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: "row"}}>
                        <Typography variant={"h6"}>Bienvenue, {user.firstName} !</Typography>
                    </div>

                    <Grid container style={{marginLeft:"10%", marginRight:"10%"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} direction="row"
                          sx={{
                              justifyContent: "space-between",
                              alignItems: "center",}}
                    >
                        {articles.map((article) => (
                            <Card sx={{ width: 400, maxWidth: "100%" }}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            <img alt={article.User.lastName} src={article.User.avatar}/>
                                        </Avatar>
                                    }
                                    action={
                                        <Link to={`/article/${article.id}`} style={{textDecoration:"none"}}>
                                            <IconButton aria-label="settings">
                                                <AddIcon color={"primary"} />
                                            </IconButton>
                                        </Link>
                                    }
                                    title={article.User.lastName}
                                />
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={article.img}
                                        alt={article.img}
                                    />
                                    <Typography component="div" variant="h5" sx={{ color: 'text.secondary' }}>
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {article.shortDescription}
                                    </Typography>
                                    {article.Category && <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                        Categroy: {article.Category.key}
                                    </Typography>}
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>

                    <Categorys></Categorys>
                </>
            ) : (
                <p>Vous n'êtes pas connecté.</p>
            )}
        </>
    )
}

export default Home;