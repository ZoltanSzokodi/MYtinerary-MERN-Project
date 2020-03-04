import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';

// CONTEXT ====================================================
import { authContext } from '../../context/AuthContext';

// MATERIAL UI ==============================================
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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
  avatar: {
    width: '100px',
    height: '100px',
  },
  input: {
    display: 'none',
  },
  submit: {
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
const SignupDialog = () => {
  const classes = useStyles();

  const { authDispatch } = useContext(authContext);
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    firstName: '',
    lastName: '',
    userImg: '',
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
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      firstName: '',
      lastName: '',
      userImg: '',
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

  // const handleFileUpload = event => {
  //   console.log(event.target.files[0])
  //   setValues({ ...values, userImg: event.target.files[0] })
  // };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSignup = async event => {
    event.preventDefault();
    setValues({
      ...values,
      isSubmiting: true,
      errorMessage: null
    });
    try {
      const response = await axios
        .post('http://localhost:5000/api/users/signup',
          {
            username: values.username,
            password: values.password,
            passwordConfirm: values.passwordConfirm,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            userImg: values.userImg,
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
        Create account
      </div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" align="center" className={classes.title}>
              Create account
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.formContainer}>
          {/* <Avatar alt="avatar" src="" className={classes.avatar} /> */}
          <form className={classes.form} noValidate autoComplete="off">
            <Typography variant='h5' align='center'>Create account</Typography>

            {values.errorMessage &&
              <div className={classes.formError}>
                {values.errorMessage}
              </div>}

            {/* <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              // onChange={handleChange('userImg')}
              onChange={handleFileUpload}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                select image
              </Button>
            </label> */}

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="username">Username</InputLabel>
              <OutlinedInput
                id="username"
                value={values.username}
                onChange={handleChange('username')}
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

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="password">Password confirm</InputLabel>
              <OutlinedInput
                id="passwordConfirm"
                type={showPassword ? 'text' : 'password'}
                value={values.passwordConfirm}
                onChange={handleChange('passwordConfirm')}
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
                labelWidth={135}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                labelWidth={40}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <OutlinedInput
                id="firstName"
                value={values.firstName}
                onChange={handleChange('firstName')}
                labelWidth={90}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <OutlinedInput
                id="lastName"
                value={values.lastName}
                onChange={handleChange('lastName')}
                labelWidth={90}
              />
            </FormControl>

            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="userImg">Picture url</InputLabel>
              <OutlinedInput
                id="userImg"
                value={values.userImg}
                onChange={handleChange('userImg')}
                labelWidth={90}
              />
            </FormControl>

            {/* <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />}
          label="Custom icon"
        /> */}

            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignup}
              disabled={values.isSubmiting}
            >{values.isSubmiting ? 'Loading...' : 'Create account'}</Button>
          </form>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default SignupDialog;