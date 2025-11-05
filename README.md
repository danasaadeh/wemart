# E‑Commerce Products (Front-End)

A lightweight, static front‑end for an e‑commerce product catalog. Built with plain HTML, CSS, and JavaScript (no framework), featuring product listings, categories, product detail pages, and a shopping cart UI persisted in the browser.

## Features
- Product listing and category pages
- Product detail page
- Client-side cart (localStorage)
- Responsive layout (single CSS)
- No backend required (can run from any static server)

## Tech Stack
- HTML5
- CSS3 (`style.css`)
- Vanilla JavaScript (`/js/*.js`)

## Project Structure
```
.
├─ index.html            # Landing/home
├─ all-products.html     # All products listing
├─ category.html         # Category view
├─ product.html          # Product detail
├─ style.css             # Global styles
├─ js/
│  ├─ script.js          # Shared/init scripts
│  ├─ all-products.js    # All products page logic
│  ├─ category.js        # Category page logic
│  ├─ product.js         # Product detail logic
│  └─ cart.js            # Cart logic (localStorage)
└─ images/               # Product and UI assets
```

## Getting Started
You can open the site directly in a browser or use a simple static server.

### Option A: Open `index.html`
- Double‑click `index.html` or drag it into your browser.
- Some features that rely on fetch/XHR may require a local server due to browser CORS/file URL restrictions.

### Option B: VS Code Live Server (recommended)
1. Install the “Live Server” extension.
2. Right‑click `index.html` → “Open with Live Server”.

### Option C: Simple HTTP server
Using Node.js (no project install needed):
```bash
# In project root
npx --yes http-server -p 5173 .
# Then open http://localhost:5173
```
On PowerShell (Windows), the above command works the same.

## Development
- Edit HTML pages and corresponding JS files in `/js`.
- Images live in `/images`.
- Cart data is stored in `localStorage`; clear it via DevTools → Application → Storage if needed.

## Deployment
Any static host works:
- GitHub Pages, Netlify, Vercel, or S3/CloudFront
- Upload the contents of the project directory as‑is

## Contributing
- Use clear, descriptive names for functions and variables.
- Keep logic in page‑specific JS files; keep shared helpers in `script.js`.
- Test pages at common breakpoints (mobile, tablet, desktop).

## License
This project is provided as‑is without a specific license file. Add a license if you plan to redistribute.


