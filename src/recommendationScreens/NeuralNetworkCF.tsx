import MovieContainer from "../ShowingMovie/MovieContainer.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Slider} from "@material-tailwind/react";

const NeuralNetworkCF= () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [numberofmovies, setNumberofmovies] = useState<number>(5);
    const [apiUrl, setApiUrl] = useState<string>("");
    const [sliderValue,setSliderValue] = useState<number>(5);


    useEffect(() => {

        const fetchUserId = async () => {
            const username = localStorage.getItem('user');

            try {
                const response = await axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/users/${username}/userid`);
                setUserId(response.data.userid);
            } catch (error) {
                console.error('Error fetching user id:', error);
            }
        };

        fetchUserId();

    }, []);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setSliderValue(value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setNumberofmovies(sliderValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [sliderValue]);



    useEffect(() => {
        if (userId !== null) {
            const newApiUrl = `http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/reccomend_on_user_NN_CF?user_id=${userId}&n_recommend=${numberofmovies}`;
            console.log('Refreshing API URL:', newApiUrl);
            setApiUrl(newApiUrl);
        }

    }, [userId,numberofmovies]);



    return (

        <div className="items-center justify-center max-h-[80vh]">

            <div className="NameHeader shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white">
                <h2 className="mb-2">Pick number of movies</h2>
                <div className="flex justify-center w-full">
                    <div className="flex flex-row justify-center items-center">
                        <h2 className="mr-4">Pick number of movies: </h2>
                        <div>
                            <h3 className="mb-2">Actual: {sliderValue}</h3>
                            <Slider
                                color="deep-purple"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className="w-[20vw] mb-4 get-bigger-on-hover" // Set the width here
                            />
                        </div>
                    </div>
                </div>

            </div>

            {(apiUrl)&&
                <div className="flex flex-col text-white max-h-[60vh]">
                    <div className="overflow-y-auto">
                        <div className="NameHeader rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white">
                            {apiUrl && <h1>Recommended by CF version</h1>}
                            {apiUrl && <MovieContainer apiUrl={apiUrl}/>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default NeuralNetworkCF;