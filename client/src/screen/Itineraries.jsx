import React, { useEffect, useContext, Fragment } from 'react';

// CONTEXT ===========================================================
import { itineraiesContext } from '../context/ItinerariesContext';
import { authContext } from '../context/AuthContext';
import { commentsContext } from '../context/CommentsContext';

// MATERIAL UI =======================================================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// COMPONENTS =======================================================
import Loader from '../components/Loader';
import MenuAppbar from '../components/MenuAppbar';
import ScrollTop from '../components/ScrollTop';
import ItineraryCard from '../components/ItineraryCard';
import PostItineraryDialog from './PostItineraryDialog';
import NoMatch from './NoMatch';


// STYLES ===========================================================
const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
  },
  innerGridRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)

  },
}));


// COMPONENT ========================================================
const Itineraries = props => {
  const classes = useStyles();

  const {
    itinerariesState,
    fetchItineraries,
    fetchAllFavorites,
    fetchUserFavorites,
    allFavorites,
    userFavorites,
    setUserFavorites,
    patchUserFavorites } = useContext(itineraiesContext);
  const { authState } = useContext(authContext);
  const { getComments } = useContext(commentsContext);

  const cityName = props.match.params.name;
  const { itineraries } = itinerariesState.data;

  // fetch itineraries for the selected city -------------------
  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries]);

  // get all comments --------------------------------------------
  useEffect(() => {
    getComments();
  }, [getComments])

  // fetches favoriteItineraries[] for the logged in user when the component mounts
  // sets the userFavorites[] equal to favoriteItineraries[] on every page reload/re-render
  useEffect(() => {
    authState.isAuthenticated && fetchUserFavorites();
  }, [authState.token, authState.isAuthenticated, fetchUserFavorites]);

  useEffect(() => {
    fetchAllFavorites();
  }, [fetchAllFavorites]);


  // EVENT HANDLERS ===========================================

  // userFavorites --------------------------
  // toggles the userFavorites in the back-end with the patchUserFavorites()
  // updates userFavorites[] to show changes immediately on the front-end 
  // on page reload the userFavorites[] will be cleared BUT also immediately updated thanks to the fetchUserFavorites(), thus the changes are persistent 
  const handleToggleFav = event => {
    const itineraryId = event.target.value;
    let favsArray = [...userFavorites];

    // get request with itinerary id to a route controller on the server witch sums up the likes

    if (favsArray.includes(itineraryId)) {
      // remove from userFavorites
      const index = favsArray.indexOf(itineraryId);
      favsArray.splice(index, 1);
      patchUserFavorites(favsArray)
      setUserFavorites(favsArray);
    }
    else {
      // add to favorites
      favsArray.push(itineraryId);
      patchUserFavorites(favsArray)
      setUserFavorites(favsArray);
    }
  };


  // RENDER =======================================================
  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {itinerariesState.loading && <Loader />}
      {itinerariesState.error && <div><NoMatch /></div>}
      {(!itinerariesState.loading && itinerariesState.error === '') && (
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
              {itineraries.map(itinerary => (
                <Grid item container justify='center' key={itinerary._id}>
                  <ItineraryCard
                    key={itinerary._id}
                    itinerary={itinerary}
                    userFavorites={userFavorites}
                    allFavorites={allFavorites}
                    handleToggleFav={handleToggleFav}
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
          <PostItineraryDialog cityName={cityName} />
        </Fragment>
      )}
    </Grid>
  );
};

export default Itineraries;