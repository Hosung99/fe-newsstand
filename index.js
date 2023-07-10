
let logoAll=[];
let logoSubscribe;
let MAX_PAGE_NUMBER = 3;
let MIN_PAGE_NUMBER = 0;
let currentPageNumber = 0;
const COUNT_PER_PAGE = 24;
const rightAsideButton = document.getElementById("aside-right");
const leftAsideButton = document.getElementById("aside-left");


function getData(){
    fetch("./article_data.json")
    .then(response=>response.json())
        .then(data=>{
            logoAll=data;
            shuffle(logoAll);
            refresh(logoAll);
    });
}

function refresh(logos){
    console.log(logos);
    const mainGrid = document.getElementById("main-grid");
    let logoRender = logos;
    mainGrid.innerHTML='';
    for(let PAGE_INDEX = currentPageNumber * COUNT_PER_PAGE; PAGE_INDEX < COUNT_PER_PAGE * currentPageNumber + 24 ; PAGE_INDEX++){
        const outerDiv = document.createElement("div");
        const newsLogo = document.createElement("img");
        newsLogo.src = `${logoAll[PAGE_INDEX].logo}`;
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
// const allNews = document.getElementById("main-left-01");
//     allNews.addEventListener('click',()=>{
//         refresh(logoAll);
//     });
// }

// function clickMySubscribeNews(){
// const subscribeNews = document.getElementById("main-left-02");
//     subscribeNews.addEventListener('click',()=>{
//         refresh(logoSubscribe);
//     });
// }

// function clickGridImage(){
// const gridImage = document.getElementById("grid-image");
//     gridImage.addEventListener('click',()=>{ 
//         refresh(subscribe_images);
//     });
// }

// function clickCardListImage(){
// const cardListImage = document.getElementById("card-list-image");     
//     cardListImage.addEventListener('click',()=>{
//         refresh(subscribe_images);
//     });
//}

function clickRightAsideButton(){
    const rightAsideButton = document.getElementById("aside-right");
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
//event target으로 받아서 visibility 처리하기

function makeVisibilityHidden(){

}

function makeVisibilityHiddenVisible(){

}

function clickLeftAsideButton(){
    const leftAsideButton = document.getElementById("aside-left");
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

function init(){
    clickNewsStand();
    clickRightAsideButton();
    clickLeftAsideButton();
    setDate();
}

getData();
// clickAllNews();
//clickMySubscribeNews();
// clickGridImage();
// clickCardListImage();


init();