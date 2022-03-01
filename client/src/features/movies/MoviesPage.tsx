import { useEffect, useState } from "react";
import MoviesActions from "./MoviesActions";
import MoviesList from "./MoviesList";
import { Movie } from "../../app/models/movie";
import agent from "../../app/api/agent";

export default function Movies() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let genre = selectedGenre === '' ? 'All' : selectedGenre;
        if (loading) {
            agent.Movies.list(genre)
                .then(movies => setMovies(movies))
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false)
                });
        }

    }, [selectedGenre, loading])


    const handleGenreChange = (genre?: string) => {
        if (genre || genre === '') {
            setSelectedGenre(genre);
            setLoading(true)
        }
    };

    const handleMovieAdded = (genre?: string) => {
        setLoading(true)        //Setting the loading state true && initiating the get request from the server
    }


    return <><MoviesActions selectedGenre={selectedGenre} onGenreChange={handleGenreChange} handleMovieAdded={handleMovieAdded} /> {loading ? "" : <MoviesList movies={movies} />}

    </>
}

