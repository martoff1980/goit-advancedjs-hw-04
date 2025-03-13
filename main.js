import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByAxios } from './js/pixabay-api';
import {
  displayImages,
  showLoader,
  hideLoader,
  showButtonLoadMore,
  hideButtonLoadMore,
  showLoadingMessage,
  hideLoadingMessage,
  smoothScroll,
} from './js/render-functions';

const searchForm = document.getElementById('search-form');
const loadButtom = document.getElementById('load-button');
const gallery = document.getElementById('gallery');
let SEARCHQUERY;
let page = 1;
const perPage = 15;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  gallery.innerHTML = '';
  hideButtonLoadMore();
  const searchQuery = event.target.elements.searchQuery.value.trim();
  SEARCHQUERY = searchQuery;
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  showLoadingMessage();
  try {
    const { hits, totalHits } = await getImagesByAxios(
      searchQuery,
      page,
      perPage
    );
    const images = hits;
    const limits = totalHits;

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      showButtonLoadMore();
      displayImages(images);
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    hideLoadingMessage();
  }
});

loadButtom.addEventListener('click', async event => {
  event.preventDefault();

  hideButtonLoadMore();
  showLoadingMessage();
  const searchQuery = SEARCHQUERY;
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  try {
    page += 1;

    const { hits, totalHits } = await getImagesByAxios(
      searchQuery,
      page,
      perPage
    );
    const images = hits;
    const limits = totalHits;

    if (images.length === 0 && page === 1) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      showButtonLoadMore();
      displayImages(images);
      lightbox.refresh();

      if (page * perPage >= limits) {
        hideButtonLoadMore();
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching images',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    hideLoadingMessage();
    smoothScroll();
  }
});
