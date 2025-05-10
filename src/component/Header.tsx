import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom';
import '../css/Header.css'
import {useAuthContext} from "../context/AuthContext.tsx";

export default function Header() {
    const { user } = useAuthContext()

    return (
        <Box sx={{flexGrow: 1}} color={"white"}>
            <AppBar position="static">
                <Toolbar style={{backgroundColor: 'white', color: '#1976d2'}}>
                    <Typography variant="h5" component="div" sx={{flexGrow: 4}}>
                        iBlog
                    </Typography>
                    <NavLink className={({ isActive }) => isActive ? "active": "navlink"} to={"/home"}>Accueil</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active": "navlink"} to={"/articles"}>Articles</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "active": "navlink"} to={"/category"}>Catégories</NavLink>
                    { !user ? <NavLink className={({isActive}) => isActive ? "active" : "navlink"}
                              to={"/login"}>Connexion</NavLink> : <></>}
                    { !user ? <NavLink className={({isActive}) => isActive ? "active" : "navlink"}
                                       to={"/register"}>Inscription</NavLink> : <></>}
                    { user ? <NavLink className={({isActive}) => isActive ? "active" : "navlink"}
                              to={"/logout"}>Déconnexion</NavLink> : <></>}
                    {user?.role ? <NavLink className={({ isActive }) => isActive ? "active": "navlink"} to={"/admin"}>Admin</NavLink> : <></>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
