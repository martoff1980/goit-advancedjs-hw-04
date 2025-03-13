const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
const loadButtom = document.getElementById('load-button');
const loadingMessage = document.getElementById('loading-message');

async function displayImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="gallery-item">
            <div class="loader" id="loader" style="display: block"></div>
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}"/>
              <div class="info">
                <p><b>Likes:</b> ${likes}</p>
                <p><b>Views:</b> ${views}</p>
                <p><b>Comments:</b> ${comments}</p>
                <p><b>Downloads:</b> ${downloads}</p>
              </div>
            </a>
          </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  blockedLoader();
}
function blockedLoader() {
  const imagesArray = document.querySelectorAll('.gallery-item img');
  imagesArray.forEach(img => {
    const loader = img.closest('.gallery-item').querySelector('.loader');
    if (loader) loader.style.display = 'none';
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showButtonLoadMore() {
  loadButtom.style.display = 'block';
}

function hideButtonLoadMore() {
  loadButtom.style.display = 'none';
}

function showLoadingMessage() {
  loadingMessage.style.display = 'block';
}

function hideLoadingMessage() {
  loadingMessage.style.display = 'none';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export {
  displayImages,
  showLoader,
  hideLoader,
  showButtonLoadMore,
  hideButtonLoadMore,
  showLoadingMessage,
  hideLoadingMessage,
  smoothScroll,
};
