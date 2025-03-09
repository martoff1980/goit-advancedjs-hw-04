export async function fetchImages(query) {
  const apiKey = '49218943-825793be7dcf8f9e924089ba3';
  const per_page = 30;
  const response = await fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=${per_page}&orientation=horizontal&safesearch=true`
  );
  const data = await response.json();

  return data.hits;
}
