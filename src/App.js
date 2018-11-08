import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import Main from './pages/main'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
               <Route path='/:id' component={Main} />
               <Route exact path="/" component={Main} />
          </Switch>
        </Router>
      </main>
    )
  }
}

export default App;
