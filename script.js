//HTML kod för alla produkter
const products = [
  {
    name: "Chokladdröm",
    id: 0,
    price: 20,
    rating: 4,
    category: "Choklad",
    amount: 0,
    img: {
      url: "assets/photos/Chokladdrom.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett topp-överdrag av mjölkchoklad och småbitar av nötter."
    },        
  },
  {
    name: "Jordgubb",
    id: 1,
    price: 20,
    rating: 3.5,
    category: "Vegansk",
    amount: 0,
    img: {
      url: "assets/photos/Jordgubb.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett topp-överdrag av rosa jordgubbsfrosting och strössel."
    },        
  },
  {
    name: "Sockersöt",
    id: 2,
    price: 17,
    rating: 5,
    category: "Bästsäljare",
    amount: 0,
    img: {
      url: "assets/photos/Sockersot.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett överdrag socker."
    },        
  },
  {
    name: "Citrondröm",
    id: 3,
    price: 20,
    rating: 5,
    category: "Bästsäljare",
    amount: 0,
    img: {
      url: "assets/photos/Citrondrom.jpeg",
      width: 500,
      height: 497,
      alt: "Munk med ett topp-överdrag av vit frosting och citron-crunch."
    },        
  },
  {
    name: "Chokladkokos",
    id: 4,
    price: 20,
    rating: 3,
    category: "Choklad",
    amount: 0,
    img: {
      url: "assets/photos/Chokladkokos.jpeg",
      width: 500,
      height: 508,
      alt: "Munk med ett överdrag av chokladfrosting och kokosflingor."
    },        
  },
  {
    name: "Saltkaramell",
    id: 5,
    price: 20,
    rating: 5,
    category: "Bästsäljare",
    amount: 0,
    img: {
      url: "assets/photos/Saltkaramell.jpeg",
      width: 500,
      height: 485,
      alt: "Munk med ett överdrag av vit frosting och linjer av karamell."
    },        
  },
  {
    name: "Mango",
    id: 6,
    price: 20,
    rating: 2.5,
    category: "Vegansk",
    amount: 0,
    img: {
      url: "assets/photos/Mango.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett topp-överdrag av gul frosting och pärlströssel i gult, orange och rosa."
    },        
  },
  {
    name: "Chokladkrisp",
    id: 7,
    price: 20,
    rating: 3,
    category: "Choklad",
    amount: 0,
    img: {
      url: "assets/photos/Chokladkrisp.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett överdrag av choklad och chokladgodisar."
    },        
  },
  {
    name: "Vitchoklad",
    id: 8,
    price: 20,
    rating: 4,
    category: "Choklad",
    amount: 0,
    img: {
      url: "assets/photos/Vitchoklad.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett överdrag av vitchoklad och mönster av mjölkchoklad."
    },        
  },
  {
    name: "Saffran",
    id: 9,
    price: 30,
    rating: 4.5,
    category: "Vegansk",
    amount: 0,
    img: {
      url: "assets/photos/Saffran.jpeg",
      width: 500,
      height: 500,
      alt: "Munk med ett överdrag av socker."
    },        
  },
  {
    name: "Hallonmunk",
    id: 10,
    price: 25,
    rating: 3,
    category: "Fylld",
    amount: 0,
    img: {
      url: "assets/photos/Hallonmunk.jpeg",
      width: 500,
      height: 474,
      alt: "En halv munk med halloninnehåll bredvid en hel, fyllig munk."
    },        
  },
  {
    name: "Äppelmunk",
    id: 11,
    price: 25,
    rating: 4,
    category: "Fylld",
    amount: 0,
    img: {
      url: "assets/photos/Appelmunk.jpeg",
      width: 500,
      height: 500,
      alt: "Fylld munk med ett överdrag av socker."
    },        
  },
];

const productsListDiv = document.querySelector ("#products-list");
const cart = document.querySelector("#cart-summary");

//Visa produkter i varukorg
function updateAndPrintCart () {
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const today = new Date();
  const isMonday = today.getDay() === 1;
  const currentHour = today.getHours();

  let totalOrderSum = 0;
  let msg = "";
  let priceIncrease = weekendPriceIncrease();

  cart.innerHTML = "";

  //Varukorgen
  purchasedProducts.forEach(product => {
    if (product.amount > 0) {
      let productPrice = product.price;
      if (product.amount >= 10) {
        productPrice *= 0.9;
        msg += `<p>${product.name}: 10 % rabatt storpack</p>`
      }
    
      totalOrderSum += product.amount * (productPrice * priceIncrease).toFixed(2);

      cart.innerHTML += `
      <article>
        ${product.name}: ${product.amount} st - ${(product.amount * (productPrice * priceIncrease)).toFixed(2)} kr
      </article>
      `;
    }
  });
  
  //Beräkna fraktkostnaden
  const totalAmountOfProducts = purchasedProducts.reduce((sum, product) => sum + product.amount, 0);
  
  let shippingFee = 25 + (totalOrderSum * 0.1);

  if (totalAmountOfProducts >= 15) {
    shippingFee = 0;
  }
  
  //Skriv ut 10% rabatt måndagar innan kl 10 på hela beställning (ej frakt) 
  if (isMonday && currentHour < 10 && purchasedProducts.length > 0) {
    totalOrderSum *= 0.9;
    msg += "<p>Måndagsrabatt: 10 % på hela beställningen</p>";
  }

  cart.innerHTML += `<p>Frakt: ${shippingFee.toFixed(2)} kr</p>`;
  cart.innerHTML += `<strong>Summa: ${(totalOrderSum + shippingFee).toFixed(2)} kr</strong>`;
  cart.innerHTML += `<div>${msg}</div>`;
  cart.innerHTML += `<button class="add-order"><a href="#place-order">Lägg beställning</a></button>`;
  
  if (purchasedProducts.length <= 0) {
    cart.innerHTML = `<p>Din varukorg är tom.</p>`;
  }

}

