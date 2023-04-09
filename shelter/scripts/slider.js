import { generateCards } from "./card.js";

const btnLeft = document.querySelector(".left-arrow__btn");
const btnRight = document.querySelector(".righth-arrow__btn");
export const container = document.querySelector(".friends__pets");

const arrayOfCards = await generateCards();

class Slider {
  constructor(previousBtn, nextBtn, container, arrayOfCards) {
    this.previousBtn = previousBtn;
    this.container = container;
    this.nextBtn = nextBtn;
    this.arrayOfCards = arrayOfCards;
    this.previousArr = [];
    this.currentArr = [];
    this.nextArr = [];
    this.status = "current"; 
  }

  createRandomSet() {
    const setLength = this.container.children.length;
    let newSet = [];
  
    this.arrayOfCards.sort((a, b) => 0.5 - Math.random());
  
    for (let i = 0; i < setLength; i++) {
      newSet.push(this.arrayOfCards.shift());
    }
  
    return newSet;
  }

  setCurrentArray() {
    this.currentArr = this.createRandomSet();
  }

  setNextArray() {
    switch (this.status) {
      // from current to Next (1 Times Next)
      case "current":
        // console.log("Current Pr: ", this.previousArr);
        // console.log("Current Cur: ", this.currentArr);
        this.previousArr = [...this.currentArr];
        this.setCurrentArray();
        this.status = "next";
        break;
      case "next":
        // from next to next (2 Times Next)
        this.previousArr.forEach(item => {
          this.arrayOfCards.push(item);
        });
        // console.log("Current Pr: ", this.previousArr);
        // console.log("Current Cur: ", this.currentArr[0]);  
        this.previousArr = [...this.currentArr];
        this.setCurrentArray();
        this.status = "current";
        // console.log("Next Pr: ", this.previousArr[0]);
        // console.log("Next Cur: ", this.currentArr[0]);
        break;
      case "previous":
        // from Next to previous (1 Time Previous)
        this.currentArr = [...this.previousArr]
        this.status = "current";
        // console.log("Next Pr: ", this.previousArr[0]);
        // console.log("Next Cur: ", this.currentArr[0]);
        break;
    }
  }
}

const slider = new Slider(btnLeft, btnRight, container, arrayOfCards);

slider.setCurrentArray()

// console.log(slider.setCurrentArray());
slider.status = "next";
slider.setNextArray()

