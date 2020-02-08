import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from './screen/Itineraries';
import CreateAccount from './screen/CreateAccount';
import Login from './screen/Login';

import CitiesContext from './context/CitiesContext';
import ItinerariesContext from './context/ItinerariesContext';


const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth={'md'} disableGutters>

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/createAccount' component={CreateAccount} />
            <Route exact path='/login' component={Login} />
            <CitiesContext>
              <Route exact path='/cities' component={Cities} />
              <ItinerariesContext>
                <Route exact path='/itineraries/:name' component={Itineraries} />
              </ItinerariesContext>
            </CitiesContext>
          </Switch>
        </BrowserRouter>

      </Container>
    </Fragment>
  );
};

export default App;
