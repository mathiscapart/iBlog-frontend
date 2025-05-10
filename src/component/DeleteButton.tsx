import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import type {DeleteButtonProps} from "../interface/DeleteButtonProps.tsx";

function DeleteButton({ path, id, afterDelete }: DeleteButtonProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const token = localStorage.getItem('token');


    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`${import.meta.env.VITE_URL}${path}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (afterDelete) {
                afterDelete();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        } finally {
            setIsDeleting(false);
            setOpenDialog(false);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <IconButton size="large" color="secondary" onClick={handleOpenDialog}>
                <DeleteIcon color="primary" />
            </IconButton>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmation de suppression"}</DialogTitle>
                <DialogContent>
                    <Typography id="alert-dialog-description">
                        Êtes-vous sûr de vouloir supprimer cet élément ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} disabled={isDeleting}>Annuler</Button>
                    <Button onClick={handleDelete} color="error" disabled={isDeleting}>
                        {isDeleting ? "Suppression..." : "Supprimer"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteButton;
