import React, {useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUserData = url => fetch(url).then(response => response.json());

  useEffect(() => {
    const searchUrl = 'https://api.github.com/';
    let params = 'users';
    if (searchTerm.length > 0) {
      params = `search/users?q=${searchTerm}&per_page=5`;
      const getUserDataTimeout = setTimeout(() => {
        getUserData(searchUrl + params).then(data => setUsers(data.items));
      }, 250);
      return () => clearTimeout(getUserDataTimeout);
    } else {
      getUserData(searchUrl + params).then(data => setUsers(data));
    }
  }, [searchTerm]);
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <main>
      <h1>Git Hub User List</h1>
      <input onChange={handleInputChange} />
      {users.length > 0 && users.map((user) => <div key={user.id}><a href={user.html_url}>{user.login}</a></div>)}
    </main>
  );
}

export default App;
