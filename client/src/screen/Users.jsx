import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// CONTEXT ===============================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI ===========================================
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

// COMPONENTS ============================================
import MenuAppbar from '../components/MenuAppbar';
import UserListItem from '../components/UserListItem';

// STYLES ================================================
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '85vh',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
  header: {
    margin: '20px 0'
  }
}));


// COMPONENT =============================================
const Users = () => {
  const classes = useStyles();

  const { authState } = useContext(authContext);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get('/api/users/all',
      { headers: { 'Authorization': `bearer ${authState.token}` } })
      .then(res => setUserList(res.data.users))
      .catch(err => console.log(err))

  }, [authState.token])

  console.log(userList)

  // RENDER ================================================
  return (
    <div>
      {!authState.isAuthenticated && <Redirect to="/" />}
      <MenuAppbar />
      <Typography className={classes.header} variant="h6" gutterBottom align="center">
        Users List (green - logged in)
      </Typography>
      <List className={classes.root}>
        {userList.map(user => (
          <UserListItem key={user._id} userObj={user} />
        ))}
      </List>
    </div>
  );
};

export default Users;
