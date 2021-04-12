import myFunction, { multiply } from "./myModule";

myFunction();

const result = multiply(2, 5);

console.log(result);

// Burger Menu Slide In
const burgerBtn = document.querySelector(".burger__btn");
const burgerNav = document.querySelector(".burger__nav");
const holeBody = document.querySelector("body");

function openMenu() {
  burgerNav.classList.add("openheader");
  holeBody.classList.add("noscroll");
}

burgerBtn.addEventListener("click", openMenu);
