# QR Ordering App

## Scope

- Single QR web app for customers: enter details, pick table, add menu items with photos, place order.
- Real-time Kitchen dashboard to view and update order statuses (new → preparing → ready).
- Real-time Billing dashboard with totals and print total.
- Serverless: Firebase Firestore for storage and realtime sync; pure static hosting.

## Tech Stack

- Frontend: Vanilla HTML/CSS/JS (modular ES imports). No build step.
- Backend: None (Firestore client SDK only).
- Hosting: Firebase Hosting (or Netlify/Vercel equivalent).

## Files/Structure

- `public/styles.css`: Vibrant UI styles.
- `public/app.js`: Firebase init, menu data, shared helpers, Firestore APIs.
- `public/index.html`: Customer ordering UI.
- `public/kitchen.html`: Kitchen orders view + status updates.
- `public/billing.html`: Billing orders view + totals + print.

## Data Model (Firestore)

- Collection: `orders/{orderId}`
  - `customerName: string`
  - `phone: string`
  - `table: string`
  - `items: Array<{ id, name, price, qty }>`
  - `total: number`
  - `status: 'new' | 'preparing' | 'ready'`
  - `createdAt: timestamp`

## Security Rules (Phase 1: demo)

- Demo/open (lock down later):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write;
    }
  }
}
```

- Phase 2 (recommended): restrict writes to `orders` from unauth customer using reCAPTCHA or callable Cloud Function; restrict kitchen/billing reads with simple PIN or Auth.

## Business Logic

- Currency: INR (₹ display); numeric precision in JS (use `toFixed(2)` for display).
- Status flow: `new` (default) → `preparing` → `ready` (set by kitchen).

### Calculation (client-side)

- On place order:
  - `subtotal = sum(item.price * qty)`
  - `total = +(subtotal).toFixed(2)`
  - Persist all Two fields.

## Pages

### Customer (`index.html`)

- Form: name, phone, table; persist to `localStorage`.
- Category tabs, menu grid with photos/prices, qty controls.
- Sticky cart bar showing subtotal + total; button to submit.
- On submit: create an `orders` document with status `new`.

### Kitchen (`kitchen.html`)

- Live list of orders (desc by `createdAt`).
- Show table, customer, lines with qty, subtotal + total.
- Buttons: Mark Preparing, Mark Ready (updates `status`).

### Billing (`billing.html`)

- Live orders view with status badge.
- Display subtotal, and total; print button (browser print).

## Visual/UI

- Dark, high-contrast gradient background; appetizing card photos.
- Clear CTA buttons; sticky cart; compact order cards for kitchen/billing.
- Replaceable Unsplash photo URLs in `MENU`.

## QR Flow

- Deploy `index.html`; generate table QR codes pointing to that URL.
- Kitchen tablet opens `kitchen.html`; Billing desk opens `billing.html`.

## Deployment

- Firebase project + Web App; copy config into `app.js`.
- Firestore in production mode; add demo rules; later harden.
- Firebase Hosting: deploy `public/`.

## Acceptance Criteria

- Customer can submit an order with items; order appears in both kitchen and billing in <2s.
- Totals reflect INR.
- Kitchen can change order status; billing view updates instantly.
- Print produces legible bill.
