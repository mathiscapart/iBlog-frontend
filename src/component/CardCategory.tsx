import {Button, Card, CardActions, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from "./DeleteButton.tsx";
import CardCategoryProps from "../interface/CardCategory.tsx";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

export function CardCategory(CardCategoryProps: CardCategoryProps) {
    const navigate = useNavigate();

    const editCategory = () =>  {
        navigate(`/edit-category/${CardCategoryProps.category.id}`,);
    }

    return(
        <div key={`${CardCategoryProps.index} ${CardCategoryProps.category.id}`} style={{marginLeft:"1%", marginRight:"1%"}}>
            <Card sx={{ marginTop: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 2 }}>
                    <Button onClick={() => navigate('/articles/'+ CardCategoryProps.category.name)}>
                        <Typography variant={"h5"}>{CardCategoryProps.category.name}</Typography>
                    </Button>
                {
                    CardCategoryProps.user?.role ?
                        <CardActions disableSpacing >
                            <IconButton size={"large"} color={"secondary"} aria-label="modif category" onClick={editCategory}>
                                <EditIcon color="primary" />
                            </IconButton>
                            <DeleteButton id={CardCategoryProps.category.id} path={"category"} afterDelete={CardCategoryProps.fetchData}></DeleteButton>
                        </CardActions> : null
                }
                </Box>

            </Card>
        </div>
    )
}