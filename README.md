# REST API Project

A simple Node.js/Express REST API with MongoDB and email notification support.

## Project Structure

- `index.js` — application entry point and route registration
- `controller/authcontroller.js` — user login/register controller with email send logic
- `controller/customer_controller.js` — CRUD operations for customers
- `routes/auth.js` — authentication route definitions
- `routes/customer_routes.js` — customer route definitions
- `model/user.js` — Mongoose schema/model for users
- `model/customer.js` — Mongoose schema/model for customers
- `.env` — environment variables for database and SMTP credentials

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB Atlas or MongoDB connection string
- SMTP credentials for email delivery

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
```

> Note: Do not wrap values in quotes unless required by your shell.

## Run the Project

```bash
node index.js
```

The server listens on port `3000` by default.

## API Endpoints

### Auth

- `POST /user/register`
  - Request body: `{ "name": "...", "email": "...", "password": "..." }`
  - Registers a user, saves it to MongoDB, and sends a welcome email.

- `POST /user/login`
  - Request body: `{ "email": "...", "password": "..." }`
  - Returns a success response for login.

### Customer

- `GET /customer/customer` — retrieve all customers
- `POST /customer/customer` — create a new customer
- `PUT /customer/customer/:id` — update a customer by ID
- `GET /customer/customer/:id` — get a customer by ID
- `DELETE /customer/customer/:id` — delete a customer by ID

## Notes

- The current code uses MongoDB Atlas for data persistence.
- If email sending fails, the app returns an error from the SMTP provider.
- Confirm the SMTP host, port, and credentials are correct in your `.env` file.

## Troubleshooting

- If registration saves to the database but returns `535 5.7.8 Authentication failed`, your SMTP credentials are invalid or blocked.
- Verify `.env` is loaded and the application is started from the project root.
- Use Postman to call the endpoints with JSON request bodies.

"# FitVerse" 
"# FitVerse" 
