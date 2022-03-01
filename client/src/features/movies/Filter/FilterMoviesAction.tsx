import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FilterIcon from '@mui/icons-material/FilterAlt';
import FilterMoviesDialog from './FilterMoviesDialog';


interface Props {
    onGenreChange: (genre?: string) => void;
    genreValue: string;
}

export default function FilterAction({ onGenreChange, genreValue }: Props) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(genreValue);

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue?: string) => {
        if (newValue || newValue === ``) {
            setValue('');
            onGenreChange(newValue);
        } else {
            setValue('');
        }
        setOpen(false);
    };

    return (<Box>
        <Button size='large' startIcon={<FilterIcon />} variant='contained' sx={{ bgcolor: 'error.dark' }} onClick={handleClickListItem}>FILTER</Button>
        <FilterMoviesDialog
            open={open}
            onClose={handleClose}
            value={genreValue}
        />

    </Box>);
}