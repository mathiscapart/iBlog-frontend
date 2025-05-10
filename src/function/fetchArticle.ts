import {Article} from "../interface/Article.tsx";
import axios from "axios";

async function fetchArticle(id: number): Promise<Article> {
    const token = localStorage.getItem('token');
    const article = await axios.get(`${import.meta.env.VITE_URL}article/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return article.data;
}

export default fetchArticle;