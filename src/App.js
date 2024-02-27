import React, {useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // const fetchUserResponse = async (url) => {
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   return json;
  // }
  
  useEffect(() => {
    const searchUrl = 'https://api.github.com/';
    let params;
    if (searchTerm.length > 0) {
      params = `search/users?q=${searchTerm}&per_page=5`;
      const getUserData = setTimeout(() => {
        fetch(searchUrl + params)
          .then(response => response.json())
          .then(data => setUsers(data.items));
      }, 250);
      return () => clearTimeout(getUserData);
    } else {
      params = 'users';
      fetch(searchUrl + params)
        .then(response => response.json())
        .then(data => setUsers(data));
    };
    
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
