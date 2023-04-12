async function getPetsInfo() {
  // const requestURL = "https://rolling-scopes-school.github.io/crioblin-JSFE2023Q1/shelter/scripts/json/pets.json"; // NEED TO change befor deploying
  const requestURL = "http://127.0.0.1:5500/shelter/scripts/json/pets.json" // for localhost
  const request = new Request(requestURL);

  const response = await fetch(request);
  const petsInfo = await response.json();

  return petsInfo;
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

async function generateCards() {
  const pets = await getPetsInfo();
  const cards = [];

  pets.forEach(element => {
    cards.push(createCard(element.name, element.img, element.type));
  });

  return cards;
}

export {generateCards};
