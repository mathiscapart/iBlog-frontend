import {Link, useNavigate} from "react-router-dom";
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from "./DeleteButton.tsx";
import AddIcon from '@mui/icons-material/Add';
import CardArticleProps from "../interface/CardArticle.tsx";

export function CardArticle({ index, article, user, fetchData }: CardArticleProps) {
    const navigate = useNavigate();

    const editArticle = () =>  {
        navigate(`/edit-article/${article.id}`,);
    }

    return(
        <div key={`${index} ${article.id}`} style={{marginLeft:"1%", marginRight:"1%"}}>
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
                {
                    user?.role ?
                        <CardActions disableSpacing >
                            <IconButton size={"large"} color={"secondary"} aria-label="modif article" onClick={editArticle}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <DeleteButton id={article.id} path={"article"} afterDelete={fetchData}></DeleteButton>
                        </CardActions> : null
                }
            </Card>
        </div>
    )
}