import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddCircleOutlined';
import AddMovieDialog from './AddMovieDialog';

interface Props {
    handleMovieAdded: () => void;
}


export default function AddMovieAction({ handleMovieAdded }: Props) {
    const [open, setOpen] = React.useState(false);
    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        handleClose();
    }



    return (<Box>
        <Button size='large' startIcon={<AddIcon />} variant='contained' sx={{ bgcolor: 'error.dark' }} onClick={handleClickListItem}>ADD MOVIE</Button>
        <AddMovieDialog
            open={open}
            onClose={handleClose}
            onAdd={handleAdd}
            handleMovieAdded={handleMovieAdded}
        />

    </Box>);
}