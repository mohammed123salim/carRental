import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'reactstrap';
import { fetchUsers, deleteUser } from '../Features/UserSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const userlist = useSelector(state => state.users.value);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container fluid>
      <h2>List of users</h2>
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userlist && userlist.length > 0 ? (
            userlist
            .filter(user => user.role !== 'admin')  
            .map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>{user.age}</td>
                <td>
                  <Button color="danger" size="sm" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))

          ) : (
            <tr><td colSpan="6">No users found</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
