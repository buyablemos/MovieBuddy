import MovieContainer from "../ShowingMovie/MovieContainer.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Slider} from "@material-tailwind/react";
import {debounce} from "lodash";



interface Movie{
    id:number,
    title:string
}

const Metadata = () => {
    const [numberofmovies, setNumberofmovies] = useState<number>(5);
    const [sliderValue, setSliderValue] = useState<number>(5);
    const [apiUrl, setApiUrl] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedImprovedMovies, setSelectedImprovedMovies] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovies = () => {

            axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/metadata_movies`)
                .then(response => {
                    console.log(response);
                    setMovies(response.data.data || []);
                })
                .catch(error => {
                    console.error('Error fetching movies:', error);
                });
        };

        fetchMovies();
    }, []);


    const filterMovies =
        debounce((query: string, movies: Movie[], setFilteredMovies: (movies: Movie[]) => void) => {
            const filtered = movies.filter(movie => {
                return movie.title && movie.title.toLowerCase().includes(query.toLowerCase());
            });
            setFilteredMovies(filtered);
        }, 300);



        useEffect(() => {
            if (selectedMovie === null) return;

            const movieTitle = movies.find(movie => movie.id === selectedMovie)?.title;
            if (!movieTitle) return;

            const endpoint = selectedImprovedMovies
                ? "recommend_on_movie_metadata_improved"
                : "recommend_on_movie_metadata";

            setApiUrl(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/${endpoint}?title=${movieTitle}&n_recommend=${numberofmovies}`);
        }, [selectedMovie, numberofmovies, selectedImprovedMovies]);





    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setSliderValue(value);
    };

    const handleSearchChange = (query:string) => {
        setSearchQuery(query);
    };



    useEffect(() => {
        const handler = setTimeout(() => {
            setNumberofmovies(sliderValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [sliderValue]);

    useEffect(() => {
        if(searchQuery=="") {
            setFilteredMovies(movies)
        }
        else{
            filterMovies(searchQuery, movies, setFilteredMovies);
        }
    }, [searchQuery,movies]);



    return (

        <div className="items-center justify-center max-h-[80vh]">

            <div className="NameHeader rounded  min-w-[70vw] justify-center items-center animate-fade-in-up">
                <h2 className="mb-4">Search for a movie to find similar</h2>
                <input
                    className="input_bg text-center bg-white shadow border rounded w-[60vw] h-[5vh] text-black mb-2 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />

                <form>
                    <div className="select-wrapper">
                        <select
                            value={selectedMovie ?? ''}
                            onChange={(e) => setSelectedMovie(Number(e.target.value))}
                            className="min-w-[60vw]"
                        >
                            <option value="" disabled>Select a movie</option>
                            {filteredMovies.slice(0, 200).map(movie => (
                                <option className="" key={movie.id} value={movie.id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-1 pb-1 mb-2 text-white">

                        <div className="flex justify-center w-full">
                            <div className="flex flex-row justify-center items-center">
                                <h2 className="mr-4">Pick number of movies: </h2>
                                <div>
                                    <h3 className="mb-2">Actual: {sliderValue}</h3>
                                    <Slider
                                        color="deep-purple"
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        className="w-[20vw] get-bigger-on-hover"// Set the width here
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="hover:scale-110 transition-transform duration-300">
                <label className="block mb-2">
                    <input
                        type="radio"
                        value="true"
                        checked={selectedImprovedMovies}
                        onChange={() => {
                            setSelectedImprovedMovies(true)
                        }
                        }
                        className="mr-2 radio-button"
                    />
                    Improved recommendation - Only popular movies
                </label>
                </div>
                <div className="hover:scale-110 transition-transform duration-300">
                <label className="block mb-2 ">
                    <input
                        type="radio"
                        value="false"
                        checked={!selectedImprovedMovies}
                        onChange={() => setSelectedImprovedMovies(false)}
                        className="mr-2 radio-button"
                    />
                    Regular recommendation - Not filtered by popularity
                </label>
                </div>
            </div>

            {(apiUrl) &&
                <div className="flex flex-col text-white max-h-[60vh]">
                    <div className="overflow-y-auto">
                        <div className="NameHeader rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white">
                            {apiUrl && <h1>Recommended by Metadata version</h1>}
                            {apiUrl && <MovieContainer apiUrl={apiUrl}/>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Metadata;