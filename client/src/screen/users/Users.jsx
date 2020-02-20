import React, { useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// CONTEXT ============================================
import { authContext } from '../../context/AuthContext';

// MATERIAL UI ========================================
import Button from '@material-ui/core/Button';

// THIS IS FOR PASSPORT TESTING PURPOSES ===============

// COMPONENT ===========================================
const Users = () => {
  const { authState } = useContext(authContext);

  console.log(authState)

  // EVENT HANDLERS ====================================
  const handleClick = async () => {
    try {
      const response = await axios
        .get('http://localhost:5000/api/users/all',
          {
            headers: { 'Authorization': `bearer ${authState.token}` }
          });
      console.log(response);
    }
    catch (err) { console.log(err.response) }
  };


  // RENDER =============================================
  return (
    <Fragment>
      {!authState.isAuthenticated ?
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
