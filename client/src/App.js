import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import CitiesContext from './context/CitiesContext'
import Landing from './screen/Landing'
import Cities from './screen/Cities'

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
            <Route exact path='/cities'>
              <CitiesContext>
                <Cities />
              </CitiesContext>
            </Route>
          </Switch>
        </BrowserRouter>
      </Container>
    </Fragment>
  )
}

export default App
