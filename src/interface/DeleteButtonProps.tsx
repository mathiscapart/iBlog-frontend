export interface DeleteButtonProps {
    path: string;
    id: number;
    afterDelete?: () => void;
}