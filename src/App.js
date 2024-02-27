import React, {useEffect, useState } from 'react';
import './App.css';


// API
// List: https://api.github.com/users
// Search: https://api.github.com/search/users?q=capgemini&per_page=5
// Task 1: List
// Task 2: Search
//
// User data example
// [
//    {
//      "login": "mojombo",
//      "html_url": "https://github.com/mojombo",
//    }
// ]

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    let searchUrl = 'https://api.github.com/users';
    if (searchTerm.length > 0) {
      searchUrl = `https://api.github.com/search/users?q=${searchTerm}&per_page=5`;
      fetch(searchUrl)
        .then(response => response.json())
        .then(data => setUsers(data.items));
    } else {
      fetch(searchUrl)
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
