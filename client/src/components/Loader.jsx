import React from 'react'
import Grow from '@material-ui/core/Grow'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to bottom, #ffffff 50%, #f2f1fb 75%)',
  },
  loader: {
    // width: '60px',
    // height: '60px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    // margin: '3em',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    '&:before, &:after': {
      // width: '100%',
      // height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      // top: 0,
      // left: 0,
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
      boxShadow: '5px -8px 0 rgba(255,100,100,0.8), 8px 5px 0 rgba(100,255,100,0.8),-3px 8px 0 rgba(100,100,255,0.8), -8px -5px 0 rgba(240, 240, 120, 0.9)',
    },
    // '&:after': {
    //   content: "''",
    //   border: '3px solid white',
    //   zIndex: 2,
    //   top: '-3px',
    //   left: '-3px',
    // },
  },
  '@keyframes loader-anim': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
}

const Loader = ({ classes }) => {
  return (
    <Grow in timeout={500}>
      <div className={classes.container}>
        <h2>Loading</h2>
        <div className={`${classes.loader} ${classes.loader9}`}></div>
      </div>
    </Grow>
  )
}

export default withStyles(styles)(Loader)
