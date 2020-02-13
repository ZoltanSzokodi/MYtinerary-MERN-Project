import React, { useState, useContext } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { authContext } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
  root: {
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
  textField: {
    width: '80%',
    marginTop: theme.spacing(2)
  },
  formError: {

  },
  // avatar: {
  //   width: '100px',
  //   height: '100px',
  // },
  // input: {
  //   display: 'none',
  // },
  submit: {
    marginTop: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const { dispatch, state } = useContext(authContext);

  console.log(state)

  const [values, setValues] = useState({
    email: '',
    password: '',
    isSubmiting: false,
    errorMessage: null
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async event => {
    event.preventDefault();
    setValues({
      ...values,
      isSubmiting: true,
      errorMessage: null
    });
    try {
      const response = await axios
        .post(
          'http://localhost:5000/api/user/login',
          {
            email: values.email,
            password: values.password
          }
        );
      const token = await response.data.token;

      dispatch({
        type: 'LOGIN',
        payload: token
      });
      console.log(response.data)
    }
    catch (error) {
      console.log(error.response);
      setValues({
        ...values,
        errorMessage: error.response.data.message
      });
    }
  };

  return (
    <div className={classes.root}>
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

        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={values.isSubmiting}
        >
          {values.isSubmiting ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
