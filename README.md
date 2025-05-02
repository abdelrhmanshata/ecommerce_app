# E-commerce API

A robust e-commerce REST API built with Node.js, Express, TypeScript, and Prisma.

## Features

- 🔐 Authentication & Authorization
- 👤 User Management
- 📦 Product Management
- 🛒 Shopping Cart
- 📝 Order Management
- 📍 Address Management
- 🔍 Full-text Search
- 🎯 Role-based Access Control (Admin/User)

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- Zod (Validation)
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce_app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your database credentials and JWT secret.

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `GET /users/addresses` - List user addresses
- `POST /users/addresses` - Add new address
- `DELETE /users/addresses/:id` - Delete address

### Products
- `GET /products` - List products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Cart
- `GET /cart` - View cart
- `POST /cart` - Add item to cart
- `PUT /cart/:id` - Update cart item
- `DELETE /cart/:id` - Remove item from cart

### Orders
- `POST /orders` - Create order
- `GET /orders` - List user orders
- `GET /orders/:id` - Get order details
- `PUT /orders/:id/cancel` - Cancel order
- `PUT /orders/:id/status` - Update order status (Admin only)

## Error Handling

The API uses standard HTTP status codes and returns consistent error responses:

```json
{
  "message": "Error message",
  "errorCode": 1001,
  "error": {}
}
```

## Database Schema

The project uses Prisma ORM with PostgreSQL. Key models include:
- User
- Product
- CartItem
- Order
- OrderProduct
- OrderEvent
- Address

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License 