import React from 'react';
import { Link } from 'react-router-dom';

// MATERIAL UI ==============================================
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import HomeIcon from '@material-ui/icons/Home';


// STYLES ===================================================
const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: '50%',
    transform: 'translate(50%)'
  },
}));


// COMPONENT ==================================================
const HomeButton = () => {
  const classes = useStyles();


  // RENDER ===================================================
  return (
    <div className={classes.root}>
      <Link to='/'>
        <Fab color="primary" aria-label="home">
          <HomeIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default HomeButton;