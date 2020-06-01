import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useForm from '../Common/useForm'
import { createAccount } from './service'
import { validateCreateAccount } from '../../helpers/UserFormValidationRules'
import { setLocalToken, determineLoginState } from '../../helpers/userHelpers'

const CreateAccount = ({ onLogin }) => {
	let history = useHistory()
	const [error, setError] = useState('')

	useEffect(() => {
		const checkLoginStatus = async () => {
			const loggedIn = await determineLoginState()
			if (loggedIn) history.push('/dashboard')
		}
		checkLoginStatus()
	}, [])

	const handleCreateAccount = async () => {
		try {
			const res = await createAccount(inputValues)
			onLogin(res.token)
			setLocalToken(res.token)
			history.push('/add')
		} catch (error) {
			setError(
				'Create Account failed. Your username is likely already taken. Please try again.'
			)
		}
	}

	const { inputValues, handleChange, handleSubmit, errors } = useForm(
		handleCreateAccount,
		validateCreateAccount
	)

	return (
		<section className='background'>
			<h1>Create an account</h1>
			{error && <h4 className='error-message'>{error}</h4>}
			<form onSubmit={handleSubmit}>
				<div className='row'>
					<div className='col s12 input-field'>
						<input
							id='name-input'
							autoComplete='off'
							name='name'
							className='validate'
							type='text'
							value={inputValues.name || ''}
							onChange={handleChange}
						/>
						<label htmlFor='name-input'>Full Name</label>
					</div>
				</div>
				<div className='row'>
					<div className='col s12 input-field'>
						<input
							id='username-input'
							autoComplete='off'
							name='username'
							className='validate'
							type='text'
							value={inputValues.username || ''}
							onChange={handleChange}
						/>
						<label htmlFor='username-input'>Username*</label>
						{errors.username && (
							<span
								className='helper-text red-text'
								data-error='wrong'
							>
								{errors.username}
							</span>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='col s12 input-field'>
						<input
							id='password-input'
							autoComplete='off'
							name='password'
							className='validate'
							type='password'
							value={inputValues.password || ''}
							onChange={handleChange}
						/>
						<label htmlFor='password-input'>Password*</label>
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
					<div className='col s12 input-field'>
						<input
							id='password2-input'
							autoComplete='off'
							name='password2'
							className='validate'
							type='password'
							value={inputValues.password2 || ''}
							onChange={handleChange}
						/>
						<label htmlFor='password2-input'>
							Re-enter Password*
						</label>
					</div>
				</div>
				<div className='row'>
					<button type='submit' className='btn'>
						Create Account
					</button>
				</div>
			</form>
			<div className='row'>
				<div className='col s12 info-message section'>
					Already have an account? <Link to='/login'>Log in.</Link>
				</div>
			</div>
		</section>
	)
}

export default CreateAccount
