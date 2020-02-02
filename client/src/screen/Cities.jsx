import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

import Loader from '../components/Loader'
import MenuAppBar from '../components/MenuAppBar'

/*
----------------- IMPORTANT -----------------
After fetching all the cities useReducer is used to set the initial data!
  -> loading, cities and error
  -> these props are in the data object
  -> there is a cities state which is the copy of the data.cities array and thus is mutable via setCities
     for filtering purposes. This cities array is used to render the cities list
*/

const initialData = {
  loading: true,
  cities: [],
  error: ''
}

const reducer = (data, action) => {
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
      return data
  }
}

const Cities = () => {
  const [data, dispatch] = useReducer(reducer, initialData)
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/cities/all')
      .then(res => {
        console.log(res.data)
        setTimeout(() => {
          setCities(res.data)
          dispatch(
            {
              type: 'FETCH_SUCCESS',
              payload: res.data
            }
          )
        }, 1000)
      })
      .catch(err => {
        setTimeout(() => {
          dispatch(
            {
              type: 'FETCH_FAILED',
              payload: err.message
            }
          )
        }, 1000)
      })
  }, [])

  const handleFilter = event => {
    const allCities = [...data.cities]
    const filteredCities = allCities.filter(city => (
      city.name.indexOf(event.target.value.toLowerCase()) !== -1
    ))
    setCities(filteredCities)
  }

  return (
    <div>
      {data.loading && <Loader />}
      {!data.loading && <MenuAppBar handleFilter={handleFilter} />}
      {!data.loading && cities.map(city => <h4 key={city._id}>{city.name}</h4>)}
      {data.error && data.error}
    </div>
  )
}

export default Cities
