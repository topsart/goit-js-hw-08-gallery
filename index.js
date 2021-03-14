import * as galleryItems from './gallery-items.js';

const ulGallery = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const lightBoxImage = document.querySelector('.lightbox__image');
const lightBoxButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightBoxOverlay = document.querySelector('.lightbox__overlay');
const escButton = 'Escape';
const arrowLeft = 'ArrowLeft';
const arrowRight = 'ArrowRight';
let currentImgIndex = null;

const createGalleryItem = () => {
  const itemGallery = document.createElement('li');
  itemGallery.classList.add('gallery__item');

  return itemGallery;
};

const createLink = elem => {
  const itemLink = document.createElement('a');
  itemLink.classList.add('gallery__link');
  itemLink.setAttribute('href', elem.original);

  return itemLink;
};

const setMultipleAttributes = (elem, attributes) => {
  for (let key in attributes) {
    elem.setAttribute(key, attributes[key]);
  }
};

const createImg = (elem, idx) => {
  const itemImg = document.createElement('img');
  itemImg.classList.add('gallery__image');

  setMultipleAttributes(itemImg, {
    src: elem.preview,
    alt: elem.description,
    'data-source': elem.original,
    'data-index': idx,
  });

  return itemImg;
};

const renderGridItem = (galleryItem, link, img) => {
  ulGallery.append(galleryItem);
  galleryItem.append(link);
  link.append(img);
};

const gridRenderer = () => {
  galleryItems.default.forEach((elem, idx) => {
    renderGridItem(createGalleryItem(), createLink(elem), createImg(elem, idx));
  });
};

const renderModal = imgIndex => {
  currentImgIndex = Number(imgIndex);
  lightBox.classList.add('is-open');

  setMultipleAttributes(lightBoxImage, {
    src: galleryItems.default[imgIndex].original,
    alt: galleryItems.default[imgIndex].description,
  });
};

const closeModal = () => {
  currentImgIndex = null;
  lightBox.classList.remove('is-open');
  lightBoxImage.removeAttribute('src');
  lightBoxImage.removeAttribute('alt');
};

ulGallery.addEventListener('click', event => {
  event.preventDefault();
  renderModal(event.target.dataset.index);
});

lightBoxButton.addEventListener('click', closeModal);

lightBoxOverlay.addEventListener('click', closeModal);

const swipeLeft = () => {
  const minIndex = 0;
  if (currentImgIndex - 1 < minIndex) {
    currentImgIndex = galleryItems.default.length - 1;
  } else {
    currentImgIndex -= 1;
  }
  renderModal(currentImgIndex);
};

const swipeRight = () => {
  const maxIndex = galleryItems.default.length - 1;
  if (currentImgIndex === maxIndex) {
    currentImgIndex = 0;
  } else {
    currentImgIndex += 1;
  }
  renderModal(currentImgIndex);
};

document.addEventListener('keyup', event => {
  switch (event.key) {
    case escButton:
      closeModal();
      break;

    case arrowLeft:
      swipeLeft();
      break;

    case arrowRight:
      swipeRight();
      break;
  }
});

gridRenderer();
