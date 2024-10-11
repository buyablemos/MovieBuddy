import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Popup from "../Popup.tsx";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [navigate, setNavigate] = useState<string>("");

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token') || !!sessionStorage.getItem('token'));
    }, []);

    if (navigate) {
        return <Navigate to={navigate} />;
    }

    if (!isAuthenticated) {
        return (
            <Popup
                message={"Please login first"}
                onClose={() => setNavigate("/login")}
            />
        );
    }
    else {
        return (children)
    }

};

export default PrivateRoute;
