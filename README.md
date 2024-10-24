# User Authentication System with Vue.js, Express.js, MongoDB, and TypeScript

This project implements a user authentication system with account registration, activation, and login functionalities. The backend is built using **Node.js (Express.js)** with **MongoDB** as the database, and **TypeScript** is used throughout for type safety. JWT is used for authentication, and account activation is done by manually copying the activation link.
## Features
- **User Registration**: Users can register by providing their email, name, mobile number, and password.
- **Account Activation**: Users receive an activation link that they can copy and paste into their browser to activate their account.
- **Login**: After account activation, users can log in with their credentials.
- **JWT Authentication**: Secures endpoints using JSON Web Tokens (JWT).
- **TypeScript**: Type safety for both frontend and backend.## Technologies Used
- **Vue.js**: For the frontend (to be connected to this backend).
- **Node.js (Express.js)**: Backend server to handle API requests.
- **MongoDB**: NoSQL database for storing user data.
- **TypeScript**: Provides type safety for the entire project.
- **JWT**: Used for user authentication.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v14+)
- **npm** (comes with Node.js)
- **MongoDB** (either a local instance or hosted on a cloud platform)

## Setup

- Clone the Repository

```bash
    git clone https://github.com/NoyonKhan12/auth-app.git
    cd auth-app
```


- Install Dependencies

```bash
    npm install
```

- Set Up Environment Variables
```bash
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    PORT=3000
    JWT_SECRET=your_jwt_secret_key  
```

Make sure to replace the following:
- username: Your MongoDB Atlas username.
- password: Your MongoDB Atlas password.
- dbname: Your database name in MongoDB Atlas.


## Build and Run



```bash
    npm run build
    npm start
```

The server will start and listen on the port defined in the .env file (default is 3000).
## Endpoints
 Register User

- URL: /api/auth/register
- Method: POST
- Content-Type: application/json
- Payload:

Request
```bash
{
    {
        "email": "test@example.com",
        "firstName": "John",
        "lastName": "Doe",
        "mobile": "1234567890",
        "password": "password123"
    }
}
```

Response

- Case 1:
    - Code: 200
    - Response
        ```bash
        {
            "message": "Registration successful. Please activate your account using the provided link.",
            "activationLink": "http://localhost:5000/api/auth/activate/{token}",
            "User": "UserData"
        }
        ```

