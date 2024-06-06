// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import ChangePassword from './pages/ChangePassword';
import CreateTweet from './pages/CreateTweet';
import ViewTweets from './pages/ViewTweets';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-tweet" element={<CreateTweet />} />
          <Route path="/tweets" element={<ViewTweets />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
