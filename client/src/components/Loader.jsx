import React from 'react';

// MATERIAL UI ==================================================
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';


// STYLES =======================================================
const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  appTitle: {
    color: theme.palette.primary.dark,
    fontFamily: 'Thasadith, sans-serif',
    fontSize: '26px',
  },
  loader: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    '&:before, &:after': {
      borderRadius: '50%',
      position: 'absolute',
    }
  },
  loader9: {
    backgroundColor: 'transparent',
    animation: '$loader-anim .8s infinite linear',
    '&:before': {
      content: "''",
      width: '80%',
      height: '80%',
      backgroundColor: 'transparent',
      top: '10%',
      left: '10%',
      boxShadow: '5px -8px 0 rgba(235,6,117,0.8), 8px 5px 0 rgba(26,170,172,0.8),-3px 8px 0 rgba(18,119,189,0.8), -8px -5px 0 rgba(255,203,49,0.9)',
      // boxShadow: '5px -8px 0 rgba(18,119,189,0.8), 8px 5px 0 rgba(18,119,189,0.8),-3px 8px 0 rgba(18,119,189,0.8), -8px -5px 0 rgba(18,119,189,0.8)',
    },
  },
  '@keyframes loader-anim': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
}));


// COMPONENT ===============================================================
const Loader = () => {
  const classes = useStyles();


  // RENDER ================================================================
  return (
    <Grow in timeout={500}>
      <div className={classes.container}>
        <h2 className={classes.appTitle}>MYtinerary</h2>
        <div className={`${classes.loader} ${classes.loader9}`}></div>
      </div>
    </Grow>
  );
};

export default Loader;
