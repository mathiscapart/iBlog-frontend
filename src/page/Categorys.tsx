import { useState, useEffect } from "react";
import type { Category } from "../interface/Category.tsx";
import fetchCategorys from "../function/fetchCategorys.ts";
import {Grid} from "@mui/material";
import {useAuthContext} from "../context/AuthContext.tsx";
import {CardCategory} from "../component/CardCategory.tsx";
import Typography from "@mui/material/Typography";

function Categorys() {
    const [categorys, setCategorys] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuthContext()

    async function fetchData() {
        try {
            const data = await fetchCategorys();
            if (user?.role) {
                setCategorys(data);
            } else {
                setCategorys(data.filter(category => category.enable));
            }
        } catch (error) {
            console.error("Erreur en récupérant les categorys :", error);
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
            <Typography variant={"h3"} color={"primary"} style={{marginTop: 50}}>Catégories</Typography>
            <Grid container style={{marginBottom: "5%"}} rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }} direction="row"
                  sx={{
                      justifyContent: "space-between",
                      alignItems: "center",}}
            >
                {categorys.map((category: Category, index: number) => (
                        <CardCategory index={index} category={category} user={user} fetchData={fetchData}></CardCategory>
                ))}
            </Grid>
        </div>
    );
}

export default Categorys;
