import React, { createContext, useContext, useReducer, useCallback, useState } from 'react';
import fetchDataReducer from './reducers/fetchDataReducer';
import axios from 'axios';

// CONTEXT ===========================================================
import { authContext } from '../context/AuthContext';

export const itineraiesContext = createContext();


// CONTEXT WRAPPER COMPONENT ==========================================
const ItinerariesContext = props => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  };
  const [allFavorites, setAllFavorites] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  const [itinerariesState, itinerariesDispatch] = useReducer(fetchDataReducer, initialState);

  const { authState } = useContext(authContext);

  // get all cities -------------------------------------------
  const fetchItineraries = useCallback(async name => {
    try {
      const response = await axios
        .get(`/api/itineraries/${name}`);

      setTimeout(() => {
        itinerariesDispatch({
          type: 'FETCH_SUCCESS',
          payload: response.data
        })
      }, 800);
    }
    catch (error) {
      setTimeout(() => {
        itinerariesDispatch({
          type: 'FETCH_FAILED',
          payload: error
        })
      }, 800);
    }
  }, []);

  // get all favs regardless of signed in user (to calculate likes for each itinerary) -----------------------------------------
  const fetchAllFavorites = useCallback(async () => {
    try {
      const response = await axios
        .get('/api/users/getAllFavs');

      setAllFavorites([response.data.favorites]);
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  // get user's favorites (to determin which itineraries are liked) -------------------------------------------
  const fetchUserFavorites = useCallback(async () => {
    try {
      const response = await axios
        .get('/api/users/getUserFavs',
          { headers: { 'Authorization': `bearer ${authState.token}` } });

      setUserFavorites(response.data.favoriteItineraries);
    }
    catch (error) {
      console.log(error);
    }
  }, [authState.token]);

  // patch function for liking or unliking (favorite/un-favorite) -------------------------
  // this function is passed into the handleToggleFav event handler
  // on every change it updates the user's favoriteItineraries[] on the back-end
  const patchUserFavorites = async array => {
    try {
      await axios
        .patch('/api/users/',
          {
            favoriteItineraries: array
          },
          { headers: { 'Authorization': `bearer ${authState.token}` } });
      fetchAllFavorites();
    }
    catch (error) {
      console.log(error.response);
    }
  };


  // RENDER =============================================================
  return (
    <itineraiesContext.Provider
      value={{
        itinerariesState,
        fetchItineraries,
        fetchAllFavorites,
        fetchUserFavorites,
        allFavorites,
        userFavorites,
        setUserFavorites,
        patchUserFavorites
      }}>
      {props.children}
    </itineraiesContext.Provider>
  );
};

export default ItinerariesContext;
