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
  leftContainer = null;
  rightContainer = null;
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
          
    if (this.currentSide == "right") {
      // this.tempContainer.classList.add("friends__pets_slide-left")
      // this.sliderContainer.append(this.tempContainer);
      // currentContainer.classList.add("friends__pets_slide-left");
      this.moveSlides();
      currentContainer.addEventListener("transitionend",() => {
        this.updateSideContainers();
          console.log("2");
      })
      // nextConteiner.classList.toggle("friends__pets_slide-hidden");
      // nextConteiner.style.left = 0;
    } else {
      // this.tempContainer.classList.toggle("friends__pets_slide-hidden");
      // sliderContainer.prepend(this.tempContainer);
      this.moveSlides();
      currentContainer.addEventListener("transitionend",() => {
        this.updateSideContainers();
        console.log("1");
    })


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
    // })
  }

  // setLeftSideCards() {
  //   this.leftContainer = ;
  //   this.rightContainer = ;
  // }

  createTempContainer() {
    // this.tempContainer = document.createElement("div");
    // this.tempContainer.classList.add("friends__pets");
    // this.tempContainer.append(...this.arrStatus.currentArr);
    const tempContainer = document.createElement("div");
    tempContainer.classList.add("friends__pets");

    let temp = this.arrStatus.currentArr
    console.log(temp)
    tempContainer.append(...temp);

    return tempContainer;
  }

  setSideContainers() {
    // console.log(this.createTempContainer())
    const left = this.createTempContainer(),
          right = this.createTempContainer();

    left.classList.add("friends__pets-left-side");
    right.classList.add("friends__pets-right-side");
    // left.classList.add("friends__pets-left-side", "friends__pets_hidden");
    // right.classList.add("friends__pets-right-side", "friends__pets_hidden");

    this.sliderContainer.prepend(left);
    this.sliderContainer.append(right);
  }

  updateSideContainers() {
    const left = document.querySelector(".friends__pets-left-side"),
          active = document.querySelector(".friends__pets_active"),
          right = document.querySelector(".friends__pets-right-side");
    
    left.classList.toggle("friends__pets-left-side");
    right.classList.toggle("friends__pets-right-side");

    // active.classList.toggle("friends__pets_active");

    if (this.currentSide == "left") {
      left.classList.toggle("friends__pets_active");
      // this.sliderContainer.removeChild(right);
    } else {
      right.classList.toggle("friends__pets_active");
      // right.classList.toggle(`friends__pets_slide-${this.currentSide}`);
      this.sliderContainer.removeChild(left);
    }

    this.sliderContainer.removeChild(active);
    // console.log(document.querySelector(".friends__pets_active"))
    // document.querySelector(".friends__pets_active").classList.toggle(`friends__pets_slide-${this.currentSide}`);
    this.setSideContainers();
    // this.sliderContainer.removeChild(active);
    // this.setSideContainers();
  }

  moveSlides() {
    const slides = document.querySelectorAll(".friends__pets");
    slides.forEach((item) => {
      item.classList.add(`friends__pets_slide-${this.currentSide}`);
    })
  }

  fillTempContainer() {
    // this.tempContainer.replaceChildren(...this.arrStatus.currentArr); 
    // console.log(this.tempContainer)
    // if (this.currentSide == "left") {
    //   this.tempContainer.classList.toggle("friends__pets_slide-right");
    // } 
  }


  sliderInitializtion() {
    this.setCurrentArray();
    // this.setCards();
    this.setSideContainers();
    // this.createTempContainer();
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

