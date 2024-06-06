// src/pages/ChangePassword.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { changePassword } from '../features/auth/authSlice';


const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleChangePassword = () => {
    // dispatch(changePassword({ currentPassword, newPassword }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <div className="w-full max-w-xs">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleChangePassword}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Change Password
        </button>
        {authState.loading && <p className="mt-4 text-blue-500">Loading...</p>}
        {authState.error && <p className="mt-4 text-red-500">Error: {authState.error}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
