import axios from 'axios';
import Notiflix from 'notiflix';

import { query, page, refs } from './index';
const API_KEY = '28417818-644aba253245949f255c992a1';
const URL = 'https://pixabay.com/api/';

const per_page = 40;

export const notiflixOptions = Notiflix.Notify.init({
    width: '400px',
    position: 'top-right',
    distance: '50px',
    borderRadius: '10px',
    clickToClose: true,
    useIcon: false,
    fontSize: '23px',
});

const fetchPictures = async query => {
try {
    const response = await axios(
        `${URL}?image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=${per_page}&key=${API_KEY}&q=${query}`,
    );

    const responseData = await response.data.hits;
;
    if (responseData.length === 0) {
        throw new Error();
    }

    if (page === 1) {
        Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`,
        notiflixOptions,
        );
    }
        return responseData;
    } catch (error) {

    refs.btnLoadMore.setAttribute('disabled', 'disabled');
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.', notiflixOptions,
        );
    }
};

async function renderMarkup() {
    try {
    const markup = await fetchPictures(query);
    const render = await markup
    .map(({largeImageURL, webformatURL,tags, likes, views, comments,downloads}) => {
        return `<div  class="photo-card">
        <a href = '${largeImageURL}'>
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
        <p class="info-item">
        <b>Likes</b>${likes}
        </p>
        <p class="info-item">
        <b>Views</b>${views}
        </p>
        <p class="info-item">
        <b>Comments</b>${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>${downloads}
        </p>
        </div>
        </a>
        </div>`;
        }).join('');

        await refs.gallery.insertAdjacentHTML('beforeend', render);
        refs.btnLoadMore.classList.remove('hidden');
        refs.btnSearchAnchor.classList.remove('hidden');
    } catch (error) {
        'error', error;
    }
}

export default renderMarkup;