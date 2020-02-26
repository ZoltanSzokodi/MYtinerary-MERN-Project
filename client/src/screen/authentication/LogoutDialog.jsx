import React, { Fragment, useState, useContext } from 'react';

// CONTEXT =================================================
import { authContext } from '../../context/AuthContext';

// MATERIAL UI =============================================
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// COMPONENT =================================================
const LogoutDialog = () => {
  const [open, setOpen] = useState(false);

  const { authState, authDispatch } = useContext(authContext);

  // EVENT HANDLERS ==========================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    authDispatch({
      type: 'LOGOUT',
      payload: authState.token
    });
  };

  const handleClose = () => {
    setOpen(false);
  };


  // RENDER =================================================
  return (
    <Fragment>
      <div onClick={handleClickOpen}>
        Log out
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <Divider />
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            We hope to see you back soon!
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleLogout} color="primary" autoFocus>log out</Button>
          <Button onClick={handleClose} color="primary" autoFocus>cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LogoutDialog;