import React, { useEffect, useContext } from 'react'
import { itineraryContext } from '../context/ItineraryContext'

const Itinerary = (props) => {
  const cityName = props.match.params.name
  const { state, fetchItineraries } = useContext(itineraryContext)

  // console.log(state)

  useEffect(() => {
    fetchItineraries(cityName)
  }, [cityName, fetchItineraries])

  return (
    <div>
      {cityName}
    </div>
  )
}

export default Itinerary
