import React, { useState, useEffect } from 'react'
import { uploadImage, saveNewDesign } from './service'
import { validateAddDesign } from '../../helpers/AddDesignValidationRules'
import categoryData from '../../category-data.json'
import './AddDesign.css'

const AddDesignForm = ({ token }) => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState([])
	const [creatorId, setCreatorId] = useState('')
	const [designId, setDesignId] = useState('')
	const [image, setImage] = useState('')
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const [validationErrors, setValidationErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (Object.keys(validationErrors).length === 0 && isSubmitting)
			handleAddDesign()
	}, [validationErrors])

	useEffect(() => {
		window.scroll(0, 0)
		setTimeout(() => {
			setSuccess('')
			setError('')
		}, 8000)
	}, [success, error])

	const validateValues = event => {
		event.preventDefault()
		const errorCheck = validateAddDesign({
			name,
			category,
			creatorId,
			designId,
			image,
		})
		setValidationErrors(errorCheck)
		setIsSubmitting(true)
	}

	const handleImageUpload = async () => {
		try {
			const imageData = new FormData()
			imageData.append('designImage', image)
			return await uploadImage(imageData)
		} catch (error) {
			setError('Your image could not be uploaded. Please try again.')
		}
	}

	const handleAddDesign = async () => {
		try {
			const uploadRes = await handleImageUpload()
			const designObj = {
				name,
				category,
				creatorId,
				designId,
				image: uploadRes.imageLocation,
			}
			await saveNewDesign(token, designObj)
			setSuccess('Design successfully uploaded!')
		} catch (error) {
			setError('Your design could not be saved. Please try again.')
		}
	}

	const handleCategorySelection = checkbox => {
		if (!category.includes(checkbox)) {
			setCategory([...category, checkbox])
		} else {
			const filteredOut = category.filter(
				savedCategory => savedCategory !== checkbox
			)
			setCategory(filteredOut)
		}
	}

	return (
		<section className='row background'>
			<div className='col s12'>
				<form onSubmit={validateValues}>
					<h2>Add Your Design</h2>
					{error && <h4 className='error-message'>{error}</h4>}
					{success && <h4 className='user-message'>{success}</h4>}
					<p>
						Want to showcase your creativity in the Custom Design
						Database? Add it here!
					</p>
					<p>* denotes required fields.</p>
					<div className='row'>
						<div className='input-field col s12'>
							<input
								id='design-name-input'
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								maxLength='40'
							/>
							<label htmlFor='design-name-input'>
								Design Name*
							</label>
							<span className='helper-text'>
								Max of 40 characters. Design name should be
								descriptive so others can find it!
							</span>
							{validationErrors.name && (
								<span
									className='helper-text red-text'
									data-error='wrong'
								>
									{validationErrors.name}
								</span>
							)}
						</div>
					</div>
					<div className='row'>
						<label className='col s12 custom-label'>
							Design Category*
						</label>
						{categoryData.categoryTypes.map(categoryType => (
							<label key={categoryType} className='col s12 m4 l4'>
								<input
									type='checkbox'
									name={categoryType}
									onChange={e =>
										handleCategorySelection(e.target.name)
									}
								/>
								<span>{categoryType}</span>
							</label>
						))}
						{validationErrors.category && (
							<span
								className='helper-text red-text'
								data-error='wrong'
							>
								{validationErrors.category}
							</span>
						)}
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input
								id='creator-input'
								type='text'
								value={creatorId}
								onChange={e => setCreatorId(e.target.value)}
								minLength='17'
								maxLength='17'
								className='validate'
							/>
							<label htmlFor='creator-input'>
								ACNH Creator ID
							</label>
							<span className='helper-text'>
								Creator ID should be 17 characters with dashes.
							</span>
							{validationErrors.creatorId && (
								<span
									className='helper-text red-text'
									data-error='wrong'
								>
									{validationErrors.creatorId}
								</span>
							)}
						</div>
					</div>
					<div className='row'>
						<div className='input-field col s12'>
							<input
								id='design-id-input'
								type='text'
								value={designId}
								onChange={e => setDesignId(e.target.value)}
								minLength='17'
								maxLength='17'
								className='validate'
							/>
							<label htmlFor='design-id-input'>
								ACNH Design ID*
							</label>
							<span className='helper-text'>
								Design ID should be 17 characters with dashes.
							</span>
							{validationErrors.designId && (
								<span
									className='helper-text red-text'
									data-error='wrong'
								>
									{validationErrors.designId}
								</span>
							)}
						</div>
					</div>
					<div className='row'>
						<label className='col s12 custom-label'>
							Design Image*
						</label>
						<div className='file-field input-field'>
							<div className='btn'>
								<span>Choose Image</span>
								<input
									type='file'
									onChange={e => setImage(e.target.files[0])}
									accept='.jpg,.jpeg,.png'
								/>
							</div>
							<div className='file-path-wrapper'>
								<input
									className='file-path validate'
									type='text'
									placeholder='Upload one image file'
								/>
								<span className='helper-text'>
									One file max. File type must be .jpg, .jpeg,
									or .png.
								</span>
								{validationErrors.image && (
									<span
										className='helper-text red-text'
										data-error='wrong'
									>
										{validationErrors.image}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className='row'>
						<button
							type='submit'
							className='btn-large waves-effect waves-light col s12 m5 l5 purple darken-2'
						>
							Submit Design
							<i className='material-icons right'>send</i>
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default AddDesignForm
