const products = [
   {
      name: "Äppelmunk",
      price: 25,
      rating: 3,
      category: "Fruktig",
      img: {
         url: "assets/photos/Appelmunk.jpeg",
         width: 500,
         height: 500,
         alt: "Sockrig och fylld munk."
      },        
   },
   {
      name: "Hallonmunk",
      price: 25,
      rating: 3,
      category: "Fruktig",
      img: {
         url: "assets/photos/Hallonmunk.jpeg",
         width: 500,
         height: 474,
         alt: "En halv munk med halloninnehåll bredvid en hel, fyllig munk."
      },        
   },
   {
      name: "Chokladdröm",
      price: 20,
      rating: 4,
      category: "Choklad",
      img: {
         url: "assets/photos/Chokladdrom.jpeg",
         width: 500,
         height: 500,
         alt: "Munk med ett överdrag av mjölkchoklad."
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