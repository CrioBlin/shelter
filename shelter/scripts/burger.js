const body = document.querySelector("body");
const burgerMenu = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__item");

const burgerActivation = () => {
  body.classList.toggle("body_lock");
  navSlide();
  burgerMenu.classList.toggle("burger_active");
}

const navSlide = () => {
  if (nav.classList.contains("nav_active")) {
    setTimeout(() => {
      nav.classList.toggle("nav_active");
    },250)
  } else {
    nav.classList.toggle("nav_active");
  }

  setTimeout(() => {
    nav.classList.toggle("nav_active-slide");
  },1)
}

burgerMenu.addEventListener("click", (event) => {
  burgerActivation();
  event.stopPropagation();
})

nav.addEventListener("click", (event) => {
  event.stopPropagation();
})

body.addEventListener("click", (event) => {
  if (body.classList.contains("body_lock")) {
    burgerActivation();
  }
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (burgerMenu.classList.contains("burger_active")) {
      burgerActivation();
    }
  })
})

export {burgerActivation};