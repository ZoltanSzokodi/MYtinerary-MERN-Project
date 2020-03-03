import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

// CONTEXT ====================================================
import { authContext } from '../../context/AuthContext';

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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


// STYLES ===================================================
const useStyles = makeStyles(theme => ({
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4)
  },
  form: {
    width: '100%',
    maxWidth: '700px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  formError: {
    textAlign: 'center',
    color: 'red'
  },
  textField: {
    width: '80%',
    marginTop: theme.spacing(2)
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(-3.5),
    flex: 1,
  },
  loginButton: {
    width: '150px',
    marginBottom: theme.spacing(2),
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

  const { authDispatch } = useContext(authContext);

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    isSubmiting: false,
    errorMessage: null
  });

  const [showPassword, setShowPassword] = useState(false);

  // EVENT HANDLERS ==============================================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      email: '',
      password: '',
      isSubmiting: false,
      errorMessage: null
    });
  };

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleLogin = async event => {
    event.preventDefault();
    setValues({
      ...values,
      isSubmiting: true,
      errorMessage: null
    });
    try {
      const response = await axios
        .post('http://localhost:5000/api/users/login',
          {
            email: values.email,
            password: values.password
          }
        );
      const token = await response.data.token;

      authDispatch({
        type: 'LOGIN',
        payload: token
      });

      window.location.reload();
    }
    catch (error) {
      console.log(error.response);
      setValues({
        ...values,
        errorMessage: error.response.data.message || error.statusText
      });
    }
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
              Authentication
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.formContainer}>
          <form className={classes.form} noValidate autoComplete="off">
            <Typography variant='h5' align='center'>Login</Typography>

            {values.errorMessage &&
              <div className={classes.formError}>
                {values.errorMessage}
              </div>}

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                value={values.email}
                onChange={handleChange('email')}
                labelWidth={80}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={75}
              />
            </FormControl>

            <Grid className={classes.buttonsContainer} container direction="column" alignItems="center" >
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                className={classes.loginButton}
                disabled={values.isSubmiting}
              >
                {values.isSubmiting ? 'Loading...' : 'Login'}
              </Button>
              <Button
                className={classes.loginButton}
                variant="contained"
                color="secondary"
                href="http://localhost:5000/api/users/google">GOOGLE</Button>
            </Grid>

          </form>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default LoginDialog;