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
							<ManageDesigns token={loginToken} />
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
					<div className='footer-copyright'>
						<div className='container row'>
							<div className='col s6'>
								© {new Date().getFullYear()} Custom Design
								Database (CDDB)
							</div>
							<div className='col s6'>
								<span className='grey-text text-lighten-4'>
									This website is fan-made and has no
									affiliation with Nintendo or Animal
									Crossing.
								</span>
							</div>
						</div>
					</div>
				</footer>
			</Router>
		</div>
	)
}

export default App
