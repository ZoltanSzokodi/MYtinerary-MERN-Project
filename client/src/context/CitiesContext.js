import React, { createContext, useState, useReducer, useEffect } from 'react'
import axios from 'axios'

export const citiesContext = createContext()

const initialState = {
  loading: true,
  cities: [],
  error: ''
}

const citiesReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        cities: action.payload,
        error: ''
      }
    case 'FETCH_FAILED':
      return {
        loading: false,
        cities: [],
        error: `Fetch failed - ${action.payload}`
      }
    default:
      return state
  }
}

const CitiesContext = ({ children }) => {
  const [state, dispatch] = useReducer(citiesReducer, initialState)
  const [filteredCities, setFilteredCities] = useState([])

  // --------------- GET ALL CITIES FROM DB ----------------
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cities/all')
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
    }
    fetchCities()
  }, [])

  // --------------- HANDLE SEARCH FILTER ----------------
  const handleFilter = event => {
    let allCities = []
    let filtered = []

    if (event.target.value !== '') {
      allCities = [...state.cities]
      filtered = allCities.filter(city => {
        const lc = city.name.toLowerCase()
        const filter = event.target.value.toLowerCase()

        return lc.includes(filter)
      })
    }
    else {
      filtered = [...state.cities]
    }
    setFilteredCities(filtered)
  }

  return (
    <citiesContext.Provider value={{ filteredCities, state, handleFilter }}>
      {children}
    </citiesContext.Provider >
  )
}

export default CitiesContext
