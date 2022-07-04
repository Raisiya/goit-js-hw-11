import axios from 'axios';
const APIKEY = '28417818-644aba253245949f255c992a1';
const params = new URLSearchParams({
    key: APIKEY,
    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
});

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class GetPixabayApi {
    constructor() { };
    
    async fetchImages() {
    const { data } = await axios.get(`?${params}`);
    return data;
    }
}

