import React, { useState } from "react";

export const Register = (props) => {
  const [name, setUserName] = useState('');
  const [points, setPoints] = useState(0);
  const [searchId, setSearchId] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);

    const newUser = { name, points };

    fetch('http://127.0.0.1:5000/user', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    }).then((response) => {
      console.log('new user added')
      console.log(response)
      console.log(JSON.stringify(newUser))
      setUser(response);
    })
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchId);

    fetch(`http://127.0.0.1:5000/users/${searchId}`, {
      method: 'GET',
    }).then((response) => {
      console.log('search results')
      console.log(response)
      setUser(response);
    })
  }

  return (
    <div className="auth-form-container">
      <h2>Create User</h2>

      <form className="create-user-form" onSubmit={handleSubmit}>

        <div>
          <label htmlFor="user">User: </label>
          <input value={name} onChange={(e) => setUserName(e.target.value)} type="name" placeholder="John Doe" id="userName" name="userName" />
        </div>

        <div>
          <label htmlFor="points">Points: </label>
          <input value={points} onChange={(e) => setPoints(Number(e.target.value))} type="number" placeholder="0" id="points" name="points" />
        </div>

        <button type="submit">Create</button>
      </form>

      <h2>Search User</h2>

      <form className="search-user-form" onSubmit={handleSearch}>

        <div>
          <label htmlFor="searchId">User ID: </label>
          <input value={searchId} onChange={(e) => setSearchId(Number(e.target.value))} type="number" placeholder="0" id="searchId" name="searchId" />
        </div>

        <button type="submit">Search</button>
      </form>

      {user && <div>User ID: {user.id}, Name: {user.name}, Points: {user.points}</div>}

      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
  )
}
