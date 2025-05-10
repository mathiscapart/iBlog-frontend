import {useEffect, useState} from "react";
import {Category} from "../interface/Category.tsx";
import {useAuthContext} from "../context/AuthContext.tsx";
import fetchCategorys from "../function/fetchCategorys.ts";
import {Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function AddCard() {
    const { user } = useAuthContext()
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(false);
    const [shortDescription, setShortDescription] = useState<string>("");
    const [category, setCategory] = useState<number | null>();
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const token = localStorage.getItem('token');


    async function fetchData() {
        try {
            const data = await fetchCategorys();
            setCategorys(data.filter(categorys => categorys.enable));
        } catch (error) {
            console.error("Erreur en récupérant les categorys :", error);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newArticle = {
            title,
            shortDescription,
            description,
            img,
            enable,
            UserId: user?.id,
            CategoryId: category,
        };

        try {
            await axios.post(`${import.meta.env.VITE_URL}article`, newArticle,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage(true);
            setTitle("");
            setShortDescription("");
            setDescription("");
            setEnable(false);
            setCategory(undefined);
        } catch (error: unknown) {
            console.error("Erreur dans handleSubmit :", error);
            alert("Erreur serveur ou problème avec les données");
        }

        console.log("Article à créer : ", newArticle);

    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
            {successMessage && (
                <Typography color="success.main" variant="body1" sx={{ mb: 2 }}>
                    L'article a été ajouté avec succès !
                </Typography>
            )}
            <Typography variant="h5" gutterBottom>
                Ajouter un nouvel article
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Titre de l'article"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description courte"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description longue"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="URL d'image"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={category || ''}
                        onChange={(e) => setCategory(e.target.value as number)}
                        label="Catégorie"
                        required
                    >
                        {categorys.map((category: Category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Checkbox checked={enable} onChange={() => setEnable(!enable)} />}
                    label="Activer l'article"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Ajouter l'article
                </Button>
            </form>
        </Box>
    );
}