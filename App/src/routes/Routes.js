import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {
  Login,
  App,
  Test,
  Dashboard
} from '../_Views';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/Auth' component={Login} />
      <Route exact path='/Auth/:screen' component={Login} />
      <App>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/:page' component={Test} />
        </Switch>
      </App>
    </Switch>
  </BrowserRouter>
)

export default Routes
