import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import BrowseDesigns from '../BrowseDesigns'
import ManageDesigns from '../ManageDesigns'
import AddDesignForm from '../AddDesign'
import Login from '../Users/Login'
import Logout from '../Users/Logout'
import CreateAccount from '../Users/CreateAccount'
import './App.css'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [loginToken, setLoginToken] = useState('')

	const onLogin = token => {
		setIsLoggedIn(true)
		setLoginToken(token)
	}

	const onLogout = () => {
		setIsLoggedIn(false)
		setLoginToken('')
	}

	useEffect(() => {
		const token = JSON.parse(window.localStorage.getItem('cddblogin'))
		if (token) {
			setLoginToken(token)
			setIsLoggedIn(true)
		}
	}, [])

	return (
		<div>
			<Router>
				<header>
					<nav>
						<div className='nav-wrapper'>
							<Link to='/' className='brand-logo'>
								CDDB
							</Link>
							<a
								href='#'
								data-target='mobile-menu'
								className='sidenav-trigger'
							>
								<i className='material-icons'>menu</i>
							</a>
							<Navigation
								isLoggedIn={isLoggedIn}
								classes='right hide-on-med-and-down'
								id='desktop-menu'
							/>
							<Navigation
								isLoggedIn={isLoggedIn}
								classes='sidenav'
								id='mobile-menu'
							/>
						</div>
					</nav>
				</header>
				<div className='container'>
					<Switch>
						<Route path='/add'>
							<AddDesignForm token={loginToken} />
						</Route>
						<Route path='/dashboard'>
							<ManageDesigns />
						</Route>
						<Route path='/login'>
							<Login onLogin={onLogin} />
						</Route>
						<Route path='/createaccount'>
							<CreateAccount onLogin={onLogin} />
						</Route>
						<Route path='/logout'>
							<Logout onLogout={onLogout} />
						</Route>
						<Route exact path='/'>
							<BrowseDesigns />
						</Route>
					</Switch>
				</div>
				<footer className='page-footer'>
					<div className='container'>
						<div className='row'>
							<div className='col l6 s12'>
								<h5 className='white-text'>Like CDDB?</h5>
								<p className='grey-text text-lighten-4'>
									Support us by donating towards site
									maintenance costs!
								</p>
							</div>
							<div className='col l4 offset-l2 s12'>
								<h5 className='white-text'>Links</h5>
								<ul>
									<li>Browse Custom Designs</li>
									<li>Add New Custom Design</li>
									<li>Manage Your Custom Designs</li>
									<li>Contact Us</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='footer-copyright'>
						<div className='container'>
							© 2020 Custom Design Database (CDDB)
							<p className='grey-text text-lighten-4 right'>
								This website has no affiliation with Nintendo or
								Animal Crossing.
							</p>
						</div>
					</div>
				</footer>
			</Router>
		</div>
	)
}

export default App
