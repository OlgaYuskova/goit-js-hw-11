import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '39858338-ffd7e7633f3f70977c15ff106',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});
