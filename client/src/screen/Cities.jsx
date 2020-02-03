import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Loader from '../components/Loader'
import MenuAppBar from '../components/MenuAppBar'
import CityCard from '../components/CityCard'

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
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cities/all')
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
      }
      catch (err) {
        setTimeout(() => {
          dispatch(
            {
              type: 'FETCH_FAILED',
              payload: err.message
            }
          )
        }, 1000)
      }
    }
    fetchCities()
  }, [])

  const handleFilter = event => {
    let allCities = []
    let filteredCities = []

    if (event.target.value !== '') {
      allCities = [...data.cities]
      filteredCities = allCities.filter(city => {
        const lc = city.name.toLowerCase()
        const filter = event.target.value.toLowerCase()

        return lc.includes(filter)
      })
    }
    else {
      filteredCities = [...data.cities]
    }
    setCities(filteredCities)
  }

  return (
    <Grid container>
      {data.loading && <Loader />}
      {!data.loading && <MenuAppBar handleFilter={handleFilter} />}
      {!data.loading && (
        <Grid item container spacing={2}>
          {cities.map(city => (
            <Grid item container justify='center' key={city._id}>
              <CityCard
                key={city._id}
                name={city.name}
                country={city.country}
                img={city.img}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {data.error && data.error}
    </Grid>
  )
}

export default Cities