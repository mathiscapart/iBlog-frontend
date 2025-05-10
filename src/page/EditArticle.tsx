import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Article} from "../interface/Article.tsx";
import ButtonBack from "../component/ButtonBack.tsx";
import {useAuthContext} from "../context/AuthContext.tsx";
import {Category} from "../interface/Category.tsx";
import fetchCategorys from "../function/fetchCategorys.ts";

export default function EditArticle(){
    const params = useParams();
    const id = params.id;
    const { user } = useAuthContext()
    const [title, setTitle] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [description, setDescription] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [enable, setEnable] = useState<boolean>(false);
    const [shortDescription, setShortDescription] = useState<string>("");
    const [category, setCategory] = useState<number | null>();
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [article, setArticle] = useState<Article>();
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const token = localStorage.getItem('token');

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
            await axios.put(`${import.meta.env.VITE_URL}article/${id}`, newArticle,{
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
            setEnable(false);
        } catch (error: unknown) {
            console.error("Erreur dans handleSubmit :", error);
            alert("Erreur serveur ou problème avec les données");
        }

        console.log("Catégorie à créer : ", newArticle);

    };

    async function fetchDataCategory() {
        try {
            const data = await fetchCategorys();
            setCategorys(data.filter(categorys => categorys.enable));
        } catch (error) {
            console.error("Erreur en récupérant les categorys :", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchData = async () => {
        const data = await axios.get(`${import.meta.env.VITE_URL}article/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setArticle(data.data);
        setData(data.data)
    }

    const setData = (data: Article) => {
        setTitle(data.title);
        setShortDescription(data.shortDescription);
        setDescription(data.description);
        setImg(data.img);
        setEnable(data.enable);
        setCategory(data.Category.id);
    }

    useEffect(() => {
        fetchData();
        fetchDataCategory()
    });

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    return (

        <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
            <ButtonBack></ButtonBack>
            {successMessage && (
                <Typography color="success.main" variant="body1" sx={{ mb: 2 }}>
                    L'article a été modifié avec succès !
                </Typography>
            )}
            <Typography variant="h5" gutterBottom>
                Modification de l'article {article?.title}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Titre de l'article"
                    value={title}
                    placeholder={article?.title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description courte"
                    value={shortDescription}
                    placeholder={article?.shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description longue"
                    multiline
                    placeholder={description}
                    rows={4}
                    value={article?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="URL d'image"
                    placeholder={img}
                    value={article?.img}
                    onChange={(e) => setImg(e.target.value)}
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        value={category}
                        defaultValue={category}
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
                    Modifier l'article
                </Button>
            </form>
        </Box>
    )

}