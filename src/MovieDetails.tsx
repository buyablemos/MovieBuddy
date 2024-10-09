import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./MovieDetailsWithTrailer.tsx";
import fetchTrailerId from "./findYTtrailer.ts";


interface MovieDetailsProps {
    title: string;
    ranking: number|null;
    year: number;
}

interface MovieData {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    trailerId?: string | null;
    ranking: number;
}


const MovieDetails: React.FC<MovieDetailsProps> = ({ title,year , ranking }) => {
    const [movieData, setMovieData] = useState<MovieData | null>(null);
    const api_key = import.meta.env.VITE_OMDB_CLIENT_ID;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);

    const handleMovieClick = async (movie: MovieData) => {
        const trailerId = await fetchTrailerId(movie.Title);
        setSelectedMovie({ ...movie, trailerId });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };


    const encodedTitle = encodeURIComponent(title);
    const url = `https://www.omdbapi.com/?t=${encodedTitle}&y=${year}&apikey=${api_key}`
    const url2nd = `https://www.omdbapi.com/?t=${encodedTitle}&apikey=${api_key}`

    console.log("Url:", url);
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log("Response data:", response.data);
                if (response.data.Response === "True") {
                    setMovieData({ ...response.data, ranking });
                } else {
                    axios.get(url2nd)
                        .then(response => {
                            if (response.data.Response === "True") {
                                setMovieData({...response.data, ranking});
                            } else {
                                console.error("Movie not found:", response.data.Error);
                                setMovieNotFound(true)
                            }
                        })
                }
            })
            .catch(error => {
                console.error("Error fetching movie details from OMDb:", error);
            });
    },  [title, year, ranking]);

    if (!movieData) return <p className="text-center mr-4">Loading data</p>
    if (movieNotFound) return (
        <div>
        <p className="text-sm text-gray-500 mt-2">{title}</p>
            {ranking&&<p className="text-sm text-gray-500">Predicted Ranking: {ranking}</p>}
        <p className="text-center mr-4">Details not found</p>
        </div>)

    return (
        <div>
        <div className="max-h-[35vh] min-w-[10vw]">
        <div className="movie-details darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-up items-center justify-center" onClick={() => handleMovieClick(movieData)}>
            <img src={movieData.Poster} alt={movieData.Title} className="poster mb-4 rounded-lg" />
            <p className="text-sm text-gray-500 mt-2">{movieData.Title}</p>
            {ranking&&<p className="text-sm text-gray-500">Predicted Ranking: {ranking}</p>}
        </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} movie={selectedMovie} />
        </div>
    );
};

export default MovieDetails;
