import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingBar from "./RatingBar.tsx";

interface Rating {
    movieId: number;
    rating: number;
    title: string;
    timestamp: number;
}

interface LastRatingsProps {
    userId: number;
}


const LastRatings: React.FC<LastRatingsProps> = ({userId} ) => {
    const [lastRatings, setLastRatings] = useState<Rating[]>([]);
    const [errorRating, setErrorRating] = useState<string>('');

    const fetchLastRatings = async () => {

        try {
            const response = await axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/${userId}/last-ratings`);
            setLastRatings(response.data.data);
        } catch (error) {
            console.error('Error fetching ratings:', error);
            setErrorRating("No rating found.");
        }
    };

    const handleDelete = async (movieId: number) => {
        try {
            await axios.delete(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/${userId}/ratings/${movieId}`);
            setLastRatings(lastRatings.filter(rating => rating.movieId !== movieId));
        } catch (error) {
            console.error('Error deleting rating:', error);
        }
    };


    useEffect(() => {
        fetchLastRatings();

    }, []);

    if (errorRating) {
        return(
        <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 text-white">
            <h1>{errorRating}</h1>
        </div>
        )
    }


    return (
        <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 text-white animate-fade-in-up">
            <h2>Last Ratings</h2>

            <div className="mt-2 max-h-[30vh] overflow-y-auto">
                <div className="flex flex-col items-center justify-center">
                    <ul>
                        {lastRatings.map(rating => (
                            <li className="custom-li" key={rating.movieId}>
                                <div className="flex items-center justify-between p-3">

                                    <strong>Time:</strong> {new Date(rating.timestamp * 1000).toLocaleString()}
                                    <strong className="ml-2">Movie:</strong> {rating.title}
                                    <div className="ml-2">
                                    <RatingBar rating={rating.rating}></RatingBar>
                                    </div>
                                    <button onClick={() => handleDelete(rating.movieId)}
                                            className="delete-button ml-2">Delete
                                    </button>

                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default LastRatings;
