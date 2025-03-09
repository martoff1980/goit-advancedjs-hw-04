const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');

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

export { displayImages, showLoader, hideLoader };
