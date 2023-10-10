import axios from './index';

const refs = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery-img"),
    buttonMore: document.querySelector(".btn-load-more")
};

let currentPage = 1;

refs.buttonMore.addEventListener('click', onHandleLMBtnClick);

function onHandleSearchImg(evt) {
    evt.preventDefault();
    const searchInputImg = refs.form.querySelector('input').value.trim();
    if (searchInputImg !== "") {
        searchImg(1, searchInputImg);
    }
}

async function searchImg(page, q) {
    if (page === 1) {
        refs.gallery.innerHTML = '';
        currentPage = 1;
    }

    const params = {
        query: q,
        page: page,
    };
    
    try {
        const resp = await axios.get('URL_TO_YOUR_API', { params });
        const data = resp.data;
        if (data.hits.length === 0) {
            console.log('Sorry, there are no images matching your search query. Please try again.');
        } else {
            createMarkupImg(data.hits);
        }
        if (page === 1) {
            console.log(`We found ${data.totalHits} images.`);
        }
        if (refs.gallery.childElementCount < data.totalHits) {
            unhideMoreBtn();
        } else {
            hideMoreBtn();
        }
    } catch (error) {
        console.error(error);
    }
}

function createMarkupImg(imgs) {
    const galleryContainer = imgs.map(
        img => `<div class="photo-card">
            <a href="${img.largeImageURL}">
                <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><b>Views:</b> ${img.views}</p>
                <p class="info-item"><b>Likes:</b> ${img.likes}</p>
                <p class="info-item"><b>Downloads:</b> ${img.downloads}</p>
                <p class="info-item"><b>Comments:</b> ${img.comments}</p>
            </div>
        </div>`
    ).join('');

    refs.gallery.insertAdjacentHTML('beforeend', galleryContainer);
}

function scrollGallery() {
    const { height: cardHeight } = refs.gallery.lastElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
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







