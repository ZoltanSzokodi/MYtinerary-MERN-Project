import React, { createContext, useReducer, useCallback } from 'react'
import { ajaxReducer } from './reducers'
import axios from 'axios'

export const itineraryContext = createContext()

const ItineraryContext = props => {
  const initialState = {
    loading: true,
    data: [],
    error: ''
  }
  const [state, dispatch] = useReducer(ajaxReducer, initialState)

  // --------------- GET ALL CITIES FROM DB ----------------
  const fetchItineraries = useCallback(async name => {
    try {
      const res = await axios.get(`http://localhost:5000/itineraries/${name}`)
      console.log(res.data)

      setTimeout(() => {
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

  return (
    <itineraryContext.Provider value={{ state, fetchItineraries }}>
      {props.children}
    </itineraryContext.Provider>
  )
}

export default ItineraryContext
