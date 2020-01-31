import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

import Loader from '../components/Loader'

const initialState = {
  loading: true,
  cities: [],
  error: ''
}

const reducer = (state, action) => {
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

const Cities = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get('http://localhost:5000/cities/all')
      .then(res => {
        console.log(res.data)
        dispatch(
          {
            type: 'FETCH_SUCCESS',
            payload: res.data
          }
        )
      })
      .catch(err => {
        dispatch(
          {
            type: 'FETCH_FAILED',
            payload: err.message
          }
        )
      })
  }, [])

  return (
    <div>
      <Loader />
      {/* {state.loading ? <Loader /> : state.cities.map(city => (
        <h4 key={city._id}>{city.name}</h4>
      ))}
      {state.error && state.error} */}
    </div>
  )
}

export default Cities
