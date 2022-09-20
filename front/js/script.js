//------------------------------------------------------------------------
// Récupération des produits de l'api
//------------------------------------------------------------------------
const dataApi = fetch("http://localhost:3000/api/products")
  // pour la réponse retournée donne le résultat en json
  .then(reponse => reponse.json())
  .then(listProducts => {
    for (let k = 0; k < listProducts.length; k ++) {
      let product = listProducts[k];

      let a = document.createElement("a");
      a.href = "./product.html?id=" + product._id;

      let article = document.createElement("article");

      let image = document.createElement("img");
      image.src = product.imageUrl;
      image.alt = product.altTxt;

      let titre = document.createElement("h3");
      titre.className = "productName";
      titre.textContent = product.name;

      let description = document.createElement("p");
      description.className = "productDescription";
      description.textContent = product.description;

      article.appendChild(image);
      article.appendChild(titre);
      article.appendChild(description);
      a.appendChild(article);
      document.getElementById('items').appendChild(a);
    }

  })
  .catch(function(error) {
    alert(error)
  });