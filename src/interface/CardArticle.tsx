import {Article} from "./Article.tsx";
import {User} from "./User.tsx";

export default interface CardArticleProps {
    index: number;
    article: Article;
    user: User | null;
    fetchData: () => Promise<void>;
}