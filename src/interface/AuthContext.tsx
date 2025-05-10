import {User} from "./User.tsx";

export interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}