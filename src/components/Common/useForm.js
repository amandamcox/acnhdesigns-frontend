import { useState, useEffect } from 'react'

const useForm = (callback, validate) => {
	const [inputValues, setInputValues] = useState({})
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) callback()
	}, [errors])

	const handleSubmit = event => {
		if (event) event.preventDefault()
		setErrors(validate(inputValues))
		setIsSubmitting(true)
	}

	const handleChange = event => {
		event.persist()
		setInputValues(inputValues => ({
			...inputValues,
			[event.target.name]: event.target.value,
		}))
	}

	return {
		handleChange,
		handleSubmit,
		inputValues,
		errors,
	}
}

export default useForm
