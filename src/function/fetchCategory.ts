import {Article} from "../interface/Article.tsx";
import axios from "axios";

async function fetchCategory(id: number): Promise<Article> {
    const token = localStorage.getItem('token');

    const category = await axios.get(`${import.meta.env.VITE_URL}category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return category.data;
}

export default fetchCategory;