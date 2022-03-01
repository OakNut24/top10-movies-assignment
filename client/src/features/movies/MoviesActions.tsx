import { Box, Container } from "@mui/material";
import { useState } from "react";
import AddMovieAction from "./Add/AddMovieAction";
import FilterDialog from "./Filter/FilterMoviesAction";


interface Props {

    onGenreChange: (genre?: string) => void;
    handleMovieAdded: () => void;
    selectedGenre: string;

}



export default function MoviesActions({ onGenreChange, handleMovieAdded, selectedGenre }: Props) {
    return <>
        <Container sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-around' }}>
                <FilterDialog onGenreChange={onGenreChange} genreValue={selectedGenre} />
                <AddMovieAction handleMovieAdded={handleMovieAdded} />
            </Box>
        </Container>
    </>

}

