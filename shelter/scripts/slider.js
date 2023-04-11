import { generateCards } from "./card.js";

const btnLeft = document.querySelector(".left-arrow__btn");
const btnRight = document.querySelector(".right-arrow__btn");
export const container = document.querySelector(".friends__pets");
const arrayOfCards = await generateCards();

const sliderContainer = document.querySelector(".slider-container");

class Slider {
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
  currentSide = null;
  isPrevious = false;
  // Counter for next slide iterations, needed for Next-->Next move
  nextCounter = 0;

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
        this.setCards();
        this.nextCounter = 1;
        break;
      case 1:
        this.arrStatus.previousArr.forEach(item => {
          this.arrayOfCards.push(item);
        });

        this.arrStatus.previousArr = [...this.arrStatus.currentArr];
        this.setCurrentArray();
        this.setCards();
        break;
      }
  }

  getPreviousArray() {
    let tempArr = [...this.arrStatus.currentArr]; 

    this.arrStatus.currentArr = [...this.arrStatus.previousArr]; 
    this.arrStatus.previousArr = [...tempArr];
    this.setCards();

    this.isPrevious = true;
    this.nextCounter = 0;
  }

  setCards() {
    // const width = container.offsetWidth;
    this.fillTempContainer();
    const currentContainer = document.querySelector(".friends__pets");
    let tempOffet = currentContainer.offsetLeft;
          
    if (this.currentSide == "right") {
      currentContainer.classList.add("friends__pets_slide-left");
      currentContainer.addEventListener("transitionend",() => {
          this.sliderContainer.removeChild(currentContainer);
      })
      // nextConteiner.classList.toggle("friends__pets_slide-hidden");
      // nextConteiner.style.left = 0;
    } else {
      this.tempContainer.classList.toggle("friends__pets_slide-hidden");
      sliderContainer.prepend(this.tempContainer);
      // setTimeout(() => {
      //   this.tempContainer.classList.toggle("friends__pets_slide-hidden");
      // },100)
      // currentContainer.addEventListener("transitionend",() => {
      //     this.sliderContainer.removeChild(currentContainer);
      // })
    }


    // container.replaceChildren(...this.arrStatus.currentArr);
    
    // console.log(...this.arrStatus.currentArr);

    // this.setLeftSideCards();
    // currentCards.forEach((item) => {
    //   if (this.currentSide == "left") {
    //     // item.style.right = `-${width}px`;
    //     item.style.right = `-25px`;
    //     item.style.left = "0px";
    //   } else {
    //     item.style.left = `-${width}px`;
    //     item.style.right = "0px";
    //   }
    // })
  }

  setLeftSideCards() {
    this.container
  }

  createTempContainer() {
    this.tempContainer = document.createElement("div");
    this.tempContainer.classList.add("friends__pets");
    this.tempContainer.append(...this.arrStatus.currentArr);
  }

  fillTempContainer() {
    this.tempContainer.replaceChildren(...this.arrStatus.currentArr); 
    // console.log(this.tempContainer)
    // if (this.currentSide == "left") {
    //   this.tempContainer.classList.toggle("friends__pets_slide-right");
    // } 
  }

  sliderInitializtion() {
    this.setCurrentArray();
    // this.setCards();
    this.createTempContainer();
  }
}

const slider = new Slider(sliderContainer, container, arrayOfCards);

btnRight.addEventListener("click", () => {
  if (slider.currentSide != "left") {
    slider.currentSide = "right";
    slider.setNextArray();
  }else {
    slider.currentSide = "right";
    slider.getPreviousArray();
  }
});

btnLeft.addEventListener("click", () => {
  if (slider.currentSide != "right") {
    slider.currentSide = "left";
    slider.setNextArray();
  }else {
    slider.currentSide = "left";
    slider.getPreviousArray();
  }
});

// TO DO MAKE SLIDES For SLider

