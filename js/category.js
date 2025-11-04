let categoryCurrentPage = 1;
const categoryLimit = 6;
let categoryTotal = 0;
let currentCategory = "";

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

async function fetchCategoryProducts(page = 1) {
  try {
    const skip = (page - 1) * categoryLimit;
    const category = currentCategory;
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=${categoryLimit}&skip=${skip}`
    );
    const data = await res.json();

    const products = data.products;
    categoryTotal = data.total;
    const totalPages = Math.ceil(categoryTotal / categoryLimit);

    const container = document.getElementById("category-products");
    container.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition cursor-pointer";

      card.innerHTML = `
        <div class="h-56 w-full flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img src="${product.thumbnail}" alt="${product.title}" class="object-cover w-full h-full" />
        </div>
        <div class="pt-4">
          <h3 class="text-lg font-semibold text-gray-900">${product.title}</h3>
          <p class="text-gray-500 text-sm line-clamp-2">${product.description}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xl font-bold text-[#00838F]">$${product.price}</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
      });

      container.appendChild(card);
    });

    document.getElementById(
      "categoryPageInfo"
    ).textContent = `Page ${page} of ${totalPages}`;
    document.getElementById("categoryPrevPage").disabled = page === 1;
    document.getElementById("categoryNextPage").disabled = page === totalPages;
  } catch (error) {
    console.error("Error fetching category products:", error);
    document.getElementById("category-products").innerHTML =
      '<p class="text-red-600">Failed to load products.</p>';
  }
}

document.getElementById("categoryPrevPage").addEventListener("click", () => {
  if (categoryCurrentPage > 1) {
    categoryCurrentPage--;
    fetchCategoryProducts(categoryCurrentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("categoryNextPage").addEventListener("click", () => {
  categoryCurrentPage++;
  fetchCategoryProducts(categoryCurrentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  currentCategory = getCategoryFromUrl();

  currentCategory = decodeURIComponent(currentCategory);
  document.getElementById("category-title").textContent = currentCategory
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .toUpperCase();

  fetchCategoryProducts(1);
});
