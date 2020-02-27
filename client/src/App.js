import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from './screen/Itineraries';

import HomeButton from './components/HomeButton';

import AuthContext from './context/AuthContext';
import CitiesContext from './context/CitiesContext';
import ItinerariesContext from './context/ItinerariesContext';
import CommentsContext from './context/CommentsContext';


const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth={'md'} disableGutters>
        <BrowserRouter>
          <Switch>
            <AuthContext>
              <Route exact path='/' component={Landing} />
              <CitiesContext>
                <Route exact path='/cities' component={Cities} />
                <ItinerariesContext>
                  <CommentsContext>
                    <Route exact path='/itineraries/:name' component={Itineraries} />
                  </CommentsContext>
                </ItinerariesContext>
              </CitiesContext>
            </AuthContext>
          </Switch>
          <HomeButton />
        </BrowserRouter>
      </Container>
    </Fragment >
  );
};

export default App;
