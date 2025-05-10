import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, TextField } from "@mui/material";
import "../css/Login.css";
import {UserRegister} from "../interface/UserRegister.tsx";


const Register = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [avatar, setAvatar] = useState<string>(""); // You can handle file uploads if needed
    const [role, ] = useState<boolean>(false); // Default role, can be changed depending on your system
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const userData: UserRegister = {
                firstName,
                lastName,
                email,
                password,
                role,
                avatar,
            };
            await axios.post(`${import.meta.env.VITE_URL}user`, userData);
            navigate("/home");
        } catch (error: unknown) {
            console.error("Erreur dans handleSubmit :", error);
            alert("Erreur serveur ou problème avec les données");
        }
    };

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <FormControl margin="dense">
                    <TextField
                        margin="dense"
                        placeholder="Prénom"
                        value={firstName}
                        label="Prénom"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        placeholder="Nom"
                        value={lastName}
                        label="Nom"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        type="email"
                        placeholder="Email"
                        value={email}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        label="Mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        label="Confirmer le mot de passe"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        placeholder="Avatar (URL)"
                        value={avatar}
                        label="Avatar"
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                        S'inscrire
                    </Button>
                </FormControl>
            </form>
        </>
    );
};

export default Register;
