# Institute of Customer Service and Trade Management of Nigeria

Welcome to the official repository for the **Institute of Customer Service and Trade Management of Nigeria** web portal!  
This project is a modern, scalable, and visually engaging platform for professional development, membership management, events, and resources.

---

## 🚀 Tech Stack

### Frontend

- **[Vite](https://vitejs.dev/):** Lightning-fast frontend tooling.
- **[React](https://react.dev/):** Component-based UI for maintainable and scalable code.
- **[TypeScript](https://www.typescriptlang.org/):** Type safety for robust applications.
- **[TailwindCSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid, responsive design.
- **[Lucide React](https://lucide.dev/):** Beautiful, consistent icons.
- **[React Router](https://reactrouter.com/):** Seamless client-side routing.
- **ESLint & Prettier:** For code quality and formatting.

### Backend

- **[Node.js](https://nodejs.org/):** JavaScript runtime for scalable server-side applications.
- **[Fastify](https://fastify.dev/):** High-performance, low-overhead web framework for Node.js.  
  _Originally built with [Express](https://expressjs.com/), but migrated to Fastify for better performance and to resolve persistent routing and middleware errors._
- **[TypeScript](https://www.typescriptlang.org/):** Type safety for backend code.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database for flexible data storage.
- **[Mongoose](https://mongoosejs.com/):** Elegant MongoDB object modeling.
- **[JWT](https://jwt.io/):** Secure authentication.
- **[dotenv](https://github.com/motdotla/dotenv):** Environment variable management.
- **[@fastify/cors](https://github.com/fastify/fastify-cors):** Cross-origin resource sharing.
- **[@fastify/static](https://github.com/fastify/fastify-static):** Static file serving.
- **[@fastify/multipart](https://github.com/fastify/fastify-multipart):** File upload support.

> _**Note:** The backend was originally implemented with Express, but due to recurring routing and middleware issues, it was migrated to Fastify for improved stability, speed, and developer experience._

---

## 🏗️ Project Structure

```
institute-customer-trade-ng/
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components (Navigation, Footer, AuthModal, etc.)
│   │   ├── context/       # React Context for global state (e.g., Auth)
│   │   ├── pages/         # Main pages (Home, About, Membership, Events, Resources, Dashboard, Portal, Contact)
│   │   ├── uploads/       # Static assets (images, etc.)
│   │   ├── index.css      # TailwindCSS entry
│   │   └── main.tsx       # App entry point
│   ├── public/            # Static public files
│   └── vite.config.ts     # Vite configuration
│
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/        # API route handlers (auth, events, payments, admin, etc.)
│   │   ├── controllers/   # Business logic for routes
│   │   ├── models/        # Mongoose models (User, Event, Payment, etc.)
│   │   ├── middleware/    # Express middleware (auth, error handling, etc.)
│   │   ├── utils/         # Utility functions (DB connection, seeding, etc.)
│   │   └── server.ts      # Main server entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration
│
├── README.md
└── package.json           # Root dependencies and scripts (optional)
```

---

## 🧩 Components & Functions

### Frontend Components

- **Navigation:** Top navigation bar with links and authentication controls.
- **Footer:** Site-wide footer with contact info and links.
- **AuthModal:** Login/register modal for user authentication.
- **EventCard:** Displays event details.
- **ResourceCard:** Displays downloadable resources.
- **Dashboard:** User dashboard for managing membership, events, and resources.
- **AdminPanel:** Admin dashboard for managing users, events, and analytics.
- **Testimonial:** Member testimonials.
- **CouncilMember:** Displays council member profiles.
- **HeroCarousel:** Homepage hero section with auto-sliding banners.
- **ProtectedRoute:** Guards routes that require authentication.

### Backend Functions

- **Authentication:** Register, login, JWT-based auth, password hashing.
- **User Management:** CRUD operations for users/members.
- **Event Management:** CRUD operations for events (create, update, delete, list).
- **Payment Processing:** Handle membership payments and renewals.
- **Admin Controls:** Manage users, events, resources, and analytics.
- **Resource Management:** Upload and serve downloadable resources.
- **Seeding:** Seed initial admin users and data.
- **Error Handling:** Centralized error middleware.
- **Database Connection:** Connect to MongoDB using Mongoose.

---

## 🖥️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud)

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/institute-customer-trade-ng.git
cd institute-customer-trade-ng
```

### 2. Setup the Frontend

```sh
cd client
npm install
# or
yarn
```

#### Development

```sh
npm run dev
# or
yarn dev
```

#### Production Build

```sh
npm run build
# or
yarn build
```

### 3. Setup the Backend

```sh
cd ../server
npm install
# or
yarn
```

#### Environment Variables

Create a `.env` file in `server/` with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Development

```sh
npm run dev
# or
yarn dev
```

#### Production Build

```sh
npm run build
npm start
# or
yarn build
yarn start
```

---

## 🚀 Deployment

### 1. Build the Frontend

```sh
cd client
npm run build
```
This creates a `dist` folder with static files.

### 2. Serve Frontend from Backend

In `server/src/server.ts`, add **after your API routes**:

```typescript
import path from 'path';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// For any other route, serve index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});
```

### 3. Build and Start Backend

```sh
cd server
npm run build
npm start
```

### 4. Deploy to Hosting Platform

- **Recommended platforms:** [Render](https://render.com), [Railway](https://railway.app), [Heroku](https://heroku.com), [Vercel](https://vercel.com) (frontend only), [Netlify](https://netlify.com) (frontend only).
- Set environment variables in your platform dashboard.
- Use the following build/start commands:
  - **Build:** `npm run build`
  - **Start:** `npm start`

### 5. Domain & HTTPS

- Add your custom domain in your platform dashboard.
- Ensure HTTPS is enabled.

---

## 🌟 Features

- **Modern UI:** Responsive, accessible, and beautiful out of the box.
- **Membership Management:** Join, renew, and manage your professional membership.
- **Events & Resources:** Browse, register, and download professional resources.
- **Admin Portal:** Manage members, events, and analytics (for admins).
- **Authentication:** Secure login and registration flows.
- **Payments:** Membership payments and renewals.
- **Notifications:** Real-time updates for members.
- **Testimonials:** Member feedback and success stories.

---

## 🛠️ Future Plans

- **Advanced Analytics:** Member and event analytics for admins.
- **Real-time Chat:** Member and admin communication.
- **Mobile App:** React Native version for mobile users.
- **Third-party Integrations:** Payment gateways, email, SMS, etc.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions, support, or partnership inquiries, please