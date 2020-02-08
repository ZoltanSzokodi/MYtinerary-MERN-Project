import React, { useEffect, useContext, Fragment } from 'react';
import { citiesContext } from '../context/CitiesContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Loader from '../components/Loader';
import MenuAppbar from '../components/MenuAppbar';
import CityCard from '../components/CityCard';
import ScrollTop from '../components/ScrollTop';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
  },
  innerGridRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
}));

const Cities = props => {
  const classes = useStyles();
  const { state, fetchCities, filteredCities } = useContext(citiesContext);

  useEffect(() => {
    fetchCities()
  }, [fetchCities]);

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
  );
};

export default Cities;