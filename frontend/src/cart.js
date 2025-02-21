let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCounter() {
    document.getElementById("cartAmount").textContent = cart.length;
}

function addToCart(event) {
    let button = event.target;
    let id = button.getAttribute("data-id");
    let name = button.getAttribute("data-name");
    let price = button.getAttribute("data-price");

    let item = cart.find((product) => product.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
});

// Update cart counter on page load
updateCartCounter();
