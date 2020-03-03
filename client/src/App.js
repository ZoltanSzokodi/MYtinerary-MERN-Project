import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from './screen/Itineraries';
import Users from './screen/Users';
import NoMatch from './screen/NoMatch';

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
        <AuthContext>
          <CitiesContext>
            <ItinerariesContext>
              <CommentsContext>
                <BrowserRouter>
                  <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route path='/users' component={Users} />
                    <Route path='/cities' component={Cities} />
                    <Route path='/itineraries/:name' component={Itineraries} />
                    <Route component={NoMatch} />
                  </Switch>
                  <HomeButton />
                </BrowserRouter>
              </CommentsContext>
            </ItinerariesContext>
          </CitiesContext>
        </AuthContext>
      </Container>
    </Fragment >
  );
};

export default App;
