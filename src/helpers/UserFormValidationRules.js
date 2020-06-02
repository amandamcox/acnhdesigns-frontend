export const validateLogin = formValues => {
	let errors = {}
	if (!formValues.username) {
		errors.username = 'Please enter your username'
	} else if (!formValues.password) {
		errors.password = 'Please enter your password'
	}
	return errors
}

export const validateCreateAccount = formValues => {
	let errors = {}
	if (!formValues.username) {
		errors.username = 'Please enter a username'
	} else if (formValues.username.length < 5) {
		errors.username = 'Usernames must be at least 5 characters long'
	} else if (/[^a-zA-Z0-9\s]/g.test(formValues.username)) {
		errors.username = 'Usernames can only contain letters and numbers'
	} else if (!formValues.password) {
		errors.password = 'Please enter a password'
	} else if (formValues.password.length < 8) {
		errors.password = 'Passwords must be at least 8 characters long'
	} else if (formValues.password !== formValues.password2) {
		errors.password = 'Passwords entered do not match'
	}
	return errors
}
