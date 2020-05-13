import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from './service'

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [error, setError] = useState('')

	let history = useHistory()

	useEffect(() => {
		const token = window.localStorage.getItem('cddblogin')
		if (token || isLoggedIn) {
			setIsLoggedIn(true)
			history.push('/dashboard')
		}
	}, [isLoggedIn, history])

	const handleLogin = async event => {
		event.preventDefault()
		try {
			const loginCall = await login({ username, password })
			onLogin(loginCall.token)
			window.localStorage.setItem(
				'cddblogin',
				JSON.stringify(loginCall.token)
			)
			setUsername('')
			setPassword('')
			setIsLoggedIn(true)
		} catch (error) {
			handleError(
				'Login failed. Please check your username and/or password for accuracy.'
			)
		}
	}

	const handleError = message => {
		setError(message)
		setTimeout(() => {
			setError('')
		}, 8000)
	}

	return (
		<article className='background'>
			<form onSubmit={handleLogin}>
				<h1>Login</h1>
				{error && <h4 className='error-message'>{error}</h4>}
				<div className='row'>
					<label htmlFor='username-input'>Username:</label>
					<input
						id='username-input'
						className='col s12 input-field'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='row'>
					<label htmlFor='password-input'>Password:</label>
					<input
						id='password-input'
						className='col s12 input-field'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='row'>
					<button type='submit' className='btn'>
						Login
					</button>
				</div>
			</form>
		</article>
	)
}

export default Login
