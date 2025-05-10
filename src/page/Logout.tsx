import {useAuthContext} from "../context/AuthContext.tsx";

function Logout(){
    const { login, logout } = useAuthContext();

    if (login != null){
        logout();
    }

    return (
        <>
            <h1>Logout</h1>
        </>
    )
}

export default Logout;