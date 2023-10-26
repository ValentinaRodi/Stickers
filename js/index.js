// Slider:
const slider = document.querySelector(".slider");
const slidersImg = slider.querySelector(".sliders-img");
const slideImg = slidersImg.querySelectorAll(".slide-img");
const slideText = slider.querySelectorAll(".slide__text");
const prevButton = slider.querySelector(".slider-button-prev");
const nextButton = slider.querySelector(".slider-button-next");
const slidersText = slider.querySelector(".sliders-text");

let slideIndex = 0;

prevButton.addEventListener("click", () => {
  if (slideIndex > 0) {
    slideIndex--;
    updateSlidePosition(slideIndex, slideIndex + 1);
  }
});

nextButton.addEventListener("click", () => {
  if (slideIndex < slideImg.length - 1) {
    slideIndex++;
    updateSlidePosition(slideIndex, slideIndex - 1);
  }
});

function updateSlidePosition(next, prev) {
  const screenWidth = window.screen.width;
  let slidePositionX = 0;
  if (screenWidth < 768) {
    slidePositionX = -next * 319;
  }

  if (screenWidth >= 768 && screenWidth < 1380) {
    slidePositionX = -next * 418;
  }

  if (screenWidth >= 1380) {
    slidePositionX = -next * 419;
  }

  if (slideIndex >= 0 && slideIndex < slideImg.length) {
    slidersImg.style.transform = `translateX(${slidePositionX}px)`;
    slideImg[next].classList.add("move-left_next");
    slideText[next].style.animation = "animation-top 2s";
    slideText[next].classList.remove("slide-opacity");
    slideImg[prev].classList.add("move-left_prev");
    slideText[prev].style.animation = "animation-done 2s";
    slideText[prev].classList.add("slide-opacity");
  }
}

// Touch slider
let slideCount = slidersImg.children.length;
let startX = 0;
let endX = 0;
let isDragging = false;
const windowWidht = window.screen.width;

function touchStart() {
  return function (event) {
    startX = event.touches[0].clientX;
    isDragging = true;
  };
}

function touchMove(event) {
  if (isDragging) {
    endX = event.touches[0].clientX;
  }
}

function touchEnd() {
  isDragging = false;
  let movedBy = startX - endX;

  if (movedBy > 0 && slideIndex < slideCount - 1) {
    slideIndex++;
    updateSlidePosition(slideIndex, slideIndex - 1);
  }

  if (movedBy < 100 && slideIndex > 0) {
    slideIndex--;
    updateSlidePosition(slideIndex, slideIndex + 1);
  }
}

slidersImg.addEventListener("touchstart", touchStart(0));
slidersImg.addEventListener("touchmove", touchMove);
slidersImg.addEventListener("touchend", touchEnd);

//Table
const table = document.querySelector(".table__content");
const tableBtn = document.querySelector(".table__btn");
const slideTitle = slider.querySelectorAll(".slider-title");
let clickTableBtn = false;

function addSlideTable() {
  slideImg.forEach((el, i) => {
    const cardTableLink = document.createElement("a");
    const cardTableImg = document.createElement("img");
    const cardTableTitle = document.createElement("p");

    cardTableLink.id = i;
    cardTableLink.className = `table__item table__item_${i + 1}`;
    cardTableImg.src = el.src;
    cardTableImg.className = "table__img";
    cardTableTitle.innerHTML = slideTitle[i].innerHTML;
    cardTableTitle.className = "table__text";

    table.appendChild(cardTableLink);
    cardTableLink.appendChild(cardTableImg);
    cardTableLink.appendChild(cardTableTitle);
  });
}
addSlideTable();

tableBtn.addEventListener("click", () => {
  if (!clickTableBtn) {
    clickTableBtn = true;

    table.classList.add("visible");

    tableBtn.textContent = "Скрыть";
    tableBtn.classList.add("rotate-img");
  } else {
    clickTableBtn = false;

    table.classList.remove("visible");

    tableBtn.textContent = "Посмотреть все Стикерсы";
    tableBtn.classList.remove("rotate-img");
  }
});

//Anchors
const linkTable = table.querySelectorAll(".table__item");

for (let anchor of linkTable) {
  anchor.addEventListener("click", function () {
    const blockID = anchor.getAttribute("id");

    if (blockID !== slideIndex) {
      updateSlidePosition(blockID, slideIndex);
      slideIndex = blockID;
    }
    document.documentElement.scrollIntoView(true);
  });
}
