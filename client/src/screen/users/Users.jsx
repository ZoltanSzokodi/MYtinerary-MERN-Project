import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import Button from '@material-ui/core/Button';
import axios from 'axios';

// THIS IS FOR PASSPORT TESTING PURPOSES ===============

const Users = () => {
  const { state } = useContext(authContext);

  // console.log(state.token)

  const handleClick = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/user/all',
        {
          headers:
          {
            'Authorization': `bearer ${state.token}`
          }
        });
      console.log(response);
    }
    catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Fragment>
      {!state.isAuthenticated ?
        <Redirect to='/' /> :
        <Fragment>
          <div>GET ALL USERS</div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}>Get users</Button>
        </Fragment>
      }
    </Fragment>
  );
};

export default Users;
