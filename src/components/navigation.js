import React from 'react'
import { Link, withSiteData } from 'react-static'
import styled from 'styled-components'

const Nav = styled.nav`
	a {
		text-color: black;
	}
	a:not(.active) {
		text-decoration: none;
	}
	a:active {
		text-decoration: underline
	}
`

const Navigation = ({ navItems }) => (
	<Nav>
		{navItems.map((navItem) => (
			<Link
				key={navItem.id}
				exact
				to={navItem.path}
				activeClassName={'active'}
			>
				{navItem.label}
			</Link>
		))}
	</Nav>
)

export default withSiteData(Navigation)
