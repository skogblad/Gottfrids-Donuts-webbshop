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
// ------------------------------------------------------------ 
// ------------------------- HTML kod ------------------------- 


const productsListDiv = document.querySelector ("#products-list");

// ------------------------------------------------------------ 
// ----------------- Visa produkter i varukorg ---------------- 
const cart = document.querySelector("#cart-summary");
function updateAndPrintCart () {
   const purchasedProducts = products.filter((product) => product.amount > 0);

   cart.innerHTML = "";
   purchasedProducts.forEach(product => {
      cart.innerHTML += `
      <div>
       ${product.name}: ${product.amount} st - ${product.amount * product.price} kr
      </div>
      `;
   });

}


// ------------------------------------------------------------ 
// ----------- Få produkterna synliga i webbläsaren ----------- 

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

function printProductsList() {
   
   productsListDiv.innerHTML = ""; //rensa div:en på befintliga produkter innan utskrift av uppdaterad info

   products.forEach(product => {
      productsListDiv.innerHTML += `
         <article class="product">
            <img src="${product.img.url}" alt="${product.img.alt}" width=${product.img.width} height=${product.img.height}>
            <p>${getRatingHtml(product.rating)}</p>
            <h3>${product.name}</h3>
            <p>${product.price} kr/st</p>
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

printProductsList(); //Anropar funktionen ovanför så allt blir synligt

//Funktion för increase button:
function increaseProductCount(e) { //hitta rätt knapp som klickats på med hjälp av ID
   const productId = Number(e.target.id.replace("increase-", "")); //omgjord till Number istället för sträng för att matcha ID nummer

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

   updateAndPrintCart();
}

//Funktion för decrease button:
function decreaseProductCount(e) {
   const DecreaseProductId = Number(e.target.id.replace("decrease-", ""));

   const displayProductIndex = products.findIndex(product => product.id === DecreaseProductId);

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
}


// ------------------------------------------------------------ 
// -------------------- Sortering av munkar-------------------- 

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