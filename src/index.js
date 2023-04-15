import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPictures } from './js/fetchPictures'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
}

let currentPage = null;
const limOnPage = 40;
let totalItems = null;
let valueOfInput = null;
refs.searchFormEl.addEventListener('submit', handleSearchFormSubmit);


function  handleSearchFormSubmit(event) {
  event.preventDefault();
  refs.loadMoreBtnEl.classList.add('hidden');
  refs.galleryEl.innerHTML = '';
  currentPage = 1;
  valueOfInput = event.target.elements.searchQuery.value;
  getFetchPicture(valueOfInput);
}

async function getFetchPicture(valueOfInput) {
  const response = await fetchPictures(valueOfInput, currentPage, limOnPage);
 
  totalItems = response?.data?.totalHits;
  const arrayOfItems = response?.data?.hits;
  if (arrayOfItems.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return
  }
  addTotalHitsInfo(totalItems);
 buildMarkup(arrayOfItems);
}


function buildMarkup(arrayOfItems) {
  isListOfItemsFinished();
    const markupString= arrayOfItems.reduce((acc, {webformatURL, largeImageURL, tags, likes, views,comments,downloads}) => {
        return acc += `
<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="400px" /></a>
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
    }, '')
  refs.galleryEl.insertAdjacentHTML('beforeend', markupString);
  // applySimpleLightbox();
}

function isListOfItemsFinished() {
  if (totalItems - limOnPage * currentPage <= 0) {
    refs.loadMoreBtnEl.classList.add('hidden');
    Notify.failure("We're sorry, but you've reached the end of search results.")
  return
  }
 refs.loadMoreBtnEl.classList.remove('hidden');
}

function addTotalHitsInfo(totalItems) {
  refs.galleryEl.innerHTML = `<p class="totalHits" >Hooray! We found ${totalItems} images.</p >`
}
  


 refs.loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);
function handleLoadMoreClick(event) {
  currentPage += 1;
  getFetchPicture(valueOfInput);
}

// function applySimpleLightbox() {
//   let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function () {
// 	console.log('aaaa')
// });
// }
