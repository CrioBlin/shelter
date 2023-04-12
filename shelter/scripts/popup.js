export class Card {
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
  }

  generateCard(name) {
    const card = document.createElement("div");
          card.className = "popup__container";

    // card.insertAdjacentHTML("afterbegin", `
    // <div class="popup-wrapper">
    //   <div class="popup">
    //     <div class="popup__exit">
    //       <button class="popup__exit-btn button_circle">
    //         <img src="../../assets/icons/icon-exit.svg"> 
    //       </button>
    //     </div>
    //     <div class="popup__container">
    //       <div class="popup__img">
    //         <img class="popup__animal-img" src="${img}" alt="${type}">
    //       </div>
    //       <div class="popup__content">
    //         <h3 class="popup__animal-name h3-title" data-name>${name}</h3>
    //         <h4 class="popup__animal-type h4-title" date-type>text<span data-breed></span></h4>
    //         <p class="popup__animal-text" data-description>Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.</p>
    //         <ul class="popup__animal-list">
    //           <li class="popup__animal-item" data-age>
    //             <span class="popup__animal-item_bold">Age:</span>
    //             TExt
    //           </li>
    //           <li class="popup__animal-item" data-inoculations>
    //             <span class="popup__animal-item_bold">Inoculations:</span>
    //             TExt
    //           </li>
    //           <li class="popup__animal-item" data-diseases>
    //             <span class="popup__animal-item_bold">Diseases:</span>
    //             TExt
    //           </li>
    //           <li class="popup__animal-item" data-parasites>
    //             <span class="popup__animal-item_bold">Parasites:</span>
    //             TExt
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // `)

    const cardImg = document.createElement("div");
          cardImg.className = "popup__img";
          cardImg.innerHTML = `<img class="popup__animal-img" src="${this.img}" alt="${this.type}">`
    
    const cardContent = document.createElement("div");
          cardContent.className = "popup__content";

    const cardPetName = document.createElement("h3");
          cardPetName.classList.add("popup__animal-name");  
          cardPetName.classList.add("h3-title");
          cardPetName.innerText = `${this.name}`;
    
    const cardPetType = document.createElement("h4");
          cardPetType.classList.add("popup__animal-type");    
          cardPetType.classList.add("h4-title");
          cardPetType.innerText = `${this.type}`;

    const cardPetDescription = document.createElement("p");
          cardPetDescription.className = "popup__animal-text";
          cardPetDescription.innerText = `${this.description}`;
    
    const cardPetInofList = document.createElement("ul");
    
    // card.append();
  }

  const createCard = (name, img, type) => {
    const card = document.createElement("div");
    card.classList.add("pet-card");
  
    card.insertAdjacentHTML("afterbegin", `
        <div class="pet-card__img">
          <img src="${img}" alt="${type}">
        </div>
        <div class="pet-card__title">${name}</div>
        <button class="pet-card__btn btn">Learn more</button>
    `);
  
    return card;
  }
}