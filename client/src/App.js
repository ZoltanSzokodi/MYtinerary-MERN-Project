import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container';

import Landing from './screen/Landing'
import Cities from './screen/Cities'

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth={'sm'} disableGutters>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
          </Switch>
        </BrowserRouter>
      </Container>
    </Fragment>
  )
}

export default App
