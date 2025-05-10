import CardArticles from "../component/CardArticles.tsx";
import Search from "../component/Search.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Categorys from "./Categorys.tsx";

export default function Articles() {
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const params = useParams();
    const categoryName = params.categoryName;

    useEffect(() => {
        setCategory("")
        if (categoryName) {
            setCategory(categoryName);
        }
    }, [categoryName]);

    return (
        <>
            <Search onChanged={(e:string) => setSearch(e)}></Search>
            <Categorys></Categorys>
            <CardArticles filter={search} category={category}/>
        </>
    )
}