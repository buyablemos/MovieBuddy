import React, {ReactNode, useEffect, useState} from "react";
import axios from "axios";
import MovieDetails from "./MovieDetails.tsx";
import Spinner from "../Spinner.tsx";


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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        axios.get(apiUrl)
            .then(response => {
                const movieData = response.data.data.map((item: [number, string] | string) => {

                    console.log(response.data.data)

                    if (Array.isArray(item)) {

                        if (!item[1].includes(' (')) {
                            return {
                                ranking: item[0],
                                title: item[1],
                                year:  null
                            };
                        }

                        return {
                            ranking: item[0],
                            title: item[1].split(' (')[0],
                            year:  item[1].split(' (')[1].split(')')[0]
                        };
                    } else if (typeof item === 'string') {


                        if (!item.includes(' (')) {
                            return {
                                ranking: null,
                                title: item,
                                year:  null
                            };
                        }

                        return {
                            ranking: null,
                            title: item.split(' (')[0],
                            year : item.split(' (')[1].split(')')[0]
                        };
                    }
                });
                setMovies(movieData);
                setLoading(false)
            })
            .catch(error => console.error("Error fetching movies:", error));
    }, [apiUrl]);

    return (
        <div>
            {loading && (
                <div className="flex justify-center darkened-background shadow-md rounded pt-1 pb-1">
                    <h2 className="mr-4">Loading your recommendations from server </h2>
                    <Spinner/>
                </div>
            )
            }
            {movies.length > 0 && (
                <div className="darkened-background shadow-md rounded pt-1 pb-1 animate-fade-in-up">
                    <h1 className="text-3xl font-bold text-center mb-2 animate-fade-in-up">Recommended Movies</h1>
                    <div
                        className="flex flex-row justify-center overflow-auto min-h-[70vh] max-w-[90vw] px-8 pt-4 pb-4">
                        {movies.map((movie, index) => (
                            <MovieDetails key={index} ranking={movie.ranking} title={movie.title} year={movie.year}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoviesContainer;

