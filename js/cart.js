// js/cart.js

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");
  const totalElement = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-cart");
  const summary = document.getElementById("cart-summary");

  container.innerHTML = "";

  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    summary.classList.add("hidden");
    return;
  }

  emptyMessage.style.display = "none";
  summary.classList.remove("hidden");

  let total = 0;

  cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.className =
      "flex flex-col sm:flex-row bg-white rounded-lg shadow p-4 items-center justify-between";

    card.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${item.thumbnail}" alt="${
      item.title
    }" class="w-20 h-20 object-cover rounded" />
        <div>
          <h3 class="font-semibold text-gray-900">${item.title}</h3>
          <p class="text-sm text-gray-500">Price: $${item.price}</p>
          <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 flex items-center space-x-4">
        <p class="text-lg font-semibold text-[#00838F]">$${(
          item.price * item.quantity
        ).toFixed(2)}</p>
        <button data-index="${index}" class="remove-item text-red-600 hover:underline">Remove</button>
      </div>
    `;

    container.appendChild(card);
    total += item.price * item.quantity;
  });

  totalElement.textContent = total.toFixed(2);

  // Remove item
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      updateCartCount();
    });
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = cart.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartCount();
});
