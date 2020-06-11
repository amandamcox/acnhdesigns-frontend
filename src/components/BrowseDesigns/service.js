import axios from 'axios'

export const getAllDesigns = async page => {
	try {
		const res = await axios.get(`/api/designs?page=${page}`)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const getFilteredDesigns = async (category, page) => {
	try {
		const res = await axios.get(
			`/api/designs?category=${category.toLowerCase()}&page=${page}`
		)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const getSearchDesigns = async (query, page) => {
	try {
		const res = await axios.get(
			`/api/designs/search?q=${query}&page=${page}`
		)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const rateDesign = async (id, vote) => {
	try {
		const res = await axios.post(`/api/designs/${id}/${vote}`)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}
