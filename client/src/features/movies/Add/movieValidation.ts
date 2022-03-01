import * as yup from 'yup';


export const validationScehma = yup.object({
    name: yup.string().required(),
    genre: yup.string().required(),
    rating: yup.number().required().moreThan(0),
    file: yup.mixed().required("image of the movie is a required field").test("type", "We only support jpg/jpeg/png", function (value) {

        if (value && (value.type === "image/jpeg" || value.type === "image/png" || value.type === "image/png"))
            return true;
        else
            return false;
    }),
})
