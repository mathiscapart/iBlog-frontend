import {Article} from "../interface/Article.tsx";
import axios from "axios";

async function fetchArtciles(): Promise<Article[]> {
    const token = localStorage.getItem('token');
    const articles = await axios.get(`${import.meta.env.VITE_URL}article`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return articles.data;
}

export default fetchArtciles;