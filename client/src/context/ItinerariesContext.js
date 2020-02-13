import React, { createContext, useReducer, useCallback } from 'react';
import ajaxReducer from './reducers/ajaxReducer';
import axios from 'axios';

export const itineraiesContext = createContext();

const ItinerariesContext = props => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  };
  const [state, dispatch] = useReducer(ajaxReducer, initialState);

  // GET ALL CITIES FROM DB =====================================
  const fetchItineraries = useCallback(async name => {
    try {
      const res = await axios.get(`http://localhost:5000/api/itineraries/${name}`);
      console.log(res.data);

      setTimeout(() => {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: res.data
        })
      }, 800);
    }
    catch (err) {
      setTimeout(() => {
        dispatch({
          type: 'FETCH_FAILED',
          payload: err
        })
      }, 800);
    }
  }, []);

  return (
    <itineraiesContext.Provider value={{ state, fetchItineraries }}>
      {props.children}
    </itineraiesContext.Provider>
  );
};

export default ItinerariesContext;
