import React, { useState } from 'react';
import useUserSearch from './components/UserSearch.js';
import './App.css';

function App() {
  const { users, searchUsers } = useUserSearch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    searchUsers(searchTerm);
  }

  if (users.length === 0) {
    searchUsers(searchTerm);
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-gray-800 p-5 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Search users..."
            className="w-full border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        
        <ul>
          {users && users.map((user) => {
            return (
              <li
                key={user.id}
                className="flex items-center py-2 border-b border-gray-700"
              >
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                  src={user.avatar_url}
                />
                <span className="text-gray-300">{user.login}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
