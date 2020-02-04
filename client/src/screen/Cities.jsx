import React, { useEffect, useContext } from 'react'
import { citiesContext } from '../context/CitiesContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow';
import Loader from '../components/Loader'
import MenuAppBar from '../components/MenuAppBar'
import CityCard from '../components/CityCard'

const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(to bottom, #ffffff 50%, #f2f1fb 75%)'
  },
  innerGridRoot: {
    marginTop: theme.spacing(2)
  }
}))

const Cities = () => {
  const classes = useStyles();
  const { state, fetchCities, filteredCities } = useContext(citiesContext)

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {state.loading && <Loader />}
      {state.error && state.error}
      {!state.loading && <MenuAppBar />}
      {!state.loading && (
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
        </Grow>)}
    </Grid>
  )
}

export default Cities