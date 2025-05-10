import Header from "../component/Header.tsx";
import {Outlet} from "react-router-dom";

function MainDocument(){
    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default MainDocument;
