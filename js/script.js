let currentPage = 1;
const limit = 3; // Number of products per page
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  fetchProducts(currentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---------------------- Featured Products Pagination ----------------------
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
        "rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer";

      card.innerHTML = `
        <div class="relative h-56 w-full overflow-hidden rounded-lg bg-gray-100">
          <img src="${product.thumbnail}" alt="${
        product.title
      }" class="object-cover w-full h-full" />
          ${
            product.discountPercentage
              ? `<span class="absolute top-3 left-3 bg-[#00838F] text-white text-xs font-semibold px-2 py-1 rounded">
                  ${product.discountPercentage.toFixed(0)}% OFF
                 </span>`
              : ""
          }
        </div>
        <div class="pt-5">
          <h3 class="text-lg font-semibold text-gray-900">${product.title}</h3>
          <p class="text-sm text-gray-500 line-clamp-2">${
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

      featuredContainer.appendChild(card);
    });

    // ✅ Update pagination info
    const pageInfo = document.getElementById("featuredPageInfo");
    pageInfo.textContent = `Page ${page} of ${totalPages}`;

    // ✅ Enable/disable buttons
    document.getElementById("featuredPrevPage").disabled = page === 1;
    document.getElementById("featuredNextPage").disabled = page === totalPages;
  } catch (error) {
    console.error("Error loading featured products:", error);
    document.getElementById("featured-products").innerHTML =
      '<p class="text-red-600">Failed to load featured products.</p>';
  }
}

// ✅ Pagination event listeners
document.getElementById("featuredPrevPage").addEventListener("click", () => {
  if (featuredCurrentPage > 1) {
    featuredCurrentPage--;
    fetchFeaturedProducts(featuredCurrentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("featuredNextPage").addEventListener("click", () => {
  featuredCurrentPage++;
  fetchFeaturedProducts(featuredCurrentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

async function fetchCategories() {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    const container = document.getElementById("category-list");

    container.innerHTML = "";

    // ✅ Show only the first 6 categories on homepage
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
      // ✅ Each category object looks like:
      // { slug: "beauty", name: "Beauty", url: "https://dummyjson.com/products/category/beauty" }
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

      // ✅ Redirect to the category page when clicked
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
