import { useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function AddCategory() {
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
            await axios.post(`${import.meta.env.VITE_URL}category`, newCategory,{
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

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
            {successMessage && (
                <Typography color="success.main" variant="body1" sx={{ mb: 2 }}>
                    La catégorie a été ajouté avec succès !
                </Typography>
            )}
            <Typography variant="h5" gutterBottom>
                Ajouter une nouvelle catégorie
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Titre de catégorie"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    margin="normal"
                    required
                />
                <FormControlLabel
                    control={<Checkbox checked={enable} onChange={() => setEnable(!enable)} />}
                    label="Activer catégorie"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Ajouter la catégorie
                </Button>
            </form>
        </Box>
    );
}