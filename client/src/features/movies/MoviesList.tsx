import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Movie } from "../../app/models/movie";
import MovieCard from "./MovieCard";

interface Props {
    movies: Movie[];
}

export default function MoviesList({ movies }: Props) {

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setRefresh(false);
    }, [movies, refresh])


    return (<Grid key={"movies" + movies.length} container spacing={4}>{movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
        </Grid>
    ))}</Grid>);

}