import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Category} from "../interface/Category.tsx";
import ButtonBack from "../component/ButtonBack.tsx";

export default function EditCategory(){
    const params = useParams();
    const id = params.id;
    const [category, setCategory] = useState<Category>();
    const [name, setName] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory = {
            name,
            key,
            enable,
        };

        try {
            await axios.put(`${import.meta.env.VITE_URL}category/${id}`, newCategory,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage(true);
            setName("");
            setKey("");
            setEnable(false);
        } catch (error: unknown) {
            console.error("Erreur dans handleSubmit :", error);
            alert("Erreur serveur ou problème avec les données");
        }

        console.log("Catégorie à créer : ", newCategory);

    };

    const fetchData = async () => {
        const data = await axios.get(`${import.meta.env.VITE_URL}category/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setCategory(data.data);
        setData(data.data);
    }

    const setData = (data: Category) => {
        setName(data.name);
        setKey(data.key);
        setEnable(data.enable);
    }

    useEffect(() => {
        fetchData();
    });

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
            <ButtonBack></ButtonBack>
            {successMessage && (
                <Typography color="success.main" variant="body1" sx={{ mb: 2 }}>
                    La catégorie a été modifié avec succès !
                </Typography>
            )}
            <Typography variant="h5" gutterBottom>
                Modification de la catégorie {category?.name}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Titre de catégorie"
                    value={name}
                    placeholder={category?.name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Key"
                    value={key}
                    placeholder={category?.key}
                    onChange={(e) => setKey(e.target.value)}
                    margin="normal"
                    required
                />
                <FormControlLabel
                    control={<Checkbox checked={enable} onChange={() => setEnable(!enable)} />}
                    label="Activer catégorie"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Modifier la catégorie
                </Button>
            </form>
        </Box>
    )

}