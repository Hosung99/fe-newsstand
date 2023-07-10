import listArticle from "./data/list_article.json" assert { type: "json" };

const category = ["종합/경제", "방송/통신", "IT", "영자지", "스포츠/연예", "매거진/전문지", "지역"];

export default function list_main(){
    const mainGrid = document.getElementById("main-grid");
    mainGrid.innerHTML='';
    mainGrid.style.border = 'none';
}