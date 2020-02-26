import React, { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';
import OpenSocket from 'socket.io-client';

// CONTEXT ===========================================================
import { itineraiesContext } from '../../context/ItinerariesContext';
import { authContext } from '../../context/AuthContext';

import { commentsContext } from '../../context/CommentsContext';


// MATERIAL UI =======================================================
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// COMPONENTS =======================================================
import Loader from '../../components/Loader';
import MenuAppbar from '../../components/MenuAppbar';
import ScrollTop from '../../components/ScrollTop';
import ItineraryCard from '../../components/ItineraryCard'


// STYLES ===========================================================
const useStyles = makeStyles(theme => ({
  outerGridRoot: {
    overflow: 'hidden',
  },
  innerGridRoot: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)

  },
}));


// COMPONENT ========================================================
const Itineraries = props => {
  const classes = useStyles();

  const { itinerariesState, fetchItineraries } = useContext(itineraiesContext);
  const { authState } = useContext(authContext);
  const { getComments } = useContext(commentsContext);


  const [favorites, setFavorites] = useState([]);
  const [socket, setSocket] = useState('');

  // open live connection between client and server for comments
  useEffect(() => {
    setSocket(OpenSocket('http://localhost:5000'));
    getComments();
  }, [])

  const cityName = props.match.params.name;
  const { itineraries } = itinerariesState.data;


  // fetch itineraries for the selected city -------------------
  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries]);

  // fetches favoriteItineraries[] for the logged in user when the component mounts
  // sets the favorites[] equal to favoriteItineraries[] on every page reload/re-render
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios
          .get('http://localhost:5000/api/users/getFavs',
            { headers: { 'Authorization': `bearer ${authState.token}` } });

        setFavorites(response.data.favoriteItineraries);
      }
      catch (error) {
        console.log(error);
      }
    }
    authState.isAuthenticated && fetchFavorites();
  }, [authState.token, authState.isAuthenticated]);


  // patch function for liking or unliking (favorite/un-favorite) -------------------------
  // this function is passed into the handleToggleFav event handler
  // on every change it updates the user's favoriteItineraries[] on the back-end
  const patchFavorites = async array => {
    try {
      await axios
        .patch('http://localhost:5000/api/users/',
          {
            favoriteItineraries: array
          },
          { headers: { 'Authorization': `bearer ${authState.token}` } })
    }
    catch (error) {
      console.log(error.response);
    }
  };

  // EVENT HANDLERS ===========================================

  // favorites --------------------------
  // toggles the favorites in the back-end with the patchFavorites()
  // updates favorites[] to show changes immediately on the front-end 
  // on page reload the favorites[] will be cleared BUT also immediately updated thanks to the fetchFavorites(), thus the changes are persistent 
  const handleToggleFav = event => {
    const itineraryId = event.target.value;
    let favsArray = [...favorites];

    if (favsArray.includes(itineraryId)) {
      // remove from favorites
      const index = favsArray.indexOf(itineraryId);
      favsArray.splice(index, 1);
      patchFavorites(favsArray)
      setFavorites(favsArray);
    }
    else {
      // add to favorites
      favsArray.push(itineraryId);
      patchFavorites(favsArray)
      setFavorites(favsArray);
    }
  };

  // console.log(favorites);

  // RENDER =======================================================
  return (
    <Grid container classes={{ root: classes.outerGridRoot }}>
      {itinerariesState.loading && <Loader />}
      {itinerariesState.error && itinerariesState.error}
      {!itinerariesState.loading && (
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
                    favorites={favorites}
                    handleToggleFav={handleToggleFav}
                    socket={socket}
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