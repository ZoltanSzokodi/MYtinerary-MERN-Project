import React, { useEffect, useContext, Fragment } from 'react'
import { citiesContext } from '../context/CitiesContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow';
import Loader from '../components/Loader'
import MenuAppbar from '../components/MenuAppbar'
import CityCard from '../components/CityCard'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(to bottom, #ffffff 50%, #f2f1fb 75%)'
  },
  innerGridRoot: {
    marginTop: theme.spacing(2)
  },
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const ScrollTop = props => {
  const { children, window } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

const Cities = props => {
  const classes = useStyles();
  const { state, fetchCities, filteredCities } = useContext(citiesContext)

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {state.loading && <Loader />}
      {state.error && state.error}
      {!state.loading && (
        <Fragment>
          <MenuAppbar />
          <Toolbar id="back-to-top-anchor" />
          <Grow in timeout={500}>
            <Grid
              item
              container
              spacing={2}
              classes={{ root: classes.innerGridRoot }}
            >
              {filteredCities.map(city => (
                <Grid item container justify='center' key={city._id}>
                  <CityCard
                    key={city._id}
                    img={city.img}
                    name={city.name}
                    country={city.country}
                    description={city.description}
                  />
                </Grid>))}
            </Grid>
          </Grow>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Fragment>
      )}
    </Grid>
  )
}

export default Cities