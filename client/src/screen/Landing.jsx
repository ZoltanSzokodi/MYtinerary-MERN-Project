import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

// CONTEXT ===================================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

// STATIC ====================================================
import RoundArrow from '../static/round-pink-arrow3.png';
import backgroundImg from '../static/travel.jpg';


// COMPONENTS ================================================
import Loader from '../components/Loader';
import SignupDialog from './authentication/SignupDialog';
import LoginDialog from './authentication/LoginDialog';
import LogoutDialog from './authentication/LogoutDialog';


// STYLES ====================================================
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    height: '50%',
    // backgroundImage: `url(${backgroundImg})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    clipPath: 'polygon(100% 0, 100% 85%, 0 100%, 0 0)',
    filter: 'grayscale(100%)',
    // opacity: '.1',
  },
  bottom: {
    height: '50%',
    backgroundColor: theme.palette.primary.main,
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 15%)',
    // zIndex: 10,
  },
  '@keyframes globePulse': {
    '0%': {
      transform: 'scale(.98)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
    },
    '100%': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
    }
  },
  browseBtn: {
    position: 'absolute',
    top: '51%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    padding: '15px',
    border: 'none',
    borderRadius: '50px',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    textTransform: 'uppercase',
    zIndex: 10,
  }
  // startBrowsing: {
  //   maxWidth: '20%',
  //   borderRadius: '50%',
  //   cursor: 'pointer',
  //   animation: '$globePulse 1s alternate infinite ease-in'
  // }
}));


// COMPONENT ============================================================
const Landing = () => {
  const classes = useStyles();

  const { authState, authDispatch } = useContext(authContext);

  const [loading, setLoading] = useState(true);

  console.log(authState);

  // loader ------------------------------
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800);
  }, []);

  // LOGIN with URL TOKEN from Google =====================================
  useEffect(() => {
    const urlParam = window.location.search;
    if (urlParam !== '') {
      const token = urlParam.split('=')[1];

      authDispatch({
        type: 'LOGIN',
        payload: token
      });
      // get rid of the token from the url
      window.history.replaceState({}, document.title, "/");
    }
  }, [authDispatch]);


  // RENDER ==============================================================
  return (
    <Fragment>

      {loading && <Loader />}
      {!loading && (
        <div className={classes.root}>
          {/* <Grow in timeout={500}>
            <Grid container spacing={5} >
              <Grid item container justify='space-between' spacing={6}>
                <Grid item sm={12}>
                  <Typography variant='h6' align='center'>
                    Find your perfect trip, designed by insiders who know and love their cities.
                 </Typography>
                </Grid>

                <Grid item container sm={12} justify='center' spacing={2}>
                  <Grid item sm={12}>
                    <Typography variant='h5' align='center'>
                      START BROWSING
                   </Typography>
                  </Grid>
                  <Grid item sm={12} align='center'>
                    <Link to='/cities'>
                      <img className={classes.startBrowsing} src={RoundArrow} alt='go to itineraries'></img>
                    </Link>
                  </Grid>
                </Grid>

                <Grid item container sm={12} justify='center' spacing={2}>
                  <Grid item sm={12}>
                    <Typography variant='h5' align='center'>
                      Share your itineraries!
                   </Typography>
                  </Grid>

                  <Grid item container sm={12} align='center' direction='column'>
                    <div style={!authState.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                      <Button><LoginDialog /></Button>
                      <Button><SignupDialog /></Button>
                    </div>
                    <div style={authState.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                      <Button><LogoutDialog /></Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grow> */}
          <button className={classes.browseBtn}>start browsing</button>
          <div className={classes.top}>
            <h3>MYtinerary</h3>
          </div>
          <div className={classes.bottom}>2</div>
        </div>
      )}
    </Fragment>
  );
};

export default Landing;
