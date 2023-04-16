import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './js/fetchPictures'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";


const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  totalItemsEl:document.querySelector('.totalItemsInfo'),
}

let currentPage = null;
const limOnPage = 40;
let totalItems = null;
let valueOfInput = null;
 const options={
   closeText: 'x',
   captionsData: "alt",
   captionDelay: 500,
  }
  let gallery = new SimpleLightbox('.gallery a', options);


refs.searchFormEl.addEventListener('submit', handleSearchFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);

function  handleSearchFormSubmit(event) {
  event.preventDefault();
  addClassHidden();
  refs.galleryEl.innerHTML = '';
  currentPage = 1;
  valueOfInput = event.target.elements.searchQuery.value;
  getFetchPicture(valueOfInput);
  event.target.elements.searchQuery.value=''
}

function addClassHidden() {
  refs.totalItemsEl.classList.add('hidden')
  refs.loadMoreBtnEl.classList.add('hidden');
}

async function getFetchPicture(valueOfInput) {
  const response = await fetchPictures(valueOfInput, currentPage, limOnPage);
  totalItems = response?.data?.totalHits;
  const arrayOfItems = response?.data?.hits;
  if (arrayOfItems.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.',{width: '400px', fontSize: '18px'});
    return
  }
 buildMarkup(arrayOfItems);
}

function buildMarkup(arrayOfItems) {
  isListOfItemsFinished();
  addTotalHitsInfo(totalItems);
  const markupString = arrayOfItems.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return acc += `
<div class="photo-card">
  <a class="gallery-link" href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}" loading="lazy" height="200px" width="280px"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
        `
  }, '');
  refs.galleryEl.insertAdjacentHTML("beforeend", markupString);
  smoothScroll();
 
  gallery.refresh();
  applySimpleLightbox();
}

function isListOfItemsFinished() {
  if (totalItems - limOnPage * currentPage <= 0) {
    refs.loadMoreBtnEl.classList.add('hidden');
    Notify.failure("We're sorry, but you've reached the end of search results.", {width: '400px', fontSize: '18px'})
  return
  }
 refs.loadMoreBtnEl.classList.remove('hidden');
}

function addTotalHitsInfo(totalItems) {
  refs.totalItemsEl.classList.remove('hidden')
   refs.totalItemsEl.textContent = `Hooray! We found ${totalItems} images.`
}
 
function handleLoadMoreClick(event) {
  currentPage += 1;
  getFetchPicture(valueOfInput);
}


function applySimpleLightbox() {
 
  gallery.on('show.simplelightbox', function () {
});
  
}

function smoothScroll() {
  const { height: cardHeight } = refs.galleryEl
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}
