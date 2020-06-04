import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useForm from '../Common/useForm'
import { login } from './service'
import { setLocalToken, determineLoginState } from '../../helpers/userHelpers'
import { validateLogin } from '../../helpers/UserFormValidationRules'

const Login = ({ onLogin }) => {
	let history = useHistory()
	const [error, setError] = useState('')

	const handleLogin = async () => {
		try {
			const loginCall = await login(inputValues)
			onLogin(loginCall.token)
			setLocalToken(loginCall.token)
			history.push('/dashboard')
		} catch (error) {
			setError('Login failed. Please try again.')
		}
	}

	useEffect(() => {
		const checkLoginStatus = async () => {
			const loggedIn = await determineLoginState()
			if (loggedIn) history.push('/dashboard')
		}
		checkLoginStatus()
	}, [])

	const { inputValues, handleChange, handleSubmit, errors } = useForm(
		handleLogin,
		validateLogin
	)

	return (
		<section className='background'>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				{error && <h4 className='error-message'>{error}</h4>}
				<div className='row'>
					<div className='col s12 input-field'>
						<input
							id='email-input'
							autoComplete='off'
							className='validate'
							type='text'
							name='email'
							value={inputValues.email || ''}
							onChange={handleChange}
						/>
						<label htmlFor='email-input'>Email</label>
						{errors.email && (
							<span
								className='helper-text red-text'
								data-error='wrong'
							>
								{errors.email}
							</span>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='col s12 input-field'>
						<input
							id='password-input'
							autoComplete='off'
							className='validate'
							type='password'
							name='password'
							value={inputValues.password || ''}
							onChange={handleChange}
						/>
						<label htmlFor='password-input'>Password</label>
						{errors.password && (
							<span
								className='helper-text red-text'
								data-error='wrong'
							>
								{errors.password}
							</span>
						)}
					</div>
				</div>
				<div className='row'>
					<button type='submit' className='btn'>
						Login
					</button>
				</div>
			</form>
		</section>
	)
}

export default Login
