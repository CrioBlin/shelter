import { getPetsInfo } from "./card.js";

const pets = await getPetsInfo();

class Card {
  constructor(name, img, type, breed, description, age, inoculations, diseases, parasites) {
    this.name = name;
    this.img = img;
    this.type = type;
    this.breed = breed;
    this.description = description;
    this.age = age;
    this.inoculations = inoculations;
    this.diseases = diseases;
    this.parasites = parasites;
    this.info = {
            "Age": age, 
            "Inoculations": inoculations, 
            "Diseases": diseases, 
            "Parasites": parasites
      };
  }

  generateCard() {
    const popupWrapper = document.createElement("div");
          popupWrapper.className = "popup-wrapper";
          
    const popup = document.createElement("div");
          popup.className = "popup";

    const exitBtn = document.createElement("button");
          exitBtn.classList.add("popup__exit-btn", "circle-btn");
          exitBtn.innerHTML = `<img src="../../assets/icons/icon-exit.svg">`;

    const card = document.createElement("div");
          card.className = "popup__container";

    const cardImg = document.createElement("div");
          cardImg.className = "popup__img";
          cardImg.innerHTML = `<img class="popup__animal-img" src="${this.img}" alt="${this.type}">`
          
    const cardContent = document.createElement("div");
          cardContent.className = "popup__content";

    const cardPetName = document.createElement("h3");
          cardPetName.classList.add("popup__animal-name", "h3-title");
          cardPetName.innerText = `${this.name}`;
    
    const cardPetType = document.createElement("h4");
          cardPetType.classList.add("popup__animal-type", "h4-title"); 
          cardPetType.innerText = `${this.type}`;

    const cardPetDescription = document.createElement("p");
          cardPetDescription.classList.add("popup__animal-text", "h5-title");
          cardPetDescription.innerText = `${this.description}`;
    
    const cardPetInfoList = document.createElement("ul");
          cardPetInfoList.classList.add("popup__animal-list")

    for (let [key, value] of Object.entries(this.info)) {
      const list = document.createElement("li");
      list.classList.add("popup__animal-item");

      list.innerHTML = `<span class="popup__animal-item_bold">${key}: </span>${value}`

      cardPetInfoList.append(list); 
    }

    cardContent.append(...[cardPetName, cardPetType, cardPetDescription, cardPetInfoList]);
    card.append(...[cardImg, cardContent]);
    popup.append(...[exitBtn, card]);
    popupWrapper.append(...[popup]);

    return popupWrapper;
  }
}
/////////////////////////////////////
const container = document.querySelector(".friends__container");

export async function createPopup(animal) {
    pets.forEach(element => {
      if (element.name == animal) {
        const card = new Card(element.name, element.img, element.type, element.breed, element.description, element.age, element.inoculations, element.diseases, element.parasites);
        const popCard = card.generateCard();

        centerCard(popCard);
        document.querySelector(".friends__container").append(popCard);
      }
    });  
}

let currentCards = document.querySelectorAll(".pet-card");

// !!!need eventUpdater

currentCards.forEach((item) => {
   item.addEventListener("click", () => {
      let name = item.querySelector(".pet-card__title").innerText;
      createPopup(name);
   })
})

const centerCard = (item) => {
      let centerOfView = window.pageYOffset;
      item.style.top = `${centerOfView}px`;
}