import MovieContainer from "../MovieContainer.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { Slider } from "@material-tailwind/react";

const NeuralNetworkCBF = () => {


    const [userId, setUserId] = useState<number | null>(null);
    const [numberofmovies, setNumberofmovies] = useState<number>(5);
    const [apiUrl, setApiUrl] = useState<string>("");


    useEffect(() => {

        const fetchUserId = async () => {
            const username = localStorage.getItem('user');

            try {
                const response = await axios.get(`http://127.0.0.1:5000/users/${username}/userid`);
                setUserId(response.data.userid);
            } catch (error) {
                console.error('Error fetching user id:', error);
            }
        };

        fetchUserId();

    }, []);

    useEffect(() => {
        if (userId !== null) {
            setApiUrl(`http://127.0.0.1:5000/reccomend_on_user_NN_CBF?user_id=${userId}&n_reccomend=5`);
        }
    }, [userId]);


    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberofmovies(parseInt((event.target.value)));
    };

    const handleRefresh = () => {
        // Funkcja do odświeżania danych
        if (userId !== null) {
            const newApiUrl = `http://127.0.0.1:5000/reccomend_on_user_NN_CBF?user_id=${userId}&n_recommend=${numberofmovies}`;
            console.log('Refreshing API URL:', newApiUrl);
            setApiUrl(newApiUrl);
        }
    };



    return (

        <div className="items-center justify-center max-h-[80vh]">

            <div className="NameHeader shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white">
                <h2 className="mb-2">Pick number of movies</h2>
                <div className="flex justify-center w-full">
                    <div className="flex flex-row justify-center items-center">
                        <h2 className="mr-4">Pick number of movies: </h2>
                        <div>
                            <h3 className="mb-2">Actual: {numberofmovies}</h3>
                            <Slider
                                color="deep-purple"
                                value={numberofmovies}
                                onChange={handleSliderChange}
                                className="w-[20vw]" // Set the width here
                            />
                        </div>
                    </div>
                </div>
                <button className="custom-button mt-4" onClick={handleRefresh}>Refresh</button>
            </div>

            {(apiUrl)&&
                <div className="flex flex-col text-white max-h-[60vh]">
                    <div className="overflow-y-auto">
                        <div className="NameHeader rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white">
                            {apiUrl && <h1>Recommended by CBF version</h1>}
                            {apiUrl && <MovieContainer apiUrl={apiUrl}/>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default NeuralNetworkCBF;