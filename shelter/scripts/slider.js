import { generateCards } from "./card.js";

const btnLeft = document.querySelector(".left-arrow__btn");
const btnRight = document.querySelector(".right-arrow__btn");
const container = document.querySelector(".friends__pets");
const arrayOfCards = await generateCards();
const sliderContainer = document.querySelector(".slider-container");

export class Slider {
  constructor(sliderContainer, container, arrayOfCards) {
    this.container = container;
    this.arrayOfCards = arrayOfCards;
    this.sliderContainer = sliderContainer;
    this.sliderInitializtion();
  }

  arrStatus = {
      previousArr: [],
      currentArr: [],
      nextArr: []
  }

  tempContainer = null;
  leftContainer = null;
  rightContainer = null;
  currentSide = null;
  isPrevious = false;

  // Counter for next slide iterations, needed for Next-->Next move
  nextCounter = 0;
  ///////////////////////////////////////////////////////////////////
  createRandomSet() {
    const setLength = this.container.children.length;
    const newSet = [];
  
    this.arrayOfCards.sort((a, b) => 0.5 - Math.random());
    
    for (let i = 0; i < setLength; i++) {
      newSet.push(this.arrayOfCards.shift());
    }
    
    return newSet;
  }

  setCurrentArray() {
    this.arrStatus.currentArr = this.createRandomSet();
  }

  // sets new Array of pet cards, and stours previous Array  
  setNextArray() {
    switch (this.nextCounter) {
      case 0: 
        if (this.isPrevious) {
          this.arrStatus.previousArr.forEach(item => {
            this.arrayOfCards.push(item);
          });
          this.isPrevious = false;
        }

        this.arrStatus.previousArr = [...this.arrStatus.currentArr]; 

        this.setCurrentArray();
        this.moveSlide();
        this.nextCounter = 1;
        break;
      case 1:
        this.arrStatus.previousArr.forEach(item => {
          this.arrayOfCards.push(item);
        });

        this.arrStatus.previousArr = [...this.arrStatus.currentArr];
        this.setCurrentArray();
        this.moveSlide();
        break;
      }
  }

  getPreviousArray() {
    let tempArr = [...this.arrStatus.currentArr]; 

    this.arrStatus.currentArr = [...this.arrStatus.previousArr]; 
    this.arrStatus.previousArr = [...tempArr];
    this.moveSlide();

    this.isPrevious = true;
    this.nextCounter = 0;
  }
  ////////////////////////////////////////////////////////////////

  moveSlide() {
    const currentContainer = document.querySelector(".friends__pets_active");
    this.clearSideContainers();

    if (this.currentSide == "right") {
      this.rightContainer.append(...this.arrStatus.currentArr);
      this.sliderContainer.classList.add("move-right");

      this.sliderContainer.addEventListener("animationend", () => {
        this.sliderContainer.classList.remove("move-right");
        currentContainer.replaceChildren(...this.arrStatus.currentArr);
        btnRight.addEventListener("click", moveRight);
      })
    } else {
      this.leftContainer.append(...this.arrStatus.currentArr);
      this.sliderContainer.classList.add("move-left");

      this.sliderContainer.addEventListener("animationend", () => {
        this.sliderContainer.classList.remove("move-left");
        currentContainer.replaceChildren(...this.arrStatus.currentArr);
        btnLeft.addEventListener("click", moveLeft);
      })
    }
  }

  createTempContainer() {
    const tempContainer = document.createElement("div");

    tempContainer.classList.add("friends__pets");
    return tempContainer;
  }

  setSideContainers() {
    const left = this.createTempContainer(),
          right = this.createTempContainer();

    left.classList.add("friends__pets-left-side");
    right.classList.add("friends__pets-right-side");

    this.leftContainer = left;
    this.rightContainer = right;
    this.sliderContainer.prepend(left);
    this.sliderContainer.append(right);
  }

  clearSideContainers() {
    this.rightContainer.innerHTML = "";
    this.leftContainer.innerHTML = "";
  }

  activateBtn() {
    btnRight.addEventListener("click", moveRight);
    btnLeft.addEventListener("click", moveLeft);
  }

  sliderInitializtion() {
    this.setSideContainers();
    this.setCurrentArray();
    this.container.replaceChildren(...this.arrStatus.currentArr)
  }
}

const slider = new Slider(sliderContainer, container, arrayOfCards, btnLeft, btnRight);

const moveRight = () => {
  if (slider.currentSide != "left") {
    slider.currentSide = "right";
    slider.setNextArray();
  }else {
    slider.currentSide = "right";
    slider.getPreviousArray();
  }
  btnRight.removeEventListener("click", moveRight)
}

const moveLeft = () => {
  if (slider.currentSide != "right") {
    slider.currentSide = "left";
    slider.setNextArray();
  }else {
    slider.currentSide = "left";
    slider.getPreviousArray();
  }
  btnLeft.removeEventListener("click", moveLeft)
}

btnRight.addEventListener("click", moveRight);

btnLeft.addEventListener("click", moveLeft);


