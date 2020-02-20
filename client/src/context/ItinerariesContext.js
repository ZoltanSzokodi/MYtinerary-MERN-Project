import React, { createContext, useReducer, useCallback } from 'react';
import fetchDataReducer from './reducers/fetchDataReducer';
import axios from 'axios';

export const itineraiesContext = createContext();


// CONTEXT WRAPPER COMPONENT ==========================================
const ItinerariesContext = props => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  };

  const [itinerariesState, itinerariesDispatch] = useReducer(fetchDataReducer, initialState);


  // GET ALL CITIES FROM DB ============================================
  const fetchItineraries = useCallback(async name => {
    try {
      const res = await axios.get(`http://localhost:5000/api/itineraries/${name}`);
      // console.log(res.data);

      setTimeout(() => {
        itinerariesDispatch({
          type: 'FETCH_SUCCESS',
          payload: res.data
        })
      }, 800);
    }
    catch (err) {
      setTimeout(() => {
        itinerariesDispatch({
          type: 'FETCH_FAILED',
          payload: err
        })
      }, 800);
    }
  }, []);


  // RENDER =============================================================
  return (
    <itineraiesContext.Provider value={{ itinerariesState, fetchItineraries }}>
      {props.children}
    </itineraiesContext.Provider>
  );
};

export default ItinerariesContext;
