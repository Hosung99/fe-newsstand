import { data } from "./data.js";

let logoAll = data.all_images;
let logoSubscribe = data.subscribe_images;
let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
const COUNT_PER_PAGE = 24;
const allNews = document.getElementById("main-left-01");
const subscribeNews = document.getElementById("main-left-02");
const gridImage = document.getElementById("grid-image");
const cardListImage = document.getElementById("card-list-image");
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");
const mainGrid = document.getElementById("main-grid");

function refresh(logos){
    let logoRender = logos;
    mainGrid.innerHTML='';
    for(let PAGE_INDEX = currentPageNumber * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * currentPageNumber + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        const newsLogo = document.createElement("img");
        newsLogo.src = `icons/light/${logoRender[PAGE_INDEX]}`;
        outerDiv.append(newsLogo);
        mainGrid.append(outerDiv);
    }
}

function clickNewsStand(){
    const newsStand=document.getElementById("header-div-01");
    newsStand.addEventListener("click",()=>{
        window.location.replace("index.html");
    })
} 

function getDate(){
    let time;
    const weekend=["일","월","화","수","목","금","토"];
    const today = new Date();
    const year = today.getFullYear();
    let month = `0${today.getMonth()+1}`;
    month = month.slice(-2);
    let date = `0${today.getDate()}`;
    date = date.slice(-2);
    const day = weekend[today.getDay()];
    time = `${year}. ${month}. ${date}. ${day}요일`;
    return time;
}

function setDate(){
    let time = getDate();
    const dateDiv = document.getElementById("header-div-02");
    const timeDiv = document.createElement("div");
    timeDiv.innerText = time;
    dateDiv.appendChild(timeDiv);
}

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}

// function clickAllNews(){
//     allNews.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
// }

// function clickMySubscribeNews(){
//     subscribeNews.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
// }

// function clickGridImage(){
//     gridImage.addEventListener('click',()=>{ 
//         refresh(subscribe_images);
//     });
// }

// function clickCardListImage(){
//     cardListImage.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
//}

function clickRightAsideButton(){
    rightAsideButton.addEventListener("click",()=>{
        if (currentPageNumber == MAX_PAGE_NUMBER - 1){
            rightAsideButton.style.visibility = "hidden";
            currentPageNumber++;
            refresh(logoAll);
            return ;
        }
        currentPageNumber++;
        leftAsideButton.style.visibility="visible";
        refresh(logoAll);
    });
}

function clickLeftAsideButton(){
    leftAsideButton.addEventListener("click",()=>{
        if (currentPageNumber == MIN_PAGE_NUMBER + 1){
            leftAsideButton.style.visibility = "hidden";
            currentPageNumber--;
            refresh(logoAll);
            return ;
        }
        currentPageNumber--;
        rightAsideButton.style.visibility="visible"
        refresh(logoAll);
    });
}

shuffle(logoAll);
refresh(logoAll);
// clickAllNews();
//clickMySubscribeNews();
// clickGridImage();
// clickCardListImage();

function init(){
    clickNewsStand();
    clickRightAsideButton();
    clickLeftAsideButton();
    setDate();
}

init();