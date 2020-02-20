import React, { useEffect, useState, useContext, Fragment } from 'react';
import { itineraiesContext } from '../../context/ItinerariesContext';
import { authContext } from '../../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Loader from '../../components/Loader';
import MenuAppbar from '../../components/MenuAppbar';
import ScrollTop from '../../components/ScrollTop';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ItineraryCard from '../../components/ItineraryCard'
import axios from 'axios';

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
  const { itinerariesState, fetchItineraries } = useContext(itineraiesContext);
  const { authState, authDispatch } = useContext(authContext);
  const [favorites, setFavorites] = useState([]);

  const { itineraries } = itinerariesState.data;
  // console.log(authState);


  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries]);

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
  }, [authState.token]);


  const patchFavorites = async array => {
    try {
      const response = await axios
        .patch('http://localhost:5000/api/users/',
          {
            favoriteItineraries: array
          },
          { headers: { 'Authorization': `bearer ${authState.token}` } })
      console.log(response)
    }
    catch (error) {
      console.log(error.response);
    }
  }
  // patchFavorites()


  const handleToggleFav = e => {
    const itineraryId = e.target.value;
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

  console.log(favorites);

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
