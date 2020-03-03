import React, { useEffect, useContext, Fragment } from 'react';

// CONTEXT ===============================================
import { citiesContext } from '../context/CitiesContext';

// MATERIAL UI ===========================================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// COMPONENTS ============================================
import Loader from '../components/Loader';
import MenuAppbar from '../components/MenuAppbar';
import CityCard from '../components/CityCard';
import ScrollTop from '../components/ScrollTop';


// STYLES =================================================
const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
  },
  innerGridRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
}));


// COMPONENT =====================================================
const Cities = props => {
  const classes = useStyles();
  const { citiesState, fetchCities, filteredCities } = useContext(citiesContext);

  useEffect(() => {
    fetchCities()
  }, [fetchCities]);


  // RENDER ======================================================
  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {citiesState.loading && <Loader />}
      {citiesState.error && citiesState.error}
      {!citiesState.loading && (
        <Fragment>
          <MenuAppbar type="cities" />
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
                    city={city}
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