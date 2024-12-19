import MovieContainer from "../ShowingMovie/MovieContainer.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Slider} from "@material-tailwind/react";


interface Movie{
    movieId:string,
    title:string
}

const KnnMovie = () => {
    const [numberofmovies, setNumberofmovies] = useState<number>(5);
    const [sliderValue, setSliderValue] = useState<number>(5);
    const [apiUrl, setApiUrl] = useState<string>("");
    const [apiUrl2, setApiUrl2] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<number|null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');



    useEffect(() => {
        const fetchMovies = () => {

            axios.get(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/movies`)
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

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        const findMovie = (selectedMovie:number)=>{
            const match=movies.find(movie => parseInt(movie.movieId) == selectedMovie)
            if (match!=null){
                return match.title
            }
            else{
                return null
            }
        }

        if (selectedMovie!== null) {
            setApiUrl2(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/recommend_on_movie_kNN_CBF?movie=${findMovie(selectedMovie)}&n_recommend=${numberofmovies}&movieId=${selectedMovie}`);
            setApiUrl(`http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/recommend_on_movie_kNN_CF?movie=${findMovie(selectedMovie)}&n_recommend=${numberofmovies}&movieId=${selectedMovie}`);
        }


    }, [selectedMovie, numberofmovies]);



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


    return (

        <div className="items-center justify-center max-h-[80vh]">

            <div className="NameHeader rounded  min-w-[70vw] justify-center items-center animate-fade-in-up">
                <h2 className="mb-4">Search for a movie to find similar</h2>

                <input
                    className="input_bg text-center bg-white border-1 rounded w-[60vw] h-[5vh] text-black mb-2 leading-tight focus:outline-none focus:shadow-outline"
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
                            className="min-w-[60vw]"
                        >
                            <option value="" disabled>Select a movie</option>
                            {filteredMovies.map(movie => (
                                <option className="" key={movie.movieId} value={movie.movieId}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="pt-1 pb-1 mb-2 text-white">

                        <div className="flex justify-center w-full">
                            <div className="flex flex-row justify-center items-center">
                                <h2 className="mr-4">Pick number of movies: </h2>
                                <div className="">
                                    <h3 className="mb-2">Actual: {sliderValue}</h3>
                                    <Slider
                                        color="deep-purple"
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        className="w-[20vw] get-bigger-on-hover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {(apiUrl||apiUrl2)&&
            <div className="flex flex-col text-white max-h-[60vh]">
                <div className="overflow-y-auto">
                    <div className="NameHeader rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white">
                        {apiUrl && <h1>Recommended by kNN CF version</h1>}
                        {apiUrl && <MovieContainer apiUrl={apiUrl}/>}
                    </div>
                    <div className="NameHeader rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white">
                        {apiUrl2 && <h1>Recommended by kNN CBF version</h1>}
                        {apiUrl2 && <MovieContainer apiUrl={apiUrl2}/>}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default KnnMovie;