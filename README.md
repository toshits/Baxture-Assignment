# Express CRUD API with Load Balancing and Redis

Welcome to the Express CRUD API project! This project provides a simple CRUD (Create, Read, Update, Delete) API built using Express.js. The API allows you to perform operations such as adding new users, updating existing users, finding all users, finding a user by ID, and deleting a user by ID. Additionally, the project leverages the cluster module for load balancing, ensuring scalability and improved performance. TypeScript is used for type checking to catch potential errors during development, resulting in a more robust codebase with fewer runtime errors in production.

## Features

- **Load Balancing:** Utilizes the cluster module for load balancing, distributing incoming requests across multiple processes to enhance performance and scalability.
- **TypeScript:** Implements TypeScript to provide static typing, reducing the likelihood of runtime errors and improving code maintainability.
- **In-Memory Database:** Utilizes Redis as an in-memory database to store data and maintain server state, ensuring efficient data access and retrieval.

## Prerequisites

Make sure you have the following installed before running the project:

- Node.js
- npm (Node Package Manager)
- Redis

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/toshits/Baxture-Assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Baxture-Assignment
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

##### To start the application in development:

   ```bash
   npm run start:dev
   ```

##### To start the application in production without load balancer:

   ```bash
   npm run start:prod
   ```

##### To start the application in production with load balancer:

   ```bash
   npm run start:multi
   ```

> **Note:** Before running the server, make sure to set up the `.env` file using the provided `.env.example` file to ensure a smooth and error-free startup.
