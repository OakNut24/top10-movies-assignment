import { Movie } from "../../app/models/movie";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from "react";
import Collapse from '@mui/material/Collapse';
import { Box, CardHeader, Rating } from "@mui/material";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

interface Props {
    movie: Movie;
}



export default function MoviesCard({ movie }: Props) {

    const [showDetails, setShowDetails] = useState(false);

    function handleCardPress() { //Handels the show/hide of the movie details(genre and starts)
        setShowDetails(!showDetails);
    }


    return (
        <Card sx={{ minWidth: 250 }} >
            <Box onClick={handleCardPress} sx={{ cursor: 'pointer' }}>
                <CardHeader avatar={
                    <LocalMoviesIcon fontSize='large' sx={{ color: 'error.dark' }} />
                } title={movie.name} titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'inherit', variant: 'h2', fontFamily: "Merienda" },
                }
                } />
                <CardMedia
                    component="img"
                    sx={{
                        height: 390, objectFit: 'fill', bgcolor: 'primary.light', zIndex: '-1'
                    }}
                    image={movie.imageUrl}
                    alt={movie.name}
                />
            </Box>
            <Collapse in={showDetails} timeout='auto'>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box>
                        <Rating name="rating" defaultValue={movie.rating} precision={1} readOnly />
                    </Box>
                    <Box>
                        <Button size="small" sx={{ fontSize: 10, color: 'common.white', fontWeight: 800, bgcolor: 'error.dark' }}>{movie.genre}</Button>
                    </Box>
                </CardContent>
            </Collapse>

        </Card>
    );
}