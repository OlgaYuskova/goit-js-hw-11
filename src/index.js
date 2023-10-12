import axios from 'axios';

axios.defaults.headers.common["x-api-key"] =
  "39797585-95f120e70fb7e422bd65b56f5";
axios.defaults.baseURL = 'https://pixabay.com/api';

export function getUser(page, q) {

    const params = {
      page,
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 10,
    };
    
    return axios.get('/', { params })
        .then((res) => res.data);
}
