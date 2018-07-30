import React from 'react'
import { Router } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'

import Routes from 'react-static-routes'
import Navigation from './components/navigation';

injectGlobal`
  body {
  }
`

const App = () => (
	<Router>
		<div>
			<Navigation />
			<Routes />
		</div>
	</Router>
)

export default hot(module)(App)
