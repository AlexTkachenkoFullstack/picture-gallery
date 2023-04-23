export function buildMarkup(arrayOfItems) {
    return arrayOfItems.reduce((acc, { webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return acc += `
<div class="photo-card">
  <a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" height="180px" width="260px"/></a>
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
 
}