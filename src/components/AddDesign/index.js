import React, { useState } from 'react'
import { uploadImage, saveNewDesign } from './service'
import './AddDesign.css'

const AddDesignForm = ({ token }) => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState([])
	const [creatorId, setCreatorId] = useState('')
	const [designId, setDesignId] = useState('')
	const [image, setImage] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const categoryTypes = [
		'Paths',
		'Patterns',
		'Landscaping',
		'Decor',
		'Art',
		'Flags',
		'Sign',
		'Clothing',
		'Stalls',
	]

	const validateFields = () => {
		if (!name) {
			return false
		} else if (category.length === 0) {
			return false
		} else if (!designId) {
			return false
		} else if (!image) {
			return false
		} else if (designId.length !== 17) {
			return false
		} else if (creatorId.length !== 17) {
			return false
		}
		return true
	}

	const handleImageUpload = async () => {
		try {
			const imageData = new FormData()
			imageData.append('designImage', image)
			return await uploadImage(imageData)
		} catch (error) {
			configureMessage(
				'error',
				'Your design image failed to save. Please try again later.'
			)
		}
	}

	const onSubmit = async () => {
		if (validateFields()) {
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
				configureMessage(
					'success',
					'Your design was added to the Gallery!'
				)
			} catch (error) {
				configureMessage(
					'error',
					"Your design failed to save. Ensure your design ID isn't already in the database."
				)
			}
		} else {
			configureMessage(
				'error',
				'Please fill in each required field before submitting!'
			)
		}
	}

	const configureMessage = (type, message) => {
		window.scroll(0, 0)
		if (type === 'success') {
			setMessage(message)
		} else {
			setError(message)
		}
		setTimeout(() => {
			setMessage('')
			setError('')
		}, 8000)
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
		<article className='row background'>
			<div className='col s12'>
				<h2>Add Your Design</h2>
				<p>
					Want to showcase your creativity in the Custom Design
					Database? Add it here!
				</p>
				<p>* denotes required fields.</p>
				{message && <h4 className='user-message'>{message}</h4>}
				{error && <h4 className='error-message'>{error}</h4>}
				<div className='row'>
					<div className='input-field col s12'>
						<input
							id='design-name-input'
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							maxLength='40'
							required
						/>
						<label htmlFor='design-name-input'>Design Name*</label>
					</div>
					<p className='help-text'>
						Design name should be descriptive so others can find it!
						Maximum of 40 characters.
					</p>
				</div>
				<div className='row'>
					<label className='col s12 custom-label'>
						Design Category*
					</label>
					<p className='help-text'>
						Select as many categories that apply to your design.
					</p>
					{categoryTypes.map(categoryType => (
						<label key={categoryType} className='col s12 m4 l4'>
							<input
								type='checkbox'
								name={categoryType}
								onChange={e =>
									handleCategorySelection(e.target.name)
								}
								required
							/>
							<span>{categoryType}</span>
						</label>
					))}
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
						<label htmlFor='creator-input'>ACNH Creator ID</label>
					</div>
					<p className='help-text'>
						ID should be 17 characters with dashes.
					</p>
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
							required
						/>
						<label htmlFor='design-id-input'>ACNH Design ID*</label>
					</div>
					<p className='help-text'>
						ID should be 17 characters with dashes.
					</p>
				</div>
				<div className='row'>
					<label className='col s12 custom-label'>
						Design Image*
					</label>
					<p className='help-text'>
						One file max. File type must be .jpg, .jpeg, or .png.
					</p>
					<div className='file-field input-field'>
						<div className='btn '>
							<span>Choose Image</span>
							<input
								type='file'
								onChange={e => setImage(e.target.files[0])}
								accept='.jpg,.jpeg,.png'
								required
							/>
						</div>
						<div className='file-path-wrapper'>
							<input
								className='file-path validate'
								type='text'
								placeholder='Upload one image file'
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<button
						onClick={onSubmit}
						className='btn-large waves-effect waves-light col s12 m8 l8 purple darken-2'
					>
						Submit Design
						<i className='material-icons right'>send</i>
					</button>
				</div>
			</div>
		</article>
	)
}

export default AddDesignForm
