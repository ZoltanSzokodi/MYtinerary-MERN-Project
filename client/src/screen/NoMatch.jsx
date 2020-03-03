import React from 'react';
import closed from '../static/404.png';

// MATERIAL UI ==========================================
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

      {/* <h1 className={classes.fourOfour}>ERROR #404</h1> */}
      <img className={classes.img} src={closed} alt="404" />
      <Typography variant="h3">
        404
      </Typography>
      <span className={classes.message}>Sorry this didn't work out for you Chief!</span>

    </div>
  );
};

export default NoMatch;
