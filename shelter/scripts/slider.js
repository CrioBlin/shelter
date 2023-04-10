import { generateCards } from "./card.js";

const btnLeft = document.querySelector(".left-arrow__btn");
const btnRight = document.querySelector(".right-arrow__btn");
export const container = document.querySelector(".friends__pets");
const arrayOfCards = await generateCards();

class Slider {
  constructor(container, arrayOfCards) {
    this.container = container;
    this.arrayOfCards = arrayOfCards;
  }

  arrStatus = {
      previousArr: [],
      currentArr: [],
      nextArr: []
  }

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

  setPreviousArray() {
    let tempArr = [...this.arrStatus.currentArr]; 

    this.arrStatus.currentArr = [...this.arrStatus.previousArr]; 
    this.arrStatus.previousArr = [...tempArr];
    this.setCards();

    this.isPrevious = true;
    this.nextCounter = 0;
  }

  setCards() {
    const currentCards = document.querySelectorAll('.pet-card');
    const width = container.offsetWidth;
    
    console.log(...this.arrStatus.currentArr);

    currentCards.forEach((item) => {
      if (this.currentSide == "left") {
        // item.style.right = `-${width}px`;
        item.style.right = `-25px`;
        item.style.left = "0px";
      } else {
        item.style.left = `-${width}px`;
        item.style.right = "0px";
      }
    })
    container.replaceChildren(...this.arrStatus.currentArr);
    // container.insertAdjacentElement(...this.arrStatus.currentArr);
  }
}

const slider = new Slider(container, arrayOfCards);

slider.setCurrentArray();
slider.setCards();

btnRight.addEventListener("click", () => {
  if (slider.currentSide != "left") {
    slider.currentSide = "right";
    slider.setNextArray();
  }else {
    slider.currentSide = "right";
    slider.setPreviousArray();
  }
});

btnLeft.addEventListener("click", () => {
  if (slider.currentSide != "right") {
    slider.currentSide = "left";
    slider.setNextArray();
  }else {
    slider.currentSide = "left";
    slider.setPreviousArray();
  }
});

// TO DO MAKE SLIDES For SLider

