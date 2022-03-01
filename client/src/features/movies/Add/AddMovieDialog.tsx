import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
import AppDropZone from '../../../app/components/AppDropZone';
import { FieldValues, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Movie } from '../../../app/models/movie';
import AppTextInput from '../../../app/components/AppTextInput';
import AppSelectList from '../../../app/components/AppSelectList';
import AppRating from '../../../app/components/AppRating';
import { validationScehma } from './movieValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import agent from '../../../app/api/agent';

const options = [
    'Action',
    'Science Fiction',
    'Thriller',
    'Comedy',
    'Drama'
];

export interface Props {
    open: boolean;
    onClose: (value?: string) => void;
    onAdd: () => void;
    handleMovieAdded: () => void;
}

export default function AddMovieDialog(props: Props) {
    const { control, reset, handleSubmit, watch, setError, formState: { errors } } = useForm({
        resolver: yupResolver(validationScehma)
    });
    const watchFile = watch('file', null);
    const { onClose, open, onAdd, ...other } = props;

    useEffect(() => {
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [watchFile])

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Movie;
            response = await agent.Movies.createMovie(data); //Adding the new movie in the database
            props.handleMovieAdded();//Initialize the get list movies from DB for refreshing the UI
            onClose();//Close the AddMovieDialog component
        } catch (error) {
            if (String(error).includes("400")) {//Bad request - when trying to create a movie but the name is already being used
                setError('name', { type: "server side", message: "This movie is already shown in the list" }, { shouldFocus: true })
            } else {
            }
        }
        handleCancel();
    }



    const handleCancel = () => {
        reset({
            name: "",
            genre: "",
            rating: 0,
            file: null,
        });
        onClose();
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 600, minHeight: 400 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <DialogTitle>Add A Movie</DialogTitle>
                <DialogContent dividers sx={{ display: "flex", height: "400", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <AppTextInput control={control} name='name' label='Movie Name' />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <AppSelectList control={control} items={options} name='genre' label='Genre' />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <AppRating size='large' control={control} name='rating' label='Rating' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppDropZone control={control} name='file' />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {watchFile ? (<img src={watchFile.preview} alt="preview" style={{ width: 100 }}></img>) : ""}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type='submit'>ADD</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}


