import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import { buildMarkup } from "./js/markup";
import { NewAPIService } from "./js/fetchPictures";
import { smoothScroll } from "./js/smoothScroll";
// import InfiniteScroll from 'infinite-scroll';
// var throttle = require('lodash.throttle');
const newAPIService = new NewAPIService();
const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.load-more'),
  totalItemsEl:document.querySelector('.totalItemsInfo'),
}


 const options={
   closeText: 'x',
   captionsData: "alt",
   captionDelay: 500,
  }
let gallery = new SimpleLightbox('.gallery a', options);

refs.searchFormEl.addEventListener('submit', handleSearchFormSubmit);
// refs.loadMoreBtnEl.addEventListener('click', handleLoadMoreClick);

function handleSearchFormSubmit(event) {
  event.preventDefault();
  refs.galleryEl.innerHTML = '';
  newAPIService.reset();
  addClassHidden();
  
  newAPIService.query = event.target.elements.searchQuery.value.trim();
  if (newAPIService.searchQuery === '') {
    Notify.failure('Enter your request in the field', { width: '400px', fontSize: '18px' })
    return
  }
  event.target.elements.searchQuery.value = '';
  getFetchPicture();
}


function addClassHidden() {
  refs.totalItemsEl.classList.add('hidden')
  refs.loadMoreBtnEl.classList.add('hidden');
}

async function getFetchPicture() {
if (newAPIService.isLoading) {
    return;
  }
  newAPIService.isLoading = true;

  const data = await newAPIService.fetchPictures();
  newAPIService.totalItems = data?.totalHits;
  const arrayOfItems = data?.hits;
  if (arrayOfItems.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.',{width: '400px', fontSize: '18px'});
    return
  }
   addTotalHitsInfo(newAPIService.totalItems);
refs.galleryEl.insertAdjacentHTML("beforeend", buildMarkup(arrayOfItems));
  smoothScroll(refs.galleryEl);
  gallery.refresh();
  isListOfItemsFinished();
  newAPIService.updateCurrentPage();
  newAPIService.isLoading = false;
}

function isListOfItemsFinished() {
  if (newAPIService.totalItems / (newAPIService.limOnPage * newAPIService.currentPage) <= 1) {
    // refs.loadMoreBtnEl.classList.add('hidden');
    Notify.failure("We're sorry, but you've reached the end of search results.", {width: '400px', fontSize: '18px'})
  return
  }
  // refs.loadMoreBtnEl.classList.remove('hidden');
}

function addTotalHitsInfo(totalItems) {
  refs.totalItemsEl.classList.remove('hidden')
   refs.totalItemsEl.textContent = `Hooray! We found ${totalItems} images.`
}

// Кнопка LoadMore
// async function handleLoadMoreClick(event) {
//   addClassHidden();
//    newAPIService.updateCurrentPage();
//    getFetchPicture();
// }

window.addEventListener('scroll', () => {
  if ((newAPIService.currentPage-1) * newAPIService.limOnPage < newAPIService.totalItems) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      
    getFetchPicture();
  }
    }
});






