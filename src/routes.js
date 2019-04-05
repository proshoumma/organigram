import React from 'react'
import { Router, hashHistory } from 'react-router'

import AppContainer from './Components/AppContainer'
import HomeView from './Views/Home'

/**
 * route mapping with code splitting
 * to only load necessery javascript code for
 * a perticular screen when it loads in the browser :-)
 */
const routeMappings = {
  component: AppContainer,
  path: '/',
  indexRoute: {
    component: HomeView
  },
  childRoutes: [
    {
      path: 'organigram_view',
      getComponent(location, cb) {
        // async call for loading the view
        System.import('./Views/Organigram').then(
          module => cb(null, module.default)
        )
      }
    },
    {
      path: '*',
      getComponent(location, cb) {
        // async call for loading the view
        System.import('./Views/NotFound').then(
          module => cb(null, module.default)
        )
      }
    }
  ]
}

// main router component with hashHistory
const Routes = () => (
  <Router
    history={hashHistory}
    routes={routeMappings}
  />
)

export default Routes