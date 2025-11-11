// ---------------------- CART LOGIC ----------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.image,
      qty: 1
    };

    const existing = cart.find(p => p.id === product.id);
    if (existing) existing.qty += 1;
    else cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  });
});
