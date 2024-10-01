import React, {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails.tsx";


interface MoviesContainerProps {
    apiUrl: string;
    children?: ReactNode;
}
interface Movie {
    ranking: number;
    title: string;
    year: number;
    trailerId?: string | null;
}

const MoviesContainer: React.FC<MoviesContainerProps> = ({ apiUrl }) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const movieData = response.data.data.map((item: [number, string]) => ({
                    ranking: item[0],
                    title : item[1].split(' (')[0],
                    year : item[1].split(' (')[1].split(')')[0]
                }));
                setMovies(movieData);
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, [apiUrl]);

    return (
        <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down">
            <h1 className="text-3xl font-bold text-center mb-8">Recommended Movies</h1>
            <div className="flex flex-row justify-center overflow-auto min-h-[70vh] max-w-[90vw] px-8 pt-8 pb-8 animate-fade-in-up">
                {movies.map((movie, index) => (
                    <MovieDetails key={index} ranking={movie.ranking} title={movie.title} year={movie.year}/>
                ))}
            </div>
        </div>
    );
};

export default MoviesContainer;

