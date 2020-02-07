import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import CitiesContext from './context/CitiesContext'
import ItineraryContext from './context/ItineraryContext'

import Landing from './screen/Landing'
import Cities from './screen/Cities'
import Itineraries from './screen/Itineraries'

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth={'md'} disableGutters>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <CitiesContext>
              <Route exact path='/cities' component={Cities} />
              <ItineraryContext>
                <Route exact path='/itineraries/:name' component={Itineraries} />
              </ItineraryContext>
            </CitiesContext>
          </Switch>
        </BrowserRouter>
      </Container>
    </Fragment>
  )
}

export default App
