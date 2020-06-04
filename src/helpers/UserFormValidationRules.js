export const validateLogin = formValues => {
	let errors = {}
	if (!formValues.email) {
		errors.email = 'Please enter your email'
	} else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
		errors.email = 'Email address is invalid'
	} else if (!formValues.password) {
		errors.password = 'Please enter your password'
	}
	return errors
}

export const validateCreateAccount = formValues => {
	let errors = {}
	if (!formValues.email) {
		errors.email = 'Please enter a email'
	} else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
		errors.email = 'Email address is invalid'
	} else if (!formValues.password) {
		errors.password = 'Please enter a password'
	} else if (formValues.password.length < 8) {
		errors.password = 'Passwords must be at least 8 characters long'
	} else if (formValues.password !== formValues.password2) {
		errors.password = 'Passwords entered do not match'
	}
	return errors
}
