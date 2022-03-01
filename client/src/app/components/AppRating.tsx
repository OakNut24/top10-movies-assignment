
import { Box, FormControl, FormHelperText, FormLabel, InputLabel, Rating, TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    name: string;
    size: string | any;
}

export default function AppRating(props: Props) {
    const { fieldState, field } = useController({ ...props, defaultValue: '0' })
    return (

        <FormControl fullWidth error={!!fieldState.error}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <FormLabel>{props.label}</FormLabel>
                <Rating name="rating" size={props.size} value={parseInt(field.value)} precision={1} onChange={field.onChange} />

                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </Box>
        </FormControl>

    )
}




//  <Select
//         value={field.value}
//         label={props.label}
//         onChange={field.onChange}
//     >
//         {props.items.map((item, index) => (
//             <MenuItem key={index} value={item}>{item}</MenuItem>
//         ))}
//     </Select>