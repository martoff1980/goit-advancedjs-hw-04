import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api';
import { displayImages, showLoader, hideLoader } from './js/render-functions';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  gallery.innerHTML = '';

  const searchQuery = event.target.elements.searchQuery.value.trim();
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
    const images = await fetchImages(searchQuery);

    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
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
  }
});
