import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../context/AuthContext.tsx";
import {Button, FormControl, TextField} from "@mui/material";
import "../css/Login.css"


const Login = () => {
    const { login } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}login`, {
                email,
                password,
            });

            const token = res.data.token;

            if (!token || typeof token !== "string") {
                alert("Erreur serveur : token manquant");
                return;
            }
            console.log(token);
            login(token);

            navigate("/home");

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error: unknown) {
            console.error("Erreur dans handleSubmit :", error);
            alert("Identifiants invalides ou erreur serveur");
        }
    };

    return (
        <>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <FormControl margin="dense">
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
                    <Button variant="contained" type="submit">Connexion</Button>
                </FormControl>
            </form>
        </>
    );
};

export default Login;
