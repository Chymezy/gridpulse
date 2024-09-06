# GridPulse Energy Management Platform

GridPulse is a comprehensive energy management solution designed to help businesses and individuals optimize their energy consumption, reduce costs, and contribute to a sustainable future.

## Features

1. **Energy Dashboard**: Real-time monitoring of energy consumption with customizable alerts.
2. **Data Upload**: Easy upload and analysis of energy data.
3. **Efficiency Reports**: Detailed reports on energy efficiency with actionable insights.
4. **Vendor Management**: Tools to streamline energy vendor relationships and contracts.
5. **ROI Analytics**: Track and optimize return on investment for energy-related initiatives.
6. **Green Energy Partnerships**: Connect with renewable energy providers to reduce carbon footprint.

## Tech Stack

- Frontend: React with TypeScript
- Backend: Express.js with Node.js (transitioning from Firebase)
- Database: MongoDB (transitioning from Firestore)
- Authentication: Firebase Authentication
- Styling: Tailwind CSS
- State Management: React Hooks
- Routing: React Router
- Icons: React Icons
- Animations: Framer Motion
- Charts: Recharts

## Project Structure
```
src/
├── components/
│ ├── Header.tsx
│ ├── Sidebar.tsx
│ ├── BottomTabBar.tsx
│ ├── LoadingSpinner.tsx
│ ├── AddItem.tsx
│ ├── FeatureSummary.tsx
│ ├── LandingPage.tsx
│ ├── ServicesPage.tsx
│ ├── FeaturePages/
│ │ ├── EnergyDashboardPage.tsx
│ │ ├── DataUploadPage.tsx
│ │ ├── EfficiencyReportsPage.tsx
│ │ ├── GreenEnergyPartnershipsPage.tsx
│ │ └── ROIAnalyticsPage.tsx
├── firebase.ts
└── App.tsx
server/
├── models/
│ ├── User.js
│ ├── EnergyData.js
│ └── EfficiencyReport.js
├── routes/
│ ├── users.js
│ ├── energyData.js
│ └── efficiencyReports.js
├── middleware/
│ └── auth.js
├── config/
│ └── firebase-admin.js
└── server.js
```
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

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file
4. Start the development server: `npm run dev`

## Authentication

The application uses Firebase for authentication. Users can sign up and log in using email/password or social auth providers.

## Responsive Design

The application is designed to be fully responsive, with optimized layouts for both mobile and desktop views.

## Future Improvements

- Complete transition from Firebase to Express.js backend
- Implement more advanced data visualization features
- Enhance real-time collaboration features
- Integrate with IoT devices for more comprehensive energy monitoring

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.