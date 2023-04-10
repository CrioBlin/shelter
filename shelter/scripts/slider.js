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
    container.replaceChildren(...this.arrStatus.currentArr);
  }
}

const slider = new Slider(container, arrayOfCards);
let currentSide = null;

slider.setCurrentArray();
slider.setCards();

btnRight.addEventListener("click", () => {
  if (currentSide != "left") {
    slider.setNextArray();
  }else {
    slider.setPreviousArray();
  }
  currentSide = "right";
});

btnLeft.addEventListener("click", () => {
  if (currentSide != "right") {
    slider.setNextArray();
  }else {
    slider.setPreviousArray();
  }
  currentSide = "left";
});

// TO DO MAKE SLIDES For SLider