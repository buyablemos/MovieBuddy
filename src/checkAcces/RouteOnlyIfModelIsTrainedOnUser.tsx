import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import Popup from "../Popup.tsx";


interface RouteOnlyIfModelIsTrainedOnUserProps {
    children: React.ReactNode;
    model: string;
}

const RouteOnlyIfModelIsTrainedOnUser: React.FC<RouteOnlyIfModelIsTrainedOnUserProps> = ({children,model}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(true);
    const [navigate, setNavigate] = useState<string>("");

    useEffect(() => {


        const fetchAuthentication = (username:string, model:string)=>{
            axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/check_user_access_model/${username}/${model}`).then((response: AxiosResponse) => {
                if(response.data.success==true){
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(false);
                }
            }).catch(error => console.error("Error checking user access", error));

        };




        if(localStorage.getItem('user')) {

            const username = localStorage.getItem('user');

            if (username!=null) {
                setIsUser(true)
                fetchAuthentication(username,model)
            }
            else{
                setIsUser(false)
            }
        }
        else{

            setIsUser(false);

        }
    }, [model]);


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

            if(showPopup)
            {
                return <Popup
                    message={`Please wait until server will train recommendation model: ${model} based on your profile`}
                    onClose={() => {
                        if (!model.startsWith("knn")) {
                            setNavigate("/")

                        }
                        else {
                            setShowPopup(false)
                        }
                    }
                    }
                />
            }
            else
                return null



        }
    }

};

export default RouteOnlyIfModelIsTrainedOnUser;