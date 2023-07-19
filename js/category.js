import { increment, totalTime } from "../utils/constants.js";
import { drawNews } from "./drawNews.js";
import Stores from "./core/Store.js";
import { makeArrow } from "../utils/utils.js";
import { categoryCnt } from "./setData.js/setCategoryData.js";

let progress = 0;
let currentCategoryPageNumber = 1;
let currentCategoryIndex = 0;
let currentCategoryPage;
let currentProgressBar;

const drawCategory = (categoryCnt) => {
  drawCategoryBar(categoryCnt);
  addEventArrowList(categoryCnt);
};

function drawCategoryBar(categoryCnt) {
  let categoryHtml = `<div class="categoryWrap"><ul>`;
  categoryCnt.forEach((key, index) => {
    categoryHtml += `<div class="categoryItem" id="category${index}"><div class="progress-bar" id=${
      key.key
    }></div><span class="category">${key.key}</span></li>${drawCategoryNumber(
      key
    )}</div>`;
  });
  categoryHtml += `</ul></div>`;
  document.getElementById("category").innerHTML = categoryHtml;
  // clickCategory();
  drawCategoryItem(categoryCnt, 0);
}

function drawCategoryNumber(category) {
  return category.value
    ? `<span class="currentCategoryPage">1</span><span class="categoryCnt">/ ${category.value}</span>`
    : `<span class="currentCategoryPages"></span><span class="categoryCnt"></span>`;
}

function drawCategoryItem(categoryCnt, categoryIndex) {
  currentCategoryIndex = 0;
  currentCategoryPage = document.querySelectorAll(".currentCategoryPage");
  clearCategoryNumber(categoryCnt);
  updateCurrentProgressBar();
  drawNews();
  if (Stores.getProgressInterval() != undefined) {
    Stores.clearProgressInterval();
    progressReset(currentProgressBar, currentCategoryPage);
  }
  intervalProgress(categoryCnt, currentProgressBar, currentCategoryPage);
}

function updateCurrentProgressBar() {
  currentProgressBar =
    document.querySelectorAll(".progress-bar")[currentCategoryIndex];
}

function categoryDisplayOn(categoryItem) {
  categoryItem[currentCategoryIndex].style.backgroundColor = "#7890E7";
  categoryItem[currentCategoryIndex].style.color = "#FFFFFF";
  if (currentCategoryPage[currentCategoryIndex] !== undefined)
    currentCategoryPage[currentCategoryIndex].style.display = "flex";
  document.querySelectorAll(".categoryCnt")[
    currentCategoryIndex
  ].style.display = "flex";
}

function categoryDisplayClear(categoryCnt, categoryItem) {
  categoryCnt.forEach((value, index) => {
    categoryItem[index].style.backgroundColor = "#f5f7f9";
    categoryItem[index].style.color = "#5f6e76";
    categoryItem[index].style.textDecoration = "none";
    categoryItem[index].classList.remove("active");
    if (currentCategoryPage[index] !== undefined)
      currentCategoryPage[index].style.display = "none";
    document.querySelectorAll(".categoryCnt")[index].style.display = "none";
  });
}

function intervalProgress(categoryCnt, progressBar, currentCategoryPage) {
  progress = 0;
  Stores.setProgressInterval(
    setInterval(() => {
      doProgress(categoryCnt, progressBar, currentCategoryPage);
    }, totalTime / (100 / increment))
  );
}

function doProgress(categoryCnt, progressBar, currentCategoryPage) {
  progressBar.style.transition = `width ${
    totalTime / increment / 1000
  }s linear`;
  if (progress === 100) {
    currentCategoryPageNumber++;
    if (
      currentCategoryPageNumber ===
      categoryCnt[currentCategoryIndex].value + 1
    ) {
      currentCategoryPageNumber = 1;
      if (currentCategoryIndex === categoryCnt.length - 1)
        currentCategoryIndex = 0;
      else currentCategoryIndex++;
      Stores.clearProgressInterval();
    }
    drawCategoryItem(currentCategoryIndex);
    progressReset(progressBar, currentCategoryPage);
    return;
  } else progressFill(progressBar);
}

function progressReset(progressBar, currentCategoryPage) {
  if (currentCategoryPage[currentCategoryIndex] !== undefined) {
    currentCategoryPage[currentCategoryIndex].style.textDecoration = "none";
    currentCategoryPage[currentCategoryIndex].innerHTML =
      currentCategoryPageNumber;
  }
  progressBar.style.transition = "";
  progressBar.style.width = "0%";
  progress = 0;
}

function progressFill(progressBar) {
  progress += increment;
  progressBar.style.width = `${progress}%`;
}

function clearCategoryNumber(categoryCnt) {
  const categoryItem = document.querySelectorAll(".categoryItem");
  categoryDisplayClear(categoryCnt, categoryItem);
  categoryDisplayOn(categoryItem);
}

function clearNewsInterval() {
  drawNews();
  Stores.clearProgressInterval();
  updateCurrentProgressBar();
  intervalProgress(categoryCnt, currentProgressBar, currentCategoryPage);
}

function addEventArrowList(categoryCnt) {
  makeArrow();
  const leftAsideButton = document.getElementById("left-arrow");
  const rightAsideButton = document.getElementById("right-arrow");
  leftAsideButton.style.visibility = "visible";
  leftAsideButton.addEventListener("click", () => {
    decreaseListPage(categoryCnt);
  });
  rightAsideButton.addEventListener("click", () => {
    increaseListPage(categoryCnt);
  });
}

function increaseListPage() {
  if (currentCategoryPageNumber === categoryCnt[currentCategoryIndex].value) {
    currentCategoryPageNumber = 1;
    progressReset(currentProgressBar, currentCategoryPage);
    if (currentCategoryIndex === categoryCnt.length - 1)
      currentCategoryIndex = 0;
    else currentCategoryIndex++;
    clearCategoryNumber(categoryCnt);
    clearNewsInterval();
    return;
  }
  currentCategoryPageNumber++;
  progressReset(currentProgressBar, currentCategoryPage);
  clearNewsInterval();
}

function decreaseListPage() {
  if (currentCategoryPageNumber === 1) {
    currentCategoryPageNumber = 1;
    progressReset(currentProgressBar, currentCategoryPage);
    if (currentCategoryIndex === 0)
      currentCategoryIndex = categoryCnt.length - 1;
    else currentCategoryIndex--;
    clearCategoryNumber(categoryCnt);
    clearNewsInterval();
    return;
  }
  currentCategoryPageNumber--;
  progressReset(currentProgressBar, currentCategoryPage);
  clearNewsInterval();
}

// function clickCategory() {
//   for (let categoryNum = 0; categoryNum < categoryCnt.length; categoryNum++) {
//     const categoryItem = document.getElementById(`category${categoryNum}`);
//     categoryItem.addEventListener("click", function () {
//       progressReset(currentProgressBar, currentCategoryPage);
//       currentCategoryPageNumber = 1;
//       drawCategoryItem(categoryNum);
//     });
//     categoryItem.addEventListener("mouseover", function () {
//       if (categoryNum !== currentCategoryIndex) {
//         categoryItem.style.textDecoration = "underline";
//       }
//     });
//     categoryItem.addEventListener("mouseout", function () {
//       if (categoryNum !== currentCategoryIndex) {
//         categoryItem.style.textDecoration = "";
//       }
//     });
//   }
// }
export { drawCategory, currentCategoryIndex, currentCategoryPageNumber };
