import React, { useState } from "react";

export const Login = (props) => {
  const [name, setUserName] = useState('');
  const [points, setPoints] = useState(0);
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  

  const [searchedUserId, setSearchedUserId] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);


  const [deletedUserId, setDeletedUserId] = useState(null);
  const [deletedNotFound, setDeletedNotFound] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);
  
  const handleCreateUser = (e) => {
    e.preventDefault();

    const user = { name, points };

    fetch('http://127.0.0.1:5000/user', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then((response) => {
      console.log('new user added')
      console.log(response)
      console.log(JSON.stringify(user))
      // Get the user ID from the response and set it to the state
      response.json().then((data) => {
        setUserId(data.id);
        setDisplayName(data.name);
      })
    })
  }

  // handle when user is searched for 
  const handleSearchUser = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/users/${searchedUserId}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserNotFound(false);
            // we stored the return data in a dictionary with key user so thats why we do data.user 
            setSearchedUser(data.user);
          })
        } else {
          setUserNotFound(true);
        }
      })
  }
  
  
  const handleDeleteUser = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/users/${deletedUserId}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.ok) {
        setDeletedNotFound(false);
        setWasDeleted(true);
        setDeletedUserId(null);
        setSearchedUser(null);
      } else {
        setDeletedNotFound(true);
        setWasDeleted(false);
      }
    });
  }


  // create actual website elements
  return (
    <div className="auth-form-container">

      <h2>Create User</h2>
      {userId && <p>User: {displayName} created with ID: {userId}</p>}
      <form className="create-user-form" onSubmit={handleCreateUser}>
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
      <form className="search-user-form" onSubmit={handleSearchUser}>
        <div>
          <label htmlFor="searchedUserId">User ID: </label>
          <input value={searchedUserId} onChange={(e) => setSearchedUserId(e.target.value)} type="number" placeholder="1" id="searchedUserId" name="searchedUserId" />
        </div>
        <button type="submit">Search</button>
      </form>
      
      {userNotFound && <p>User not found</p>}
      {searchedUser &&
        <div>
          <p>User ID: {searchedUser.id}</p>
          <p>User Name: {searchedUser.name}</p>
          <p>User Points: {searchedUser.points}</p>
        </div>
      }

      <h2>Delete User</h2>
      <form className="delete-user-form" onSubmit={handleDeleteUser}>
        <div>
          <label htmlFor="deleteUser">User ID: </label>
          <input value={deletedUserId} onChange={(e) => setDeletedUserId(e.target.value)} type="number" placeholder="1" id="deletedUserId" name="deletedUserId" />
        </div>
        <button type='submit'>Delete</button>
      </form>

      {deletedNotFound && <p>User not found</p>}
      {wasDeleted && <p>User Deleted Successfully</p>}

    </div>
  )
}
