import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import RatingBar from "./RatingBar.tsx";
import Popup from "./Popup.tsx";
import LastRatings from "./LastRatings.tsx";



interface Movie{
    movieId:string,
    title:string
}


const AddRating: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
    const [rating, setRating] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [userId, setUserId] = useState<number | null>(null);
    const [popupInfo, setPopupInfo] = useState<string>('');
    const [lastRatingsKey, setLastRatingsKey] = useState(0);

    const fetchMovies = async () => {
        const username = localStorage.getItem('user');

        try {
            const response = await axios.get(`http://127.0.0.1:5000/users/${username}/movies-unwatched`);
            console.log(response);
            setMovies(response.data.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

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

        fetchMovies();
        fetchUserId()

    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedMovie != null) {
            try {
                await axios.post(`http://127.0.0.1:5000/add-rating`, {

                    rating: rating,
                    userId: userId,
                    movieId: selectedMovie
                });
                setPopupInfo('Rating added successfully!');
                setSelectedMovie(null)
                fetchMovies();
                setLastRatingsKey(prev => prev + 1);
            } catch (error) {
                console.error('Error adding rating:', error);
            }
        } else {
            alert('Please select a movie to rate.');
        }
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(userId == null){
        return (
            <div>
                <h1 className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white">Please add information about yourself to add rating</h1>
                <div className="text-center">
                    <Link to="/user-details" className="text-blue-500 hover:text-blue-200">Complete your profile</Link>
                </div>
            </div>);

    }


    return (
        <div>
        <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 text-white">
            <div className="min-w-[70vw] min-h-[35vh] justify-center items-center animate-fade-in-up">
            <h1 className="mb-4">Add Movie Rating</h1>
            <input
                className="text-center bg-white shadow border rounded w-[60vw] py-2 px-3 pr-3 pl-3 text-black mb-2 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search for a movie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
                <form>
                    <div className="select-wrapper">
                        <select
                            value={selectedMovie ?? ''}
                            onChange={(e) => setSelectedMovie(Number(e.target.value))}
                        >
                            <option value="" disabled>Select a movie</option>
                            {filteredMovies.map(movie => (
                                <option className="" key={movie.movieId} value={movie.movieId}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                        <div>
                            <RatingBar rating={rating} setRating={setRating}></RatingBar>
                        </div>
                        <button className="custom-button" type="submit" onClick={handleSubmit}>Submit Rating</button>
                </form>
            </div>
            {popupInfo && (
            <Popup
                message={popupInfo}
                onClose={() => {
                    setPopupInfo("")
                }}
            />)}
        </div>
            <LastRatings userId={userId} key={lastRatingsKey}></LastRatings>
        </div>
    );
};

export default AddRating;
