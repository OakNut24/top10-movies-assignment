import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioButtonGroup from '../../../app/components/AppRadioButtonGroup';
import { useEffect, useState } from 'react';

export interface Props {
    value: string;
    open: boolean;
    onClose: (value?: string) => void;
}

const options = [
    'Action',
    'Science Fiction',
    'Thriller',
    'Comedy',
    'Drama'
];
//The modal component
export default function FilterMoviesDialog(props: Props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);


    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };
    const handleReset = () => {
        onClose("");
    }

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>Filter Genre</DialogTitle>
            <DialogContent dividers>

                <RadioButtonGroup
                    selectedValue={value}
                    options={options}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReset}>
                    Reset
                </Button>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
