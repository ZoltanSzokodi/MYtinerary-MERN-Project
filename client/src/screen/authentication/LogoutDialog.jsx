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

    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };


  // RENDER =================================================
  return (
    <Fragment>
      <div onClick={handleClickOpen}>
        Logout
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            Please confirm logout request
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout} color="primary" autoFocus>log out</Button>
          <Button onClick={handleClose} color="primary" autoFocus>cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default LogoutDialog;