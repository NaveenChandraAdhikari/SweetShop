# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop inventory with user authentication, inventory management, and admin controls.

## 🚀 Features

### User Features
- **User Registration & Login** - Secure JWT-based authentication
- **Browse Sweets** - View all available sweets in a beautiful card-based UI
- **Search & Filter** - Search by name, category, or price range
- **Purchase Sweets** - Buy sweets with real-time quantity updates

### Admin Features
- **Add New Sweets** - Create new sweet entries with images and descriptions
- **Edit Sweets** - Update sweet details (name, price, description, etc.)
- **Delete Sweets** - Remove sweets from inventory
- **Restock Sweets** - Increase inventory quantity

## 🛠️ Tech Stack

### Backend
- **Java 23** with **Spring Boot 3.4**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with PostgreSQL
- **Lombok** for boilerplate reduction

### Frontend
- **React 18** with Vite
- **React Query** for data fetching
- **React Router** for navigation
- **TailwindCSS** for styling
- **React Hot Toast** for notifications
- **React Hook Form** for form handling

## 📁 Project Structure

```
├── sweet-shop-backend/        # Spring Boot Backend
│   └── src/main/java/com/sweetshop/
│       ├── controller/        # REST Controllers
│       ├── service/           # Business Logic
│       ├── repository/        # JPA Repositories
│       ├── models/            # Entity Classes
│       ├── dtos/              # Data Transfer Objects
│       └── security/          # JWT & Security Config
│
└── sweet-shop-frontend/       # React Frontend
    └── src/
        ├── components/        # React Components
        │   └── Dashboard/     # Dashboard Components
        ├── hooks/             # Custom Hooks
        ├── contextApi/        # Context Providers
        └── api/               # API Configuration
```

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Sweets (Protected - Requires Authentication)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/sweets` | Get all sweets | User/Admin |
| GET | `/api/sweets/{id}` | Get sweet by ID | User/Admin |
| GET | `/api/sweets/search` | Search sweets | User/Admin |
| POST | `/api/sweets` | Create new sweet | User/Admin |
| PUT | `/api/sweets/{id}` | Update sweet | User/Admin |
| DELETE | `/api/sweets/{id}` | Delete sweet | **Admin Only** |
| POST | `/api/sweets/{id}/purchase` | Purchase sweet | User/Admin |
| POST | `/api/sweets/{id}/restock` | Restock sweet | **Admin Only** |

### Search Parameters
- `name` - Search by sweet name (partial match)
- `category` - Filter by category (Chocolate, Candy, Pastry, Cookie, Cake, Ice Cream)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter

## 🏃 Getting Started

### Prerequisites
- Java 23+
- Node.js 18+
- PostgreSQL database

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd sweet-shop-backend
   ```

2. **Configure database** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/sweetshop
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd sweet-shop-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment** - Create/update `.env` file:
   ```
   VITE_BACKEND_URL=http://localhost:8080
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:** Navigate to `http://localhost:5173`

## 👤 Creating Admin User

To test admin features, update a user's role in the database:

```sql
UPDATE users SET role = 'ROLE_ADMIN' WHERE username = 'your_username';
```

## 🎨 Sweet Categories

- 🍫 Chocolate
- 🍬 Candy
- 🧁 Pastry
- 🍪 Cookie
- 🎂 Cake
- 🍦 Ice Cream

## 📄 License

This project is for educational purposes.

---

Made with ❤️ for sweet lovers everywhere!
