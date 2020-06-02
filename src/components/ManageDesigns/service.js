import axios from 'axios'

export const getUserDesigns = async token => {
	try {
		const headers = {
			headers: {
				Authorization: `bearer ${token}`,
			},
		}
		const res = await axios.get('/api/designs/user', headers)
		return res.data.designs
	} catch (error) {
		throw Error(error)
	}
}
