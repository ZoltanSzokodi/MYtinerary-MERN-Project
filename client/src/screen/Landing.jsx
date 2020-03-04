import React, { useState, useEffect, useContext, Fragment } from 'react';

// CONTEXT ===================================================
import { authContext } from '../context/AuthContext';

// MATERIAL UI ===============================================
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

// STATIC ====================================================
import globe from '../static/globe.png'
import beach from '../static/beach.png'
import liberty from '../static/liberty.png'
import music from '../static/music.png'



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
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  top: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    // clipPath: 'polygon(100% 0, 100% 85%, 0 100%, 0 0)',
  },
  bottom: {
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 0 15%)',
  },
  appTitle: {
    fontFamily: 'Thasadith, sans-serif',
    fontSize: '50px',
    color: theme.palette.primary.dark,
    margin: 0,
  },
  iconsContainer: {
    marginBottom: theme.spacing(3),
  },
  icon: {
    width: '70px',
  },
  subTitle: {
    fontSize: '16px',
    color: theme.palette.primary.dark,
  },
  browseBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    padding: '15px',
    border: 'none',
    borderRadius: '100px',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    textTransform: 'uppercase',
    zIndex: 10,
    // animation: '$globePulse 1s alternate infinite ease-in'
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.background.default,
    }
  },
  question: {
    color: theme.palette.background.paper,
  },
  button: {
    color: 'white',
    fontSize: '16px',
    margin: theme.spacing(2),
  }
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
        <Grow in timeout={500}>
          <div className={classes.root}>

            <div className={classes.top}>
              <h1 className={classes.appTitle}>MYtinerary</h1>
              <div className={classes.iconsContainer}>
                <img className={classes.icon} src={globe} alt="globe icon" />
                <img className={classes.icon} src={music} alt="music icon" />
                <img className={classes.icon} src={liberty} alt="liberty icon" />
                <img className={classes.icon} src={beach} alt="beach icon" />

              </div>
              <h2 className={classes.subTitle}>
                Find your perfect trip, designed by insiders who know and love their cities
              </h2>
            </div>

            <Button
              href="/cities"
              className={classes.browseBtn}>start browsing</Button>

            <div className={classes.bottom}>
              <h3 className={classes.question}>Want to add your own itinerary?</h3>
              <div className={classes.buttonsContainer}>
                <div style={!authState.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                  <Button variant="outlined" className={classes.button}><LoginDialog /></Button>
                  <Button variant="outlined" className={classes.button}><SignupDialog /></Button>
                </div>
                <div style={authState.isAuthenticated ? { display: 'block' } : { display: 'none' }}>
                  <Button variant="outlined" className={classes.button}><LogoutDialog /></Button>
                </div>
              </div>
            </div>
          </div>
        </Grow>
      )}
    </Fragment>
  );
};

export default Landing;
