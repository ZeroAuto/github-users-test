import { useState, useRef, useCallback } from 'react';

const useUserSearch = () => {
  const [users, setUsers] = useState([]);
  const timeoutRef = useRef(null);

  const getUserData = url => fetch(url).then(response => response.json());

  const searchUsers = useCallback((searchTerm) => {
    const searchUrl = 'https://api.github.com/';
    let params = 'users';

    if (searchTerm.length > 0) {
      params = `search/users?q=${searchTerm}&per_page=25`;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        getUserData(searchUrl + params).then(data => setUsers(data.items));
      }, 250);
    } else {
      getUserData(searchUrl + params).then(data => setUsers(data));
    }
  }, []);

  return { users, searchUsers };
};

export default useUserSearch;
