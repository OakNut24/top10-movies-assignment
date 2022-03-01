import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string, genre: string) => axios.get(url + "/" + genre).then((response) => response.data),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers: { 'Content-type': 'multipart/form-data' }
    }).then(responseBody)
}


function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}


const Movies = {
    list: (genre: string) => requests.get('movies', genre),
    createMovie: (movie: any) => requests.postForm('movies', createFormData(movie))
        .then(responseBody),
}





const agent = {
    Movies,
}

export default agent;