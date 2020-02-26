import React, { Fragment, useState } from 'react';

// MATERIAL UI ==============================================
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


// STYLES ===================================================
const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(-3.5),
    flex: 1,
  },
  loginButton: {
    width: '250px',
    marginBottom: theme.spacing(2)
  },
  buttonsContainer: {
    marginTop: theme.spacing(4)
  }
}));

// COMPONENT ====================================================
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// COMPONENT ======================================================
const LoginDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // EVENT HANDLERS ==============================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // RENDER =======================================================
  return (
    <Fragment>
      <div onClick={handleClickOpen}>
        Login
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" align="center" className={classes.title}>
              Select account
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid className={classes.buttonsContainer} container direction="column" alignItems="center" >
          <Button
            className={classes.loginButton}
            variant="contained"
            href="/login" >EMAIL</Button>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="secondary"
            href="http://localhost:5000/api/users/google">GOOGLE</Button>
        </Grid>
      </Dialog>
    </Fragment>
  );
};

export default LoginDialog;