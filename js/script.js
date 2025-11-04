let currentPage = 1;
const limit = 3;
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

      productList.appendChild(card);
    });

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
    window.scrollTo({ behavior: "smooth" });
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchProducts(currentPage);
  window.scrollTo({ behavior: "smooth" });
});

// Featured Products
let featuredCurrentPage = 1;
const featuredLimit = 4;
let featuredTotal = 0;

async function fetchFeaturedProducts(page = 1) {
  try {
    const skip = (page - 1) * featuredLimit;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${featuredLimit}&skip=${skip}`
    );
    const data = await res.json();

    const featuredProducts = data.products;
    featuredTotal = data.total;
    const totalPages = Math.ceil(featuredTotal / featuredLimit);

    const featuredContainer = document.getElementById("featured-products");
    featuredContainer.innerHTML = "";

    featuredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm  hover:shadow-lg transition cursor-pointer";

      card.innerHTML = `
        <div class="h-56 w-full">
          <a href="product.html?id=${product.id}">
            <img class="mx-auto h-full dark:hidden object-contain" src="${
              product.thumbnail
            }" alt="${product.title}" />
            <img class="mx-auto hidden h-full dark:block object-contain" src="${
              product.thumbnail
            }" alt="${product.title}" />
          </a>
        </div>
        <div class="pt-6">
          <div class="mb-4 flex items-center justify-between gap-4">
            ${
              product.discountPercentage
                ? `<span class="me-2 rounded bg-[#FF6900] px-2.5 py-0.5 text-xs font-medium text-white">
                    Up to ${product.discountPercentage.toFixed(0)}% off
                   </span>`
                : `<span></span>`
            }
            <div class="flex items-center justify-end gap-1">
              <button type="button" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Quick look</span>
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
              <button type="button" class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span class="sr-only">Add to favorites</span>
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                </svg>
              </button>
            </div>
          </div>

          <a href="product.html?id=${
            product.id
          }" class="text-lg font-semibold leading-tight text-black hover:underline ">
            ${product.title}
          </a>

          <div class="mt-2 flex items-center gap-2">
            <div class="flex items-center">
              ${Array(5)
                .fill(0)
                .map(
                  (_, i) => `
                    <svg class="h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>`
                )
                .join("")}
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">${product.rating.toFixed(
              1
            )}</p>
          </div>

          <ul class="mt-2 flex items-center gap-4">
            <li class="flex items-center gap-2">
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
              </svg>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
            </li>

            <li class="flex items-center gap-2">
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
            </li>
          </ul>

          <div class="mt-4 flex items-center justify-between gap-4">
            <p class="text-2xl font-bold leading-tight text-black">$${
              product.price
            }</p>

            <button type="button" class="inline-flex items-center rounded-lg bg-[#00838F] px-5 py-2.5 text-sm font-medium text-white hover:bg-gray  ">
              <svg class="-ms-2 me-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          window.location.href = `product.html?id=${product.id}`;
        }
      });

      featuredContainer.appendChild(card);
    });

    const pageInfo = document.getElementById("featuredPageInfo");
    pageInfo.textContent = `Page ${page} of ${totalPages}`;

    // Handle Featured Products Pagination
    document
      .getElementById("featuredPrevPage")
      .addEventListener("click", () => {
        if (featuredCurrentPage > 1) {
          featuredCurrentPage--;
          fetchFeaturedProducts(featuredCurrentPage);
          window.scrollTo({ behavior: "smooth" });
        }
      });

    document
      .getElementById("featuredNextPage")
      .addEventListener("click", () => {
        const totalPages = Math.ceil(featuredTotal / featuredLimit);
        if (featuredCurrentPage < totalPages) {
          featuredCurrentPage++;
          fetchFeaturedProducts(featuredCurrentPage);
          window.scrollTo({ behavior: "smooth" });
        }
      });
  } catch (error) {
    console.error("Error loading featured products:", error);
    document.getElementById("featured-products").innerHTML =
      '<p class="text-red-600">Failed to load featured products.</p>';
  }
}

async function fetchCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    const container = document.getElementById("category-list");

    container.innerHTML = "";

    const limitedCategories = categories.slice(0, 6);

    const categoryImages = {
      beauty: "images/beauty2.png",
      fragrances: "images/perfume2.png",
      furniture: "images/mirror.png",
      groceries: "images/grocery2.png",
      home_decoration: "images/shelf.png",
      kitchen_accessories: "images/kitchen.png",
      laptops: "images/Category-Computer.svg",
      smartphones: "images/Category-CellPhone.svg",
      tops: "images/Category-Gamepad.svg",
      womens_dresses: "images/clothes.svg",
      mens_shoes: "images/shoes.svg",
      womens_watches: "images/Category-SmartWatch.svg",
    };

    limitedCategories.forEach((cat) => {
      const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, "_");
      const displayName = cat.name || slug.replace(/_/g, " ");
      const imgSrc = categoryImages[slug] || "images/Category-Gamepad.svg";

      const card = document.createElement("div");
      card.className =
        "bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition relative group";

      card.innerHTML = `
        <div class="aspect-square rounded-full mx-auto">
          <img
            src="${imgSrc}"
            alt="${displayName}"
            class="h-full w-full object-contain rounded-lg group-hover:scale-105 transition duration-300"
          />
        </div>
        <div class="mt-3 text-center">
          <h4 class="text-slate-900 text-sm font-semibold">${displayName}</h4>
        </div>
      `;

      card.addEventListener("click", () => {
        window.location.href = `category.html?category=${encodeURIComponent(
          slug
        )}`;
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    document.getElementById("category-list").innerHTML =
      '<p class="text-red-600 text-center">Failed to load categories.</p>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts(1);
  fetchFeaturedProducts(1);
  fetchCategories();
});

document.getElementById("cart-icon").addEventListener("click", () => {
  window.location.href = "cart.html";
});
