import React, { useEffect, useContext } from 'react'
import { itineraryContext } from '../context/ItineraryContext'

const Itinerary = (props) => {
  const cityName = props.match.params.id
  const { state, fetchItineraries } = useContext(itineraryContext)

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/cities/${cityName}`)
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries])

  return (
    <div>
      I am the Itinerary
    </div>
  )
}

export default Itinerary
