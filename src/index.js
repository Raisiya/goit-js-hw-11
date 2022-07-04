import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';
import { GetPixabayApi } from './apikey';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const getPixabayApi = new GetPixabayApi();

form.addEventListener('submit', onFormSubmit);

function createGallaryMarkup(images) {
    return images.map(({ webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => `<div class="photo-card"><a href = "${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Like: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p></a>
        </div>
      </div>`).join('');
};

function renderGallery(images) {
  gallery.insertAdjacentHTML('beforeend', createGallaryMarkup(images));
}

function onFormSubmit (evt) {
  evt.preventDefault();
  getPixabayApi.fetchImages();
  // renderGallery();
}