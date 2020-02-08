import React, { useEffect, useContext, Fragment } from 'react';
import { itineraiesContext } from '../context/ItinerariesContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Loader from '../components/Loader';
import MenuAppbar from '../components/MenuAppbar';
import ScrollTop from '../components/ScrollTop';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ItineraryCard from '../components/ItineraryCard'

const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
  },
  innerGridRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)

  },
}));

const Itineraries = props => {
  const classes = useStyles();

  const cityName = props.match.params.name;
  const { state, fetchItineraries } = useContext(itineraiesContext);

  console.log(state.data.itineraries);

  const { itineraries } = state.data;

  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries]);

  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {state.loading && <Loader />}
      {state.error && state.error}
      {!state.loading && (
        <Fragment>
          <MenuAppbar type="itineraries" />
          <Toolbar id="back-to-top-anchor" />
          <Grow in timeout={500}>
            <Grid
              item
              container
              spacing={2}
              classes={{ root: classes.innerGridRoot }}
            >
              {itineraries.map(itinerary => (
                <Grid item container justify='center' key={itinerary._id}>
                  <ItineraryCard
                    key={itinerary._id}
                    itinerary={itinerary}
                  // title={itinerary.title}
                  // description={itinerary.description}
                  // pictireURL={itinerary.pictireURL}
                  // duration={itinerary.duration}
                  // price={itinerary.price}
                  // tourGuide={itinerary.tourGuide}
                  // hashTags={itinerary.hashTags}
                  />
                </Grid>
              ))}
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

export default Itineraries;
