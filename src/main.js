// main.js

import { getUser } from "./index";

const refs = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery-img"),
    buttonMore: document.querySelector(".btn-load-more")
};

let currentPage = 1;

refs.buttonMore.addEventListener('click', onHandleLMBtnClick);
refs.form.addEventListener('submit', onHandleSearchImg);

 function searchImg(page, q) {
    if (page === 1) {
        refs.gallery.innerHTML = '';
        currentPage = 1;
    }

     getUser(page, q)
         .then(data => {
         if (data.hits.length === 0) {
            console.log('Sorry, there are no images matching your search query. Please try again.');
        } else {
            createMarkupImg(data.hits);
             };
        if (refs.gallery.childElementCount < data.totalHits) {
                 unhideMoreBtn();
        };
         })
     .catch(error => {
        console.error(error);
     })
         .finally(hideMoreBtn())
}

function createMarkupImg(imgs) {
    const galleryContainer = imgs.map(
        img => `<div class="img-card">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}"  />
            </a>
            <div class="info">
                <p class="options"><b>Views:</b> ${img.views}</p>
                <p class="options"><b>Likes:</b> ${img.likes}</p>
                <p class="options"><b>Downloads:</b> ${img.downloads}</p>
                <p class="options"><b>Comments:</b> ${img.comments}</p>
            </div>
        </div>`
    ).join('');

    refs.gallery.insertAdjacentHTML('beforeend', galleryContainer);
}

function onHandleSearchImg(evt) {
    evt.preventDefault();
    const searchInputImg = refs.form.querySelector('input').value.trim();
    if (searchInputImg !== "") {
        searchImg(1, searchInputImg);
    }
}

function onHandleLMBtnClick() {
    const searchQuery = refs.form.querySelector('input').value.trim();
    if (searchQuery !== '') {
        currentPage += 1;
        searchImg(currentPage, searchQuery);
        scrollGallery();
    }
}

function unhideMoreBtn() {
    refs.buttonMore.style.display = 'block';
}

function hideMoreBtn() {
    refs.buttonMore.style.display = 'none';
}

function scrollGallery() {
    const { height: cardHeight } = refs.gallery.lastElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}