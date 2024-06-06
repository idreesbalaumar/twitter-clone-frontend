// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
        <li>
          <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </li>
        <li>
          <Link to="/create-tweet" className="text-blue-500 hover:underline">Create Tweet</Link>
        </li>
        <li>
          <Link to="/tweets" className="text-blue-500 hover:underline">Tweets</Link>
        </li>
        <li>
          <Link to="/change-password" className="text-blue-500 hover:underline">Change Password</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
