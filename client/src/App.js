import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Landing from './screen/Landing';

import Users from './screen/users/Users';

import Cities from './screen/cities/Cities';
import CreateCity from './screen/cities/CreateCity';
import UpdateCity from './screen/cities/UpdateCity';

import Itineraries from './screen/itineraries/Itineraries';
import CreateItinerary from './screen/itineraries/CreateItinerary';
import UpdateItinerary from './screen/itineraries/UpdateItinerary';

import Signup from './screen/authentication/Signup';
import Login from './screen/authentication/Login';
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
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/users' component={Users} />
              <CitiesContext>
                <Route exact path='/cities' component={Cities} />
                <Route exact path='/createCity' component={CreateCity} />
                <Route exact path='/updateCity' component={UpdateCity} />
                <ItinerariesContext>
                  <CommentsContext>
                    <Route exact path='/itineraries/:name' component={Itineraries} />
                    <Route exact path='/createItinerary' component={CreateItinerary} />
                    <Route exact path='/updateItinerary' component={UpdateItinerary} />

                  </CommentsContext>
                </ItinerariesContext>
              </CitiesContext>
            </AuthContext>
          </Switch>
          <HomeButton />
        </BrowserRouter>
      </Container>
    </Fragment>
  );
};

export default App;
