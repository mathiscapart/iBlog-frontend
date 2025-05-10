import {Category} from "./Category.tsx";
import {User} from "./User.tsx";

export default interface CardArticleProps {
    index: number;
    category: Category;
    user: User | null;
    fetchData: () => Promise<void>
}