// const createCard = (name, img, type) => {
//   const fragment = document.createDocumentFragment();
//   const card = document.createElement("div");
//   card.classList.add("pet-card");

//   const cardImg = document.createElement("img");
//   cardImg.setAttribute("src", img);
//   cardImg.setAttribute("alt", type);

//   const imgContainer = document.createElement("div");
//   imgContainer.classList.add("pet-card__img");
//   imgContainer.append(cardImg);

//   const cardTitle = document.createElement("div");
//   cardTitle.classList.add("pet-card__title")
//   cardTitle.append(name);

//   const button = document.createElement("button");
//   button.classList.add("pet-card__btn", "btn");
//   button.append("Learn more");


//   card.append(imgContainer, cardTitle, button);
//   fragment.appendChild(card);

//   return fragment;
// }

async function pets() {
  const requestURL = "http://127.0.0.1:5500/shelter/scripts/json/pets.json"; // NEED TO Remove when befor deploing
  const request = new Request(requestURL);

  const response = await fetch(request);
  const pets = await response.json();

  createCard(pets[0].name, pets[0].img, pets[0].type);
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


  console.log(card);
  // return card;
}

// export {createCard};