import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
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
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
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

  const handleSubmit = async () => {
    try {
      console.log(values)
      const response = await axios.post('http://localhost:5000/api/user/login', values);
      const token = await response.data.token;
      const user = jwt(token);
      console.log(user);
    }
    catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">

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
        >Login</Button>
      </form>
    </div>
  );
};

export default Login;
