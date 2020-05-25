import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = ({ isLoggedIn, classes, id }) => {
	return (
		<ul className={classes} id={id}>
			<li>
				<NavLink to='/'>Home</NavLink>
			</li>
			{isLoggedIn ? (
				<React.Fragment>
					<li>
						<NavLink to='/add'>Add Design</NavLink>
					</li>
					<li>
						<NavLink to='/dashboard'>Manage Designs</NavLink>
					</li>
					<li>
						<NavLink
							to='/logout'
							className='waves-effect waves-light btn'
						>
							Logout
						</NavLink>
					</li>
				</React.Fragment>
			) : (
				<React.Fragment>
					<li>
						<NavLink
							to='/login'
							className='waves-effect waves-light btn'
						>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/createaccount'
							className='waves-effect waves-light btn purple darken-2'
						>
							Create Account
						</NavLink>
					</li>
				</React.Fragment>
			)}
		</ul>
	)
}

export default Navigation
