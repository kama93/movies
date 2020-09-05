import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Navigation from './components/navigation/navigation.component.jsx';
import Homepage from './pages/homepage/homepage.jsx';
import Like from './components/like/like.jsx';
import SignInUp from './pages/signIn-page/signIn.jsx';
import Joker from './components/joker/joker.jsx';
import Genre from './pages/display.genre/genre';

import './app.css'

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/signin' component={SignInUp} />)}/>
            <Route path='/genre/:id' component={Genre} />)}/>
            <Route exact path='/joker' component={Joker} />)}/>
            <Route exact path='/like' component={Like} />)}/>
        </Switch>

    </div>
  );
}

export default App;
