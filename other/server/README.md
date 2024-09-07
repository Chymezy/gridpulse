## Server Logic Explanation

1. `server.js`:
   - Entry point for the Express application.
   - Sets up middleware, database connection, and routes.
   - Initializes the server to listen on a specified port.

2. `config/firebase-admin.js`:
   - Initializes the Firebase Admin SDK for server-side operations.
   - Used for verifying Firebase authentication tokens.

3. `middleware/auth.js`:
   - Contains middleware for authenticating requests using Firebase tokens.
   - Attaches the authenticated user to the request object.

4. `models/`:
   - Contains Mongoose schemas for database models.
   - `User.js`: Defines the schema for user data.
   - `EnergyData.js`: Defines the schema for energy consumption data.
   - `EfficiencyReport.js`: Defines the schema for efficiency reports.

5. `routes/`:
   - Contains route handlers for different API endpoints.
   - `users.js`: Handles user-related operations (registration, profile management).
   - `energyData.js`: Manages energy data upload and retrieval.
   - `efficiencyReports.js`: Handles generation and retrieval of efficiency reports.

Each route file (`users.js`, `energyData.js`, `efficiencyReports.js`) contains specific logic for handling CRUD operations and business logic related to their respective domains. They interact with the MongoDB database using the Mongoose models defined in the `models/` directory.

The `auth` middleware is used in protected routes to ensure that only authenticated users can access certain API endpoints.

## Setup and Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd server && npm install
   ```
3. Set up environment variables in `.env` files for both frontend and backend
4. Start the development servers:
   - Frontend: `npm start`
   - Backend: `cd server && npm start`

## Authentication

The application uses Firebase for authentication on the frontend and verifies tokens on the backend using the Firebase Admin SDK.

## API Endpoints

- `/api/users`: User management
- `/api/energy-data`: Energy data upload and retrieval
- `/api/efficiency-reports`: Efficiency report generation and retrieval

For detailed API documentation, please refer to the individual route files in the `server/routes/` directory.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.


## server.js
```
This file does several important things:
1. It imports necessary modules: Express (for creating the server), Mongoose (for MongoDB interaction), CORS (for handling 2. cross-origin requests), and Firebase Admin SDK.
2. It initializes the Express application.
3. It sets up Firebase Admin SDK using a service account key file.
4. It applies middleware: CORS for handling cross-origin requests, and express.json() for parsing JSON request bodies.
5. It connects to MongoDB using Mongoose.
6. It sets up routes by importing route files and using them with specific base paths.
7. Finally, it starts the server on a specified port.
8. This file is crucial as it brings together all the components of your server. It's where everything is initialized and connected.
```