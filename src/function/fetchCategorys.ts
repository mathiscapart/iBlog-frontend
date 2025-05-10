import axios from "axios";
import {Category} from "../interface/Category.tsx";

async function fetchCategorys(): Promise<Category[]> {
    const token = localStorage.getItem('token');

    const categorys = await axios.get(`${import.meta.env.VITE_URL}category`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return categorys.data;
}

export default fetchCategorys;