import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    movie: MovieData | null;
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
    ranking: number | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, movie }) => {
    if (!isOpen || !movie) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                className="bg-black p-4 rounded shadow-lg max-w-lg w-full bg-opacity-80 border-white border-solid border-2 overflow-y-auto ">
                <div className="items-center justify-center max-h-[90vh]">
                <h2 className="text-xl font-bold">{movie.Title} ({movie.Year})</h2>
                    {movie.ranking&& <p>Ranking for you: {movie.ranking}</p>}
                <p>{movie.Plot}</p>
                <p>Genres: {movie.Genre}</p>
                <p>Actors: {movie.Actors}</p>
                <p>Runtime: {movie.Runtime}</p>
                <p>Director: {movie.Director}</p>
                {movie.trailerId && (
                    <div className="mt-4">
                        <iframe
                            width="100%"
                            height="300"
                            src={`https://www.youtube.com/embed/${movie.trailerId}`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
                <button
                    className="mb-4 mt-4 custom-button" type="submit"
                    onClick={onClose}
                >
                    Zamknij
                </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
