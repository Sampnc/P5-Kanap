let panier = JSON.parse(localStorage.getItem("panier"));


let id = 4;
let color = "White";
let quantite = 5;

let article = document.createElement("article");
article.class = "cart__item";
article.setAttribute("data-id", id);
article.setAttribute("data-color", color);

let div1 = document.createElement("div");
div1.class = "cart__item__img";

let image = document.createElement("img");
image.src = "";
image.alt = "";

div1.appendChild(image);


let div2 = document.createElement("div");
div2.class = "cart__item__content";


let div2_1 = document.createElement("div");
div2_1.class = "cart__item__content__description";

let titre = document.createElement("h2");
titre.textContent = "";
let couleur = document.createElement("p");
couleur.textContent = color;
let prix = document.createElement("p");
prix.textContent = "";

div2_1.appendChild(titre);
div2_1.appendChild(couleur);
div2_1.appendChild(prix);


let div2_2 = document.createElement("div");
div2_2.class = "cart__item__content__settings__quantity";


let div2_2_1 = document.createElement("div");
let q = document.createElement("p");
q.textContent = "Qté : ";

let input = document.createElement("input");
input.type = "number";
input.class = "itemQuantity";
input.name = "itemQuantity";
input.min = "1";
input.max = "100";
input.setAttribute("value", quantite);

let div2_2_2 = document.createElement("div");
div2_2_2.class = "cart__item__content__senttings__delete";
let supprimerItem = document.createElement("p");
supprimerItem.class = "deleteItem";
supprimerItem.textContent = "Supprimer";

div2_2_2.appendChild(supprimerItem);

div2_2_1.appendChild(q);
div2_2_1.appendChild(input);

div2_2.appendChild(div2_2_1);
div2_2.appendChild(div2_2_2);


div2.appendChild(div2_1);
div2.appendChild(div2_2);

article.appendChild(div1);
article.appendChild(div2);
console.log(article);