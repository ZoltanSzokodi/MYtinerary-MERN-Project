import React from 'react';

// MATERIAL UI ==================================================
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';


// STYLES =======================================================
const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));


// COMPONENT ====================================================
const ScrollTop = props => {
  const classes = useStyles();

  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  // EVENT HANDLERS ============================================
  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };


  // RENDER ====================================================
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick}
        role="presentation"
        className={classes.root}
      >
        {children}
      </div>
    </Zoom>
  );
};

export default ScrollTop;
