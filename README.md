# Fitness Studio Landing Page

Full-stack application for a fitness studio. Built with React, Vite, and Tailwind CSS on the client, and Node.js, Express, Drizzle ORM, and PostgreSQL on the server.

## About

A complete booking and membership platform for a fitness studio. Originally built as a static HTML/CSS site (Week 1), rebuilt with React + Tailwind (Week 2), connected to a real database and authentication system (Week 3), and finally integrated with Stripe for real payments (Week 4).

The visual design is aligned with a group of 4 peers working on the same brief, but every line of code in this repository is written by me.

## Live preview

- **Frontend:** [https://fitness-studio-site-mu.vercel.app](https://fitness-studio-site-mu.vercel.app)
- **Backend API:** [https://fitnessstudiosite.onrender.com/api/health](https://fitnessstudiosite.onrender.com/api/health)

_(Note: The backend is hosted on Render's free tier and may take ~30 seconds to wake up after a period of inactivity. The Stripe integration is in **test mode**, so no real money is processed)._

https://github.com/user-attachments/assets/36fe4d5f-09cd-4af4-9c96-fd05fe4a1475

## Tech stack

**Client:**

- **React** — component-based UI with Context for global state
- **Vite** — dev server and build tool
- **Tailwind CSS v4** — utility-first styling
- **React Router** — client-side routing with hash scrolling
- **Better Auth** — authentication client

**Server:**

- **Node.js + Express** — REST API
- **PostgreSQL (Neon)** — relational database
- **Drizzle ORM** — type-safe SQL queries and schema management
- **Better Auth** — session management and password hashing
- **Stripe** — payment processing and webhooks

## Project structure

```text
.
├── client/                 # Frontend (React + Vite) - Deployed on Vercel
│   ├── public/             # Static assets (images, favicon)
│   └── src/
│       ├── components/     # React UI components
│       ├── lib/            # API fetch wrapper and Better Auth client
│       ├── App.jsx         # Router and page layout
│       └── main.jsx
│
├── server/                 # Backend (Express + Drizzle) - Deployed on Render
│   ├── src/
│   │   ├── db/             # Schema, seed script, and data files
│   │   ├── routes/         # Express route handlers (API endpoints)
│   │   ├── auth.js         # Better Auth configuration (sessions)
│   │   └── index.js        # Express app entry point
│   └── drizzle.config.js
│
└── README.md
```

## Features

### User Authentication & Profile

- Signup, login, and logout using **Better Auth**.
- Sessions are persisted in PostgreSQL and survive page reloads using secure cross-domain cookies.
- **User Profile**: A protected route (/profile) where users can manage their account, see their active subscription, and view their upcoming booked classes.

### Interactive Class Schedule & Bookings

- Users can filter classes by day of the week.
- **Booking system**: Authenticated users can book a class. The API checks for available spots, prevents duplicate bookings, and decrements the available spots in the database.
- **Visual feedback**: The class cards display the remaining spots and show an "urgent" color when spots are running low.
- **Cancellation**: Users can cancel a booking from their profile, which deletes the record and returns the spot to the class capacity.

### Trainer Ratings

- Users can rate trainers from 1 to 5 stars.
- Ratings are saved to the database using an `onConflictDoUpdate` (upsert) query, so a user can change their rating but can't create duplicates.

### Real Payments (Stripe Checkout)

- Users can purchase memberships using **Stripe Checkout** in test mode.
- The backend creates an order (status: `pending`) and generates a secure Stripe session.
- A verified **Stripe Webhook** listens for the `checkout.session.completed` event. It's the only thing authorized to mark the order as paid and activate the user's subscription.
- The frontend `/success` page polls the backend to confirm the order status before showing the final success message.
- If a payment is cancelled, the user is redirected back with a clear error message.

### Contact Form

- Messages are validated and saved directly to the PostgreSQL database.

## State Management (React)

This project uses modern React patterns to share state across the app:

- **Custom Events** (`window.dispatchEvent`): When a user subscribes to a plan, a custom event is fired. The `Hero` component listens for this event and updates the user's membership badge instantly without a page reload.
- `useState` and `useEffect`: Used extensively for form handling, fetching API data, managing loading states, and polling the order status.

## Database Schema

The PostgreSQL database is managed with Drizzle ORM. The core tables are:

- `user`, `session`, `account`, `verification` (managed by Better Auth)
- `trainers`, `classes`, `memberships` (core business data)
- `bookings` (records user reservations and links `users` to `classes`)
- `ratings` (records user ratings for trainers, with a unique constraint on `userId` + `trainerId`)
- `subscriptions` (records active memberships, linking `users` to `memberships`)
- `orders` & `order_items` (records Stripe purchases, tracking payment status and items bought)
- `contact_messages` (stores messages from the contact form)

## Run locally (optional)

If you prefer to run the project locally instead of using the live URLs:

1. Set up your environment variables in `server/.env` and `client/.env` (see `.env.example` files).
2. Run the database migrations and seed the data: `cd server && npm install && npm run db:push && npm run db:seed`
3. Start the backend: `cd server && npm run dev`
4. Start the frontend: `cd client && npm install && npm run dev`

## What I would improve with more time

- Implement automated testing (Vitest + Supertest).
- Implement an admin dashboard to manage classes and trainers.
- Add email notifications for successful bookings and payments.

## Author

Rebeca Martínez Medina
[github.com/rebecammed](github.com/rebecammed)

## License

This project was built as part of a practicum program for Mayerfeld Consulting during October 2026. All rights reserved.
