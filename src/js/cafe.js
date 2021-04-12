// Farbumschlag Navigationsleiste im Header-Bereich
const cafeHeader = document.querySelector(".header--cafe");
const navLeiste = document.querySelector(".header__menu");
const logoNav = document.querySelector(".header__logo");
const burgerIcon = document.querySelector(".burger__icon");
const linkCafe = document.querySelector(".cafe");
const linkHerkunft = document.querySelector(".herkunft");
const linkShop = document.querySelector(".shop");
const linkKontakt = document.querySelector(".kontakt");

function obFarbe(header) {
  if (header[0].isIntersecting === true) {
    navLeiste.classList.add("farbumschlag");
    logoNav.classList.add("farbumschlag");
    burgerIcon.classList.add("burger--weiss");
    linkCafe.classList.add("farbumschlag");
    linkHerkunft.classList.add("farbumschlag");
    linkShop.classList.add("farbumschlag");
    linkKontakt.classList.add("farbumschlag");
  } else {
    navLeiste.classList.remove("farbumschlag");
    logoNav.classList.remove("farbumschlag");
    burgerIcon.classList.remove("burger--weiss");
    linkCafe.classList.remove("farbumschlag");
    linkHerkunft.classList.remove("farbumschlag");
    linkShop.classList.remove("farbumschlag");
    linkKontakt.classList.remove("farbumschlag");
  }
}

const ob = new IntersectionObserver(obFarbe, {
  threshold: [0.08],
});

ob.observe(cafeHeader);
