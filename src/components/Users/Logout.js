import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout = ({ onLogout }) => {
	let history = useHistory()

	useEffect(() => {
		window.localStorage.removeItem('cddblogin')
		onLogout()
		history.push('/')
	}, [history])

	return (
		<div>
			<h1>Logging out...</h1>
		</div>
	)
}

export default Logout
