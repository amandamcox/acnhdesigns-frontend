export const validateAddDesign = formValues => {
	let errors = {}
	if (!formValues.name) {
		errors.name = 'Please enter a name for your design'
	} else if (formValues.name.length > 40) {
		errors.name = 'Your design name must no exceed 40 characters'
	} else if (formValues.category.length === 0) {
		errors.category = 'Check at least one category for your design'
	} else if (
		(formValues.creatorId && formValues.creatorId.length > 17) ||
		(formValues.creatorId && formValues.creatorId.length < 17)
	) {
		errors.creatorId = 'Your creator ID must be 17 characters with dashes'
	} else if (
		formValues.designId.length > 17 ||
		formValues.designId.length < 17
	) {
		errors.designId = 'Your design ID must be 17 characters with dashes'
	} else if (!formValues.image) {
		errors.image = 'Please select an image to upload for your design'
	}
	return errors
}
