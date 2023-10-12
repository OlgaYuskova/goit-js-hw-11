import axios from 'axios';

axios.defaults.headers.common["x-api-key"] =
  "39858338-ffd7e7633f3f70977c15ff106";
axios.defaults.baseURL = 'https://pixabay.com/api';

export function getUser() {

  const params = {
    page: 'page',
    q: 'q',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 10,
  };
  
  return axios
    .get('', { params })
    .then((res) => res.data);
}
