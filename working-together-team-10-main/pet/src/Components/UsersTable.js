import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {projectUrl} from "./configure";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState({});
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${projectUrl}`+'/getUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleEditChange = (userEmail, fieldName, value) => {
    setEditedUsers({
      ...editedUsers,
      [userEmail]: {
        ...editedUsers[userEmail],
        [fieldName]: value
      }
    });
  };

  const handleSave = async (userEmail) => {
    try {
      const updatedUser = editedUsers[userEmail];
      await axios.put(`${projectUrl}`+`/updateUser/${userEmail}`, updatedUser);
      setUsers(users.map(user => user.Email === userEmail ? { ...user, ...updatedUser } : user));
      setEditedUsers({
        ...editedUsers,
        [userEmail]: null
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userEmail) => {
    try {
      await axios.delete(`${projectUrl}`+`/deleteUser/${userEmail}`);
      setUsers(users.filter(user => user.Email !== userEmail));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
      user['First Name'].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div>
        <h2>Users Table</h2>
        <input
            type="text"
            placeholder="Search by first name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        {error && <div>{error}</div>}
        <table>
          <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredUsers.map(user => (
              <tr key={user.Email}>
                <td>{user.Email}</td>
                <td>
                  {editedUsers[user.Email] ? (
                      <input
                          type="text"
                          value={editedUsers[user.Email]['First Name']}
                          onChange={(e) => handleEditChange(user.Email, 'First Name', e.target.value)}
                      />
                  ) : (
                      user['First Name']
                  )}
                </td>
                <td>
                  {editedUsers[user.Email] ? (
                      <input
                          type="text"
                          value={editedUsers[user.Email]['Last Name']}
                          onChange={(e) => handleEditChange(user.Email, 'Last Name', e.target.value)}
                      />
                  ) : (
                      user['Last Name']
                  )}
                </td>
                <td>
                  {editedUsers[user.Email] ? (
                      <input
                          type="text"
                          value={editedUsers[user.Email]['Phone Number']}
                          onChange={(e) => handleEditChange(user.Email, 'Phone Number', e.target.value)}
                      />
                  ) : (
                      user['Phone Number']
                  )}
                </td>
                <td>{user['City']}</td>
                <td>{user['State']}</td>
                <td>{user['Country']}</td>
                <td>
                  {editedUsers[user.Email] ? (
                      <>
                        <Button onClick={() => handleSave(user.Email)}>Save</Button>
                        <Button onClick={() => setEditedUsers({ ...editedUsers, [user.Email]: null })}>Cancel</Button>
                      </>
                  ) : (
                      <>
                        <Button onClick={() => setEditedUsers({ ...editedUsers, [user.Email]: { ...user } })}>Edit</Button>
                        <Button onClick={() => handleDelete(user.Email)}>Delete</Button>
                      </>
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default UsersTable;
