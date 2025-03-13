import axios from 'axios';

// Функція з попоредного HW
async function fetchImages(query) {
  const apiKey = '49218943-825793be7dcf8f9e924089ba3';
  const per_page = 15;
  const response = await fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=${per_page}&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();
  return data.hits;
}

// Модернезуємо попередню функцію
async function fetchImages2(query, page, per_page) {
  const apiKey = '49218943-825793be7dcf8f9e924089ba3';
  const response = await fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${page}&per_page=${per_page}&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();
  return { hits: data.hits, totalHits: data.totalHits };
}

//Створення нової функції за допомогаю Axios
async function getImagesByAxios(query, page, perPage) {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '49218943-825793be7dcf8f9e924089ba3',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return { hits: data.hits, totalHits: data.totalHits };
}

export { getImagesByAxios };
