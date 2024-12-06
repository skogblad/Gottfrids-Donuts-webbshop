const productsListDiv = document.querySelector ("#products-list");
const cart = document.querySelector("#cart-summary");
const cardInvocieRadios = Array.from(document.querySelectorAll(`input[name="payment-option"]`));
const creditCardNumber = document.querySelector("#credit-card-number");
const creditCardYear = document.querySelector("#credit-card-year");
const creditCardMonth = document.querySelector("#credit-card-month");
const creditCardCvc = document.querySelector("#credit-card-cvc");
const personalId = document.querySelector("#personal-id");
const invoiceOption = document.querySelector("#invoice");
const cardOption = document.querySelector("#card");
const orderBtn = document.querySelector("#order-btn");

//RegEx
const hasTwoLettersRegEx = new RegExp(/[a-zA-ZåäöÅÄÖ]{2,}/);
const postalCodeRegEx = new RegExp(/^\d{3}\s?\d{2}$/);
const emailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const phoneRegEx = new RegExp(/^(\+46|0)[\s\d-]{6,13}$/);
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
const creditCardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); //MasterCard


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
    name: "Chokladmunk",
    id: 4,
    price: 20,
    rating: 3,
    category: "Fylld",
    amount: 0,
    img: {
      url: "assets/photos/Chokladmunk.jpeg",
      width: 500,
      height: 474,
      alt: "Munk med ett topp-överdrag av chokladfrosting och kokosflingor."
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

//Visa produkter i varukorg
function updateAndPrintCart () {
  const purchasedProducts = products.filter((product) => product.amount > 0);
  const today = new Date();
  const isMonday = today.getDay() === 1;
  const currentHour = today.getHours();
  const finalAmount = document.querySelector("#final-amount");

  let totalOrderSum = 0;
  let totalAmountOfProducts = 0;
  let msg = "";
  let priceIncrease = weekendPriceIncrease();

  cart.innerHTML = "";

  //Varukorgen
  purchasedProducts.forEach(product => {
    totalAmountOfProducts += product.amount;
   
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
  let shippingFee = 25 + (totalOrderSum * 0.1);

  if (totalAmountOfProducts >= 15) {
    shippingFee = 0;
  }
  
  //Skriv ut 10% rabatt måndagar innan kl 10 på hela beställning (ej frakt) 
  if (isMonday && currentHour < 10 && purchasedProducts.length > 0) {
    totalOrderSum *= 0.9;
    msg += "<p>Måndagsrabatt: 10 % på hela beställningen</p>";
  }

  const finalOrderSum = (totalOrderSum + shippingFee).toFixed(2);

  cart.innerHTML += `<p>Summa: ${totalOrderSum.toFixed(2)} kr</p>`;
  cart.innerHTML += `<p>Frakt: ${shippingFee.toFixed(2)} kr</p>`;
  cart.innerHTML += `<strong class="final-order-sum" id="final-order-sum">Totalt ${(finalOrderSum)} kr</strong>`;
  cart.innerHTML += `<div>${msg}</div>`;
  cart.innerHTML += `<button class="add-order"><a href="#place-order">Lägg beställning</a></button>`;
  
  if (purchasedProducts.length <= 0) {
    cart.innerHTML = `<p>Din varukorg är tom.</p>`;
  }

  //Ta bort faktura som betalsätt totalsumme på 800kr eller mer
  if (finalOrderSum >= 800) {
    document.getElementById("invoice-payment-option").disabled=true;
    personalId.disabled=true;
  } else {
    document.getElementById("invoice-payment-option").disabled=false;
    personalId.disabled=false;
  }

  //Totalbelopp i beställningsformuläret
  if (purchasedProducts.length >= 1) {
    finalAmount.innerHTML = `<strong>Totalbelopp: ${(finalOrderSum)} kr</strong>`;
  } else {
    finalAmount.innerHTML = `<strong>Totalbelopp: 0 kr</strong>`;
  }
  
  //Få fram bekräftelseruta vid tryck på "Beställ"-knapp
  const orderConfirmation = document.querySelector("#order-confirmation");
  orderBtn.addEventListener("click",showOrderConfirmation);
  function showOrderConfirmation() {
    orderConfirmation.innerHTML = `
      <article>
      <h3>Tack för din beställning!</h3>
      Vi kommer leverera din beställning inom 5 arbetsdagar. Totalsumma för beställning: ${(finalOrderSum)} kr.
      </article>
    `;
    resetCart();
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

//Funktion för öka-knappen ska fungera:
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
  
  //Ger en grön färgskiftning på totaltsumman i varukorgen vid ökat antal
  document.querySelector("#final-order-sum").style.color = "green";
  setTimeout(() => {
    document.querySelector("#final-order-sum").style.color = "";
  }, 400);
}

//Funktion för minska-knappen ska fungera:
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

  //Ger en röd färgskiftning på totaltsumman i varukorgen vid minskat antal
  document.querySelector("#final-order-sum").style.color = "red";
  setTimeout(() => {
    document.querySelector("#final-order-sum").style.color = "";
  }, 400);
}

//----------------------------- Sortering av munkar -----------------------------
//-------------------------------------------------------------------------------

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

//----------------------------- Beställningsformulär ----------------------------- 
//--------------------------------------------------------------------------------

//Ändrar mellan de olika betalsätten
cardInvocieRadios.forEach(radioBtn => {
  radioBtn.addEventListener("change", switchPaymentMethod);
});

let selectedPaymentOption = "card";

function switchPaymentMethod (e) {
  invoiceOption.classList.toggle("hidden");
  cardOption.classList.toggle("hidden");

  selectedPaymentOption = e.target.value;
}

//Validering av beställningsformulär & aktivera "Beställ"-knapp
//Förnamn
const firstNameInput = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
firstNameInput.addEventListener("change", () => {
  if (hasTwoLettersRegEx.test(firstNameInput.value)) {
    firstNameError.innerHTML = "";
  } else {
    return firstNameError.innerHTML = "Fyll i förnamn";
  }
});
function isFirstNameValid () {
  return hasTwoLettersRegEx.exec(firstNameInput.value);
}

//Efternamn
const lastNameInput = document.getElementById("last-name");
const lastNameError = document.getElementById("last-name-error");
lastNameInput.addEventListener("change", () => {
  if (hasTwoLettersRegEx.test(lastNameInput.value)) {
    lastNameError.innerHTML = "";
  } else {
    lastNameError.innerHTML = "Fyll i efternamn";
  }
});
function isLastNameValid () {
  return hasTwoLettersRegEx.exec(lastNameInput.value);
}

//Adress
const addressInput = document.getElementById("address");
const addressError = document.getElementById("address-error");
addressInput.addEventListener("change", () => {
  if (hasTwoLettersRegEx.test(addressInput.value)) {
    addressError.innerHTML = "";
  } else {
    addressError.innerHTML = "Ogiltig adress";
  }
});
function isAddressValid () {
  return hasTwoLettersRegEx.exec(addressInput.value);
}

//Postnummer
const postalCodeInput = document.getElementById("postal-code");
const postalCodeError = document.getElementById("postal-code-error");
postalCodeInput.addEventListener("change", () => {
  if (postalCodeRegEx.test(postalCodeInput.value)) {
    postalCodeError.innerHTML = "";
  } else {
    postalCodeError.innerHTML = "Ogiltigt postnummer";
  }
});
function isPostalCodeValid () {
  return postalCodeRegEx.exec(postalCodeInput.value);
}

//Postort
const cityInput = document.getElementById("city");
const cityError = document.getElementById("city-error");
cityInput.addEventListener("change", () => {
  if (hasTwoLettersRegEx.test(cityInput.value)) {
    cityError.innerHTML = "";
  } else {
    cityError.innerHTML = "Ogiltig postort";
  }
});
function isCityValid () {
  return hasTwoLettersRegEx.exec(cityInput.value);
}

//Email
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
emailInput.addEventListener("change", () => {
  if (emailRegEx.exec(emailInput.value)) {
    emailError.innerHTML = "";
  } else {
    emailError.innerHTML = "Ogiltig email";
  }
});
function isEmailValid () {
  return emailRegEx.exec(emailInput.value);
}

//Telefon
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
phoneInput.addEventListener("change", () => {
  if (phoneRegEx.exec(phoneInput.value)) {
    phoneError.innerHTML = "";
  } else {
    phoneError.innerHTML = "Ogiltigt telefonnummer";
  }
});
function isPhoneValid () {
  return phoneRegEx.exec(phoneInput.value);
}

//Personnummer
const personalIdError = document.getElementById("personal-id-error");
personalId.addEventListener("change", () => {
  if (personalIdRegEx.exec(personalId.value)) {
    personalIdError.innerHTML = "";
  } else {
    personalIdError.innerHTML = "Ogiltigt personnummer";
  }
});
function isPersonalIdNumberValid () {
  return personalIdRegEx.exec(personalId.value);
}

function activateOrderButton () {
  orderBtn.setAttribute("disabled", "");

  let year = Number(creditCardYear.value);
  let month = Number(creditCardMonth.value);
  const today = new Date();
  const shortYear = Number(String(today.getFullYear()).substring(2));

  if (!isFirstNameValid() || !isLastNameValid() || !isAddressValid() || !isPostalCodeValid() ||!isCityValid() || !isEmailValid() || !isPhoneValid()) {
    return;
  }

  if (selectedPaymentOption === "card") {
    //Kolla kortnummer
    if (creditCardNumberRegEx.exec(creditCardNumber.value) === null) {
      console.warn("Fel kortnummer.");
      return;
    }

    //Kolla kort år
    if (year > shortYear + 4 || year < shortYear) { //Kortet gäller detta år och 4 år framåt
      console.warn("Kort gäller ej längre.");
      return;
    }

    //Kolla kort månad
    if (month < 1 || month > 12 || creditCardMonth.value.length !== 2) {
      console.warn("Månad finns ej");
      return;
    }

    //Kolla kort CVC
    if (creditCardCvc.value.length !== 3) {
      console.warn("Cvc är fel");
      return;
    }
  }

  if (selectedPaymentOption === "invoice" && !isPersonalIdNumberValid()) {
    return;
  }

  orderBtn.removeAttribute("disabled");
}

personalId.addEventListener("focusout", activateOrderButton);
creditCardNumber.addEventListener("focusout", activateOrderButton);
creditCardYear.addEventListener("focusout", activateOrderButton);
creditCardMonth.addEventListener("focusout", activateOrderButton);
creditCardCvc.addEventListener("focusout", activateOrderButton);

personalId.addEventListener("change", activateOrderButton);
creditCardNumber.addEventListener("change", activateOrderButton);
creditCardYear.addEventListener("change", activateOrderButton);
creditCardMonth.addEventListener("change", activateOrderButton);
creditCardCvc.addEventListener("change", activateOrderButton);


//Rensa varukorg och beställnigsformulär med "Rensa beställning"-knapp
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetCart);
function resetCart () {
  products.filter((product) => product.amount = 0);
  
  updateAndPrintCart();

  printProductsList();
}

//Rensa beställningsformulär och meddela kund efter 15min av långsamhet
const orderForm = document.querySelector("#place-order");
let slownessTimeout = setTimeout(customerSlowMessage, 1000 * 60 * 15);
function customerSlowMessage() {
  alert("Din session har gått ut, fyll i dina uppgifter igen.");
  orderForm.reset();
}