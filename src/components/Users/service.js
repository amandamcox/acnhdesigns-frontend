import axios from 'axios'

export const createAccount = async credentials => {
	try {
		const res = await axios.post('/api/users', credentials)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const login = async credentials => {
	try {
		const res = await axios.post('/api/users/login', credentials)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}
