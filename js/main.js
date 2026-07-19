// MechMurph — site JS
// 1) Mobile menu open/close
// 2) A small localStorage shopping cart (add / remove / change qty)

/* ---------- Mobile menu ---------- */
document.addEventListener("click", function (e) {
  const toggle = e.target.closest("[data-menu-toggle]");
  if (toggle) {
    const nav = document.getElementById("nav");
    if (nav) {
      const open = nav.classList.toggle("open");
      toggle.textContent = open ? "\u2715" : "\u2630"; // ✕ / ☰
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }
});

/* =========================================================
   CART
   Product catalog. Add more items here as you stock them —
   each needs a unique id, name, and price.
   ========================================================= */
const MM_PRODUCTS = {
  "toro-refurb": {
    id: "toro-refurb",
    name: "Refurbished Toro Self-Propelled Mower",
    price: 250,
    note: "Cleaned, serviced, and tested by Murph.",
  },
};

const MM_CART_KEY = "mm_cart";

function mmGetCart() {
  try {
    return JSON.parse(localStorage.getItem(MM_CART_KEY)) || [];
  } catch (_) {
    return [];
  }
}

function mmSaveCart(cart) {
  localStorage.setItem(MM_CART_KEY, JSON.stringify(cart));
  mmUpdateCartCount();
  mmRenderCart();
}

function mmAddToCart(id, qty) {
  const product = MM_PRODUCTS[id];
  if (!product) return;
  qty = qty || 1;
  const cart = mmGetCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: id, qty: qty });
  }
  mmSaveCart(cart);
}

function mmSetQty(id, qty) {
  let cart = mmGetCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  } else {
    const item = cart.find((i) => i.id === id);
    if (item) item.qty = qty;
  }
  mmSaveCart(cart);
}

function mmRemove(id) {
  mmSaveCart(mmGetCart().filter((i) => i.id !== id));
}

function mmCartCount() {
  return mmGetCart().reduce((n, i) => n + i.qty, 0);
}

function mmMoney(n) {
  return "$" + n.toFixed(2);
}

/* Update every "Cart (N)" link in the header */
function mmUpdateCartCount() {
  const n = mmCartCount();
  document.querySelectorAll(".cart-link").forEach((link) => {
    // preserve any "current" styling, just swap the text
    link.textContent = "Cart (" + n + ")";
  });
}

/* Render the cart page, if we're on it */
function mmRenderCart() {
  const root = document.getElementById("cart-root");
  if (!root) return;

  const cart = mmGetCart();

  if (cart.length === 0) {
    root.innerHTML =
      '<div class="cart-empty">' +
      "<p>Your cart is empty.</p>" +
      '<a class="btn btn-green" href="shop.html">Browse the shop</a>' +
      "</div>";
    return;
  }

  let subtotal = 0;
  let html = "";

  cart.forEach((item) => {
    const p = MM_PRODUCTS[item.id];
    if (!p) return;
    const line = p.price * item.qty;
    subtotal += line;
    html +=
      '<div class="cart-item">' +
      '<div class="photo" role="img" aria-label="Product photo placeholder">Photo</div>' +
      "<div>" +
      "<strong>" + p.name + "</strong>" +
      '<div class="cart-item-note">' + (p.note || "") + "</div>" +
      '<div class="qty-controls">' +
      '<button class="qty-btn" type="button" aria-label="Decrease quantity" data-qty-dec="' + p.id + '">&minus;</button>' +
      '<span class="qty-value">' + item.qty + "</span>" +
      '<button class="qty-btn" type="button" aria-label="Increase quantity" data-qty-inc="' + p.id + '">+</button>' +
      '<button class="remove-btn" type="button" data-remove="' + p.id + '">Remove</button>' +
      "</div>" +
      "</div>" +
      '<div class="line-price">' + mmMoney(line) + "</div>" +
      "</div>";
  });

  html +=
    '<div class="cart-totals">' +
    '<span class="label">Subtotal</span>' +
    '<span class="amount">' + mmMoney(subtotal) + "</span>" +
    "</div>" +
    '<div class="cart-actions">' +
    '<a class="btn btn-dark" href="#">Checkout</a>' +
    "</div>";

  root.innerHTML = html;
}

/* Delegated clicks for add / qty / remove buttons */
document.addEventListener("click", function (e) {
  const add = e.target.closest("[data-add-to-cart]");
  if (add) {
    e.preventDefault();
    mmAddToCart(add.getAttribute("data-add-to-cart"));
    // brief confirmation on the button
    const label = add.textContent;
    add.textContent = "Added ✓";
    add.disabled = true;
    setTimeout(() => {
      add.textContent = label;
      add.disabled = false;
    }, 1200);
    return;
  }

  const inc = e.target.closest("[data-qty-inc]");
  if (inc) {
    const id = inc.getAttribute("data-qty-inc");
    const item = mmGetCart().find((i) => i.id === id);
    mmSetQty(id, (item ? item.qty : 0) + 1);
    return;
  }

  const dec = e.target.closest("[data-qty-dec]");
  if (dec) {
    const id = dec.getAttribute("data-qty-dec");
    const item = mmGetCart().find((i) => i.id === id);
    mmSetQty(id, (item ? item.qty : 0) - 1);
    return;
  }

  const rem = e.target.closest("[data-remove]");
  if (rem) {
    mmRemove(rem.getAttribute("data-remove"));
    return;
  }
});

/* Init on every page */
document.addEventListener("DOMContentLoaded", function () {
  mmUpdateCartCount();
  mmRenderCart();
});
