import { setDate } from "./js/setData/setDate.js";
import { rollingBanner } from "./js/rollingBanner.js";
import { clickNewsStand } from "./js/newsStand.js";
import { renderMain } from "./js/render/renderMain.js";
import { clickGridCardList } from "./js/clickEvent/clickGridOrCardList.js";
import { clickDarkLightMode } from "./js/clickEvent/clickDarkMode.js";

(function init() {
  clickNewsStand(document.getElementById("header-div-01"));
  setDate(document.getElementById("header-div-02"));
  rollingBanner();
  renderMain("all", "grid");
  clickGridCardList();
  clickDarkLightMode();
})();
