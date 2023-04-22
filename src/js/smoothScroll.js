export function smoothScroll(galleryEl) {
  const { height: cardHeight } = galleryEl
  .firstElementChild.getBoundingClientRect();
 
window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

