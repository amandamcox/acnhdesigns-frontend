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

export const deleteUserDesign = async designId => {
	try {
		const res = await axios.delete(`/api/designs/${designId}`)
		if (res.status === 204) return true
	} catch (error) {
		throw Error(error)
	}
}
