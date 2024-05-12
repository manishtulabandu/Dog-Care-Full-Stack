import React, { useState } from 'react';

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      totalPurchases: 10,
      address: 'Address of User 1',
    },
    // Add more mock users as needed
  ]);

  // Function to handle editing user data
  const handleEditUser = (id, updatedUser) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === id ? { ...user, ...updatedUser } : user))
    );
    // Make API call to save updated user data
  };

  return (
    <div className="users-page">
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Purchases</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td contentEditable onBlur={e => handleEditUser(user.id, { name: e.target.innerText })}>
                {user.name}
              </td>
              <td contentEditable onBlur={e => handleEditUser(user.id, { email: e.target.innerText })}>
                {user.email}
              </td>
              <td
                contentEditable
                onBlur={e => handleEditUser(user.id, { totalPurchases: parseInt(e.target.innerText) })}
              >
                {user.totalPurchases}
              </td>
              <td contentEditable onBlur={e => handleEditUser(user.id, { address: e.target.innerText })}>
                {user.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;