import React, { createContext, useState, useReducer, useCallback } from 'react';
import ajaxReducer from './reducers/ajaxReducer';
import axios from 'axios';

export const citiesContext = createContext();

const CitiesContext = ({ children }) => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  };
  const [citiesState, citiesDispatch] = useReducer(ajaxReducer, initialState);
  const [filteredCities, setFilteredCities] = useState([]);

  // GET ALL CITIES FROM DB ======================================
  const fetchCities = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cities/all');
      console.log(res.data);

      setTimeout(() => {
        setFilteredCities(res.data.cities)
        citiesDispatch({
          type: 'FETCH_SUCCESS',
          payload: res.data
        })
      }, 800);
    }
    catch (error) {
      setTimeout(() => {
        citiesDispatch({
          type: 'FETCH_FAILED',
          payload: error
        })
      }, 800);
    }
  }, []);

  // HANDLE SEARCH FILTER ==================================
  const handleFilter = event => {
    let allCities = [];
    let filtered = [];

    if (event.target.value !== '') {
      allCities = [...citiesState.data.cities];
      filtered = allCities.filter(city => {
        const lc = city.name.toLowerCase();
        const filter = event.target.value.toLowerCase();

        return lc.includes(filter);
      })
    }
    else {
      filtered = [...citiesState.data.cities];
    }
    setFilteredCities(filtered);
  };

  return (
    <citiesContext.Provider value={{ citiesState, fetchCities, filteredCities, handleFilter }}>
      {children}
    </citiesContext.Provider >
  );
};

export default CitiesContext;
