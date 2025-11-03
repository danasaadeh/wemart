let currentPage = 1;
const limit = 8; // Number of products per page
let totalProducts = 0;

async function fetchProducts(page = 1) {
  try {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();

    const products = data.products;
    totalProducts = data.total;
    const totalPages = Math.ceil(totalProducts / limit);

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer";

      card.innerHTML = `
        <div class="relative h-56 w-full overflow-hidden rounded-lg bg-gray-100">
          <img src="${product.thumbnail}" alt="${
        product.title
      }" class="object-cover w-full h-full" />
        </div>
        <div class="pt-4">
          <h3 class="text-lg font-semibold text-gray-900">${product.title}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">${
            product.description
          }</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xl font-bold text-[#00838F]">$${
              product.price
            }</span>
            <div class="flex items-center gap-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.637a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.243a1 1 0 00-.364 1.118l1.18 3.637c.3.921-.755 1.688-1.54 1.118l-3.085-2.243a1 1 0 00-1.175 0l-3.085 2.243c-.785.57-1.84-.197-1.54-1.118l1.18-3.637a1 1 0 00-.364-1.118L2.318 9.064c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.18-3.637z"/>
              </svg>
              <span class="text-sm font-medium text-gray-600">${product.rating.toFixed(
                1
              )}</span>
            </div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });

      productList.appendChild(card);
    });

    // Update pagination info
    const pageInfo = document.getElementById("pageInfo");
    pageInfo.textContent = `Page ${page} of ${totalPages}`;

    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = page === totalPages;
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("product-list").innerHTML =
      '<p class="text-red-600">Failed to load products.</p>';
  }
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchProducts(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchProducts(currentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts(1);
});
