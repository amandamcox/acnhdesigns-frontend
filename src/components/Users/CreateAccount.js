import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createAccount } from './service'

const CreateAccount = ({ onLogin }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState('')

	let history = useHistory()

	useEffect(() => {
		const token = window.localStorage.getItem('cddblogin')
		if (token) {
			history.push('/dashboard')
		}
	}, [history])

	const validateFields = () => {
		if (!username) {
			handleError('Please fill in the username field.')
			return false
		} else if (!password) {
			handleError('Please fill in the password fields.')
			return false
		} else if (password !== password2) {
			handleError('Your passwords must match!')
			return false
		}
		return true
	}

	const handleCreateAccount = async event => {
		event.preventDefault()
		try {
			if (validateFields()) {
				const createAcctRes = await createAccount({
					username,
					password,
					name,
				})
				onLogin(createAcctRes.token)
				window.localStorage.setItem(
					'cddblogin',
					JSON.stringify(createAcctRes.token)
				)
				setName('')
				setUsername('')
				setPassword('')
				setPassword2('')
				history.push('/add')
			}
		} catch (error) {
			handleError(
				"The username you've chosen is already taken. Please choose another."
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
			<h1>Create an account</h1>
			{error && <h4 className='error-message'>{error}</h4>}
			<form onSubmit={handleCreateAccount}>
				<div className='row'>
					<label htmlFor='name-input' className='custom-label'>
						Full Name
					</label>
					<input
						id='name-input'
						className='col s12 input-field'
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</div>
				<div className='row'>
					<label htmlFor='username-input' className='custom-label'>
						Username*
					</label>
					<input
						id='username-input'
						className='col s12 input-field'
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div className='row'>
					<label htmlFor='password-input' className='custom-label'>
						Password*
					</label>
					<input
						id='password-input'
						className='col s12 input-field'
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<div className='row'>
					<label htmlFor='password2-input' className='custom-label'>
						Verify Password*
					</label>
					<input
						id='password2-input'
						className='col s12 input-field'
						type='password'
						value={password2}
						onChange={e => setPassword2(e.target.value)}
					/>
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
		</article>
	)
}

export default CreateAccount
