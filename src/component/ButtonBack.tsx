import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function ButtonBack(){
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate("/articles/")}>
            <ArrowBack fontSize={"large"} color={"primary"}></ArrowBack>
        </IconButton>
    )
}