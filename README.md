# MechMurph — website source

A clean, editable HTML/CSS replica of the MechMurph site. No build step, no
framework — just open it in a browser or edit it in VS Code / Claude Code.

## Files

```
mechmurph-site/
├─ index.html          Home
├─ shop.html           Shop (refurbished mower listing)
├─ services.html       Services + price list
├─ about.html          About Murph
├─ contact.html        Contact form
├─ appointments.html   Book a repair
├─ cart.html           Shopping cart
├─ css/styles.css      All styling (colors + fonts live at the top)
├─ js/main.js          Mobile menu toggle
└─ images/             Drop your photos here
```

## Run it locally

Just double-click `index.html`, or for live-reload while editing:

```bash
# from inside the mechmurph-site folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## What to customize (search for these)

- **`[210-XXX-XXXX]`** — your real phone number (appears in the footer + contact page).
- **`[XX]`** — real prices on `services.html` and `appointments.html`, and your warranty length.
- **`info@mechmurph.com`** — swap if you use a different address.
- **Photo placeholders** — every striped grey box is a `<div class="photo">`. Replace the
  whole div with `<img src="images/your-photo.jpg" alt="...">`, or drop a photo in and point to it.

## Change the look in one place

Open `css/styles.css`. The `:root` block at the top holds every color (including the
green) and the content width. Change a value there and it updates site-wide. The font is
Hanken Grotesk, loaded from Google Fonts in each page's `<head>`.

## Notes on the "working" parts

- **Header/footer** markup is duplicated in each HTML file (that's what keeps it framework-free
  and openable straight from disk). Edit the nav in one file, then paste the same change into
  the others.
- **Contact form** is front-end only. To actually receive messages, point the form's `action`
  at a form service (Formspree, Basin, Netlify Forms) or your own handler.
- **Checkout / Book buttons** are placeholders (`href="#"`). Link them to your payment
  processor's hosted checkout (Stripe / Square) or your booking tool when you're ready.
