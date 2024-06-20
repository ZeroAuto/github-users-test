import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUserData = useCallback(url => {
    return fetch(url).then(response => response.json());
  }, []);

  useEffect(() => {
    const searchUrl = 'https://api.github.com/';
    let params = 'users';
    if (searchTerm.length > 0) {
      params = `search/users?q=${searchTerm}&per_page=20`;
      const getUserDataTimeout = setTimeout(() => {
        getUserData(searchUrl + params).then(data => setUsers(data.items));
      }, 250);
      return () => clearTimeout(getUserDataTimeout);
    } else {
      getUserData(searchUrl + params).then(data => setUsers(data));
    }
  }, [searchTerm, getUserData]);
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
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
