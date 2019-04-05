import React from 'react'
import propTypes from 'prop-types'

import './styles.css'

const AppContainer = ({ children }) => (
  <div className="appContainer">
    { children }
  </div>
)

AppContainer.propTypes = {
  children: propTypes.object
}

export default AppContainer