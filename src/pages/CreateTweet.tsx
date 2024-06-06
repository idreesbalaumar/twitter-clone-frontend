import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../features/tweets/tweetsSlice';
import { RootState } from '../store/store';

const CreateTweet: React.FC = () => {
  const [content, setContent] = useState('');
  const [userIds, setUserIds] = useState<number[]>([]);
  const dispatch = useDispatch();
  const tweetState = useSelector((state: RootState) => state.tweets);

  const handleCreateTweet = () => {
    // dispatch(createTweet({ content, users: userIds }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Create Tweet</h2>
      <div className="w-full max-w-xs">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={userIds.join(',')}
          onChange={(e) => setUserIds(e.target.value.split(',').map(Number))}
          placeholder="User IDs (comma separated)"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateTweet}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Tweet
        </button>
        {tweetState.loading && <p className="mt-4 text-blue-500">Loading...</p>}
        {tweetState.error && <p className="mt-4 text-red-500">Error: {tweetState.error}</p>}
      </div>
    </div>
  );
};

export default CreateTweet;
