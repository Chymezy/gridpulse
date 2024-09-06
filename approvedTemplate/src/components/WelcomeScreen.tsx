import React from 'react';
import SignIn from "./SignIn";

const WelcomeScreen: React.FC = () => {
  console.log("WelcomeScreen rendering");
  return (
    <div className="welcome-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
      <p className="mb-4">
        This is a versatile React TypeScript template with Firebase integration.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features:</h2>
      <ul className="list-disc list-inside mb-4">
        <li>User authentication with Google Sign-In</li>
        <li>Create and manage items with images and descriptions</li>
        <li>View a dashboard of all items</li>
        <li>Personalized user profiles</li>
        <li>Real-time updates using Firebase</li>
      </ul>
      <SignIn />
    </div>
  );
};

export default WelcomeScreen;
