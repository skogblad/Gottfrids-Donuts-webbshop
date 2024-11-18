const products = [
   {
      name: "Chokladdröm",
      price: 20,
      rating: 4,
      category: "Choklad",
      img: {
         url: "assets/photos/Chokladdrom.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett topp-överdrag av mjölkchoklad och småbitar av nötter."
      },        
   },
   {
      name: "Jordgubb",
      price: 20,
      rating: 5,
      category: "Bästsäljare",
      img: {
         url: "assets/photos/Jordgubb.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett topp-överdrag av rosa jordgubbsfrosting och strössel."
      },        
   },
   {
      name: "Sockersöt",
      price: 17,
      rating: 5,
      category: "Bästsäljare",
      img: {
         url: "assets/photos/Sockersot.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett överdrag socker."
      },        
   },
   {
      name: "Citrondröm",
      price: 20,
      rating: 5,
      category: "Bästsäljare",
      img: {
         url: "assets/photos/Citrondrom.jpeg",
         width: 500,
         height: 497,
         alt: "Munk med ett topp-överdrag av vit frosting och citron-crunch."
      },        
   },
   {
      name: "Chokladkokos",
      price: 20,
      rating: 3,
      category: "Choklad",
      img: {
         url: "assets/photos/Chokladkokos.jpeg",
         width: 500,
         height: 508,
         alt: "Munk med ett överdrag av chokladfrosting och kokosflingor."
      },        
   },
   {
      name: "Saltkaramell",
      price: 20,
      rating: 5,
      category: "Bästsäljare",
      img: {
         url: "assets/photos/Saltkaramell.jpeg",
         width: 500,
         height: 485,
         alt: "Munk med ett överdrag av vit frosting och linjer av karamell."
      },        
   },
   {
      name: "Mango",
      price: 20,
      rating: 2,
      category: "Fruktig",
      img: {
         url: "assets/photos/Mango.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett topp-överdrag av gul frosting och pärlströssel i gult, orange och rosa."
      },        
   },
   {
      name: "Chokladkrisp",
      price: 20,
      rating: 3,
      category: "Choklad",
      img: {
         url: "assets/photos/Chokladkrisp.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett överdrag av choklad och chokladgodisar."
      },        
   },
   {
      name: "Vitchoklad",
      price: 20,
      rating: 4,
      category: "Choklad",
      img: {
         url: "assets/photos/Vitchoklad.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett överdrag av vitchoklad och mönster av mjölkchoklad."
      },        
   },
   {
      name: "Dubbelchoklad",
      price: 20,
      rating: 3,
      category: "Choklad",
      img: {
         url: "assets/photos/Dubbelchoklad.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett överdrag av choklad."
      },        
   },
   {
      name: "Hallonmunk",
      price: 25,
      rating: 3,
      category: "Fylld",
      img: {
         url: "assets/photos/Hallonmunk.jpeg",
         width: 500,
         height: 474,
         alt: "En halv munk med halloninnehåll bredvid en hel, fyllig munk."
      },        
   },
   {
      name: "Äppelmunk",
      price: 25,
      rating: 3,
      category: "Fylld",
      img: {
         url: "assets/photos/Appelmunk.jpeg",
         width: 500,
         height: 500,
         alt: "Fylld munk med ett överdrag av socker."
      },        
   },
];
// -------------------------------------------------- //
// -------------------- HTML kod -------------------- //
// -------------------------------------------------- //

const productsListDiv = document.querySelector ("#products-list");
console.log(productsListDiv);

products.forEach(product => {
   productsListDiv.innerHTML += `
      <article class="product">
         <img src="${product.img.url}" alt="${product.img.alt}" width=${product.img.width} height=${product.img.height}>
         <p>${product.rating}</p>
         <h3>${product.name}</h3>
         <p>${product.price} kr</p>
         <p>${product.category} </p>
      </article>
   `;
});