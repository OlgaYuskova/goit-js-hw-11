// index.js

import axios from 'axios';

const KEY = "39858338-ffd7e7633f3f70977c15ff106";
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getUser(page, q, perPage) {

  return await axios.get(`?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
        .then((res) => res.data);
}
