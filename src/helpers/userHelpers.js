export const getLocalToken = () => {
	const localToken = window.localStorage.getItem('cddblogin')
	if (!localToken) return false
	return localToken
}

export const setLocalToken = token => {
	window.localStorage.setItem('cddblogin', JSON.stringify(token))
}

export const determineLoginState = async () => {
	const token = await getLocalToken()
	if (token) return true
	return false
}
