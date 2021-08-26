import galleryItems from "./gallery-items.js";

const gallery = document.querySelector(".gallery");
const largeImage = document.querySelector(".lightbox__image");
const modal = document.querySelector(".lightbox");
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");
let currentIndex;

// ========= ADD MARKUP  ===
const renderGallery = function (galleryItems) {
  galleryItems.forEach((el, i) => {
    gallery.insertAdjacentHTML(
      "beforeend",
      `<li class="gallery__item">
  <a class="gallery__link" href="${el.original}">
    <img class="gallery__image"
      src=""
      data-source="${el.original}"
      alt="${el.description}"
      data-index="${i}"
      loading = "lazy"
      data-minsrc = "${el.preview}"
    />
  </a>
  </li>`
    );
  });
};

// === открыть модалку ===
const openModal = () => {
  modal.classList.add("is-open");
  overlay.addEventListener("click", onOverlayClick);
  window.addEventListener("keydown", onBtnPress);
};
// === закрыть модалку ===
const closeModal = () => {
  modal.classList.remove("is-open");
  largeImage.src = "#";
  window.removeEventListener("keydown", onBtnPress);
  overlay.removeEventListener("click", onOverlayClick);
};

const onGalleryClick = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }

  let imageRef = event.target;
  let largeImageURL = imageRef.dataset.source;
  largeImage.src = largeImageURL;
  currentIndex = +imageRef.dataset.index;
  openModal();
};

const onOverlayClick = (event) =>
  event.currentTarget === event.target ? closeModal() : "";

const onBtnPress = (event) => {
  if (event.code === "Escape") {
    closeModal();
  } else if (event.code === "ArrowLeft") {
    currentIndex -= 1;
    currentIndex < 0 ? (currentIndex = galleryItems.length - 1) : "";
    largeImage.src = galleryItems[currentIndex].original;
  } else if (event.code === "ArrowRight") {
    currentIndex += 1;
    currentIndex > galleryItems.length - 1 ? (currentIndex = 0) : "";
    largeImage.src = galleryItems[currentIndex].original;
  }
};

renderGallery(galleryItems);
gallery.addEventListener("click", onGalleryClick);
closeBtn.addEventListener("click", closeModal);
// =======================================================================
const allImg = document.querySelectorAll("img");

const fnEntry = (entries, observer) => {
  if (entries[0].isIntersecting) {
    const img = entries[0].target;
    const needSrc = img.dataset.minsrc;
    img.src = needSrc;
    observer.disconnect();
  }
};

const addIO = (img) => {
  const intOb = new IntersectionObserver(fnEntry);
  intOb.observe(img);
};

allImg.forEach((img) => addIO(img));