//Lägg till helgpåslag 15% på ord. priset på alla produkter
function weekendPriceIncrease() {
  const weekend = new Date();

  if ((weekend.getDay() === 5 && weekend.getHours() >= 15) || (weekend.getDay() === 1 && weekend.getHours() < 3)) {
    return 1.15;
  }
  return 1;
}

//Få produkterna synliga i webbläsaren
function printProductsList() {
   
  productsListDiv.innerHTML = "";

  let priceIncrease = weekendPriceIncrease();

  products.forEach(product => {
    productsListDiv.innerHTML += `
      <article class="product">
        <img src="${product.img.url}" alt="${product.img.alt}" width=${product.img.width} height=${product.img.height}>
        <p>${getRatingHtml(product.rating)}</p>
        <h3>${product.name}</h3>
        <p>${(product.price * priceIncrease).toFixed(2)} kr/st</p>
        <p class="category">${product.category} </p>
        <div>
          <button class="decrease" id="decrease-${product.id}">-</button>
          <input type="number" min="0" value="${product.amount}">
          <button class="increase" id="increase-${product.id}">+</button>
        </div>
      </article>
    `;
  });

  //Få fungerande + & - knappar på munkarna:
  const increaseButtons = document.querySelectorAll("button.increase"); //för att komma åt alla knappar
  increaseButtons.forEach(button => {
    button.addEventListener("click", increaseProductCount); //en action för när vi klickar på knappen
  });

  const decreaseButtons = document.querySelectorAll("button.decrease");
  decreaseButtons.forEach(button => {
    button.addEventListener("click", decreaseProductCount);
  })

}

//Funktion för att få ut symbol i rating:
function getRatingHtml(rating) {

  const isHalf = rating % 1 !== 0; //Kollar om en decimal finns

  let html = "";

  for (let i = 0; i < Math.floor(rating); i++) {
    html += "<span>★</span>";
  }
  if (isHalf) {
    html += "<span>☆</span>";
  }
  return html;
}

printProductsList(); //Anropar funktionen ovanför så allt blir synligt

//Funktion för increase button:
function increaseProductCount(e) { //hitta rätt knapp som klickats på med hjälp av ID
  const productId = Number(e.target.id.replace("increase-", "")); //omgjord till Number istället för sträng för att matcha ID nummer

  const clickedIncreaseBtnId = e.target.id;

  //Leta rätt på produkten i arrayen som har det id:t
  const foundProductIndex = products.findIndex(product => product.id === productId);

  //Om produkten inte finns, skriv ut felmeddelande i consolen & avbryt att resten av koden körs (return)
  if (foundProductIndex === -1) {
    console.error("Det finns ingen sån produkt i listan!")
    return;
  }

  //Hittar produkten i listan och ökar värdet med 1. [foundProductIndex] säger vilken plats den har
  products[foundProductIndex].amount += 1;

  //Skriv ut produktlistan på nytt
  printProductsList();

  document.querySelector(`#${clickedIncreaseBtnId}`).focus();

  updateAndPrintCart();
}

//Funktion för decrease button:
function decreaseProductCount(e) {
  const decreaseProductId = Number(e.target.id.replace("decrease-", ""));

  const clickedDecreaseBtnId = e.target.id;

  const displayProductIndex = products.findIndex(product => product.id === decreaseProductId);

  if (displayProductIndex === -1) {
    console.error("Det finns ingen sådan produkt i listan tyvärr.")
    return;
  }

  products[displayProductIndex].amount -= 1; {
    if (products[displayProductIndex].amount < 0) { //så mindre tal än 0 ej går
      products[displayProductIndex].amount = 0;
    }
  }

  printProductsList();

  document.querySelector(`#${clickedDecreaseBtnId}`).focus();

  updateAndPrintCart();
}

//Sortering av munkar

//Alfabetisk:
const alphaButton = document.querySelector ("#sort-alpha");

alphaButton.addEventListener("click", sortByAlpha);

function sortByAlpha () {
  products.sort((product1, product2) => product1.name.localeCompare(product2.name));
  printProductsList();
}

//Pris
const priceButton = document.querySelector ("#sort-price");

priceButton.addEventListener("click", sortByPrice);

function sortByPrice () {
  products.sort((product1, product2) => product1.price - product2.price);
  printProductsList();
}

//Kategori
const categoryButton = document.querySelector ("#sort-category");

categoryButton.addEventListener("click", sortByCategory);

function sortByCategory () {
  products.sort((product1, product2) => product1.category.localeCompare(product2.category));
  printProductsList();
}

//Recension
const ratingButton = document.querySelector ("#sort-rating");

ratingButton.addEventListener("click", sortByRating);

function sortByRating () {
  products.sort((product1, product2) => product2.rating - product1.rating);
  printProductsList();
}