import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import Popup from "./Popup.tsx";

const RouteOnlyAddedUserDetails = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [navigate, setNavigate] = useState<string>("");

    useEffect(() => {


        const fetchAuthentication = (username:string)=>{
            axios.get(`http://127.0.0.1:5000/check_user_history/${username}`).then((response: AxiosResponse) => {
                if(response.data.success==true){
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(false);
                }
            }).catch(error => console.error("Error checking user history", error));

        };




        if(localStorage.getItem('user')) {

            const username = localStorage.getItem('user');

            if (username!=null) {
                setIsUser(true)
                fetchAuthentication(username)
            }
            else{
                setIsUser(false)
            }
        }
        else{

            setIsUser(false);

        }
    }, []);

    if (navigate) {
        return <Navigate to={navigate} />;
    }

    if (!isUser) {
        return (
            <Popup
                message={"Please login first"}
                onClose={() => setNavigate("/login")}
            />
        );
    } else {
        if (isAuthenticated) {
            return children;
        } else {
            return (
                <Popup
                    message={"Please add some history of movies that you watched"}
                    onClose={() => setNavigate("/add-rating")}
                />
            );
        }
    }

};

export default RouteOnlyAddedUserDetails;