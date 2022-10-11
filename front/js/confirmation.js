const url = new URL (window.location.href);

// la variable id va récupérer la valeur du paramètre id
const orderId = url.searchParams.get("orderId");

document.getElementById("orderId").textContent = orderId;