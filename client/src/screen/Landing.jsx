import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import ItineraryLogo from '../static/itineraryLogo.png';
import RoundArrow from '../static/round-pink-arrow3.png';
import Loader from '../components/Loader';

const styles = {
  root: {
    backgroundImage: 'linear-gradient(to bottom, #ffffff 50%, #f2f1fb 75%)',
    minHeight: '102vh',
    overflow: 'hidden'
  },
  itineraryLogo: {
    width: '100%'
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
  startBrowsing: {
    maxWidth: '20%',
    borderRadius: '50%',
    cursor: 'pointer',
    animation: '$globePulse 1s alternate infinite ease-in'
  }
};

const Landing = ({ classes }) => {
  const { dispatch, state } = useContext(authContext);
  const [loading, setLoading] = useState(true);

  // LOADER ===============================================================
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

      dispatch({
        type: 'LOGIN',
        payload: token
      });
    }
  }, [dispatch]);

  // SIMPLE LOG OUT ======================================================
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });
  };

  return (
    <div className={classes.root}>
      {loading && <Loader />}
      {!loading && (
        <Grow in timeout={500}>
          <Grid container spacing={5} >
            <Grid item sm={12} ><img className={classes.itineraryLogo} src={ItineraryLogo} alt='logo' /></Grid>

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
                  <div style={!state.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                    <Link to='/signup'>
                      <Button color='primary' size='large'>Create account</Button>
                    </Link>
                    <Link to='login'>
                      <Button color='primary' size='large'>Log in</Button>
                    </Link>
                  </div>
                  <div style={state.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                    <Button color='primary' size='large' onClick={handleLogout}>Log out</Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grow>
      )}
    </div>
  );
};

export default withStyles(styles)(Landing);
