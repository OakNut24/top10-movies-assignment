import { AppBar, Box, Switch, Toolbar, Typography } from "@mui/material";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MovieFilterRoundedIcon from '@mui/icons-material/MovieFilterRounded';

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({ darkMode, handleThemeChange }: Props) {

    return <>
        <AppBar position="static" sx={{ mb: 4, bgcolor: "common.black" }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' justifyContent='space-between' alignItems='center' >
                    <MovieFilterRoundedIcon fontSize="large" sx={{ color: "error.dark", mr: 1 }} ></MovieFilterRoundedIcon>
                    <Typography sx={{ fontFamily: 'Merienda', mr: 1 }}>TOP </Typography>
                    <Typography sx={{ fontFamily: 'Merienda', mr: 1, fontSize: 32 }}> 10 </Typography>
                    <Typography sx={{ fontFamily: 'Merienda' }}> MOVIES</Typography>

                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Switch checked={darkMode} onChange={() => handleThemeChange()} />
                </Box>
            </Toolbar>

        </AppBar>
    </>
}