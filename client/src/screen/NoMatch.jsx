import React from 'react';

// MATERIAL UI ==========================================
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// STATIC ===============================================
import closed from '../static/404.png';


// STYLES ===============================================
const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  message: {
    fontSize: '20px',
    margin: theme.spacing(2)
  },
  img: {
    width: '40%',
    minWidth: '200px',
    margin: theme.spacing(2)
  }
}));


// COMPONENT ============================================
const NoMatch = () => {
  const classes = useStyles();


  // RENDER =============================================
  return (
    <div className={classes.container}>
      <img className={classes.img} src={closed} alt="404" />
      <Typography variant="h3">
        404
      </Typography>
      <span className={classes.message}>Sorry this didn't work out for you Chief!</span>
    </div>
  );
};

export default NoMatch;
