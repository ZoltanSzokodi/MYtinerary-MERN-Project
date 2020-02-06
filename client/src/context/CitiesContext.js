import React, { createContext, useState, useReducer, useCallback } from 'react'
import { ajaxReducer } from './reducers'
import axios from 'axios'

export const citiesContext = createContext()

const CitiesContext = ({ children }) => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  }
  const [state, dispatch] = useReducer(ajaxReducer, initialState)
  const [filteredCities, setFilteredCities] = useState([])

  // --------------- GET ALL CITIES FROM DB ----------------
  const fetchCities = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:5000/cities/')
      console.log(res.data)

      setTimeout(() => {
        setFilteredCities(res.data)
        dispatch(
          {
            type: 'FETCH_SUCCESS',
            payload: res.data
          }
        )
      }, 800)
    }
    catch (err) {
      setTimeout(() => {
        dispatch(
          {
            type: 'FETCH_FAILED',
            payload: err.message
          }
        )
      }, 800)
    }
  }, [])

  // --------------- HANDLE SEARCH FILTER ----------------
  const handleFilter = event => {
    let allCities = []
    let filtered = []

    if (event.target.value !== '') {
      allCities = [...state.data]
      filtered = allCities.filter(city => {
        const lc = city.name.toLowerCase()
        const filter = event.target.value.toLowerCase()

        return lc.includes(filter)
      })
    }
    else {
      filtered = [...state.data]
    }
    setFilteredCities(filtered)
  }

  return (
    <citiesContext.Provider value={{ state, fetchCities, filteredCities, handleFilter }}>
      {children}
    </citiesContext.Provider >
  )
}

export default CitiesContext
