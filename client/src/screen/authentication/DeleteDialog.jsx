import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

// CONTEXT =================================================
import { authContext } from '../../context/AuthContext';

// MATERIAL UI =======================================================
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// STYLES =================================================
const useStyles = makeStyles({
  deleteBtn: {
    color: 'red'
  }
});


// COMPONENT =================================================
const DeleteDialog = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { authState, authDispatch } = useContext(authContext);

  const { token } = authState;

  // EVENT HANDLERS ==========================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      authDispatch({
        type: 'LOGOUT',
        payload: token
      });

      const response = axios.delete('http://localhost:5000/api/users/',
        { headers: { 'Authorization': `bearer ${token}` } });

      console.log(response);
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  };


  // RENDER =================================================
  return (
    <Fragment>
      <div className={classes.deleteBtn} onClick={handleClickOpen}>
        Delete account
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
            Please confirm delete account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>delete</Button>
          <Button onClick={handleClose} color="primary" autoFocus>cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteDialog;