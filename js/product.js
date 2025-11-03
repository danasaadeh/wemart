const productDetailContent = document.getElementById("product-detail-content");

async function fetchProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    productDetailContent.innerHTML =
      "<p class='text-red-500'>No product found.</p>";
    return;
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await res.json();

    productDetailContent.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img src="${product.thumbnail}" alt="${
      product.title
    }" class="rounded-lg shadow-md w-full h-[400px] object-cover" />
          <div class="flex gap-2 mt-4 overflow-x-auto">
            ${product.images
              .map(
                (img) =>
                  `<img src="${img}" alt="${product.title}" class="w-20 h-20 rounded-lg object-cover border cursor-pointer hover:opacity-75" />`
              )
              .join("")}
          </div>
        </div>

        <div>
          <h2 class="text-3xl font-bold mb-3">${product.title}</h2>
          <p class="text-gray-600 mb-4">${product.description}</p>
          <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-semibold text-[#00838F]">$${
              product.price
            }</span>
            <span class="text-gray-400 text-sm line-through">$${(
              product.price *
              (1 + product.discountPercentage / 100)
            ).toFixed(2)}</span>
            <span class="text-orange-500 text-sm font-semibold">${product.discountPercentage.toFixed(
              1
            )}% OFF</span>
          </div>
          <button class="px-6 py-3 bg-[#00838F] text-white rounded-lg hover:bg-indigo-700">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading product detail:", error);
    productDetailContent.innerHTML =
      "<p class='text-red-600'>Failed to load product details.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchProductDetail);
