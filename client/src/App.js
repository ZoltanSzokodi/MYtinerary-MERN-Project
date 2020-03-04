import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// STATIC =============================================
import lightWool from './static/light_wool.png';

// MATERIAL UI ========================================
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

// SCREENS ============================================
import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from './screen/Itineraries';
import Users from './screen/Users';
import NoMatch from './screen/NoMatch';

// COMPONENTS =========================================
import HomeButton from './components/HomeButton';

// CONTEXT ============================================
import AuthContext from './context/AuthContext';
import CitiesContext from './context/CitiesContext';
import ItinerariesContext from './context/ItinerariesContext';
import CommentsContext from './context/CommentsContext';


const App = () => {
  return (

    <div style={{ backgroundImage: `url(${lightWool})` }}>
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
    </div >
  );
};

export default App;
