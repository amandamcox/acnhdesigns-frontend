import React, { useEffect, useState } from 'react'
import { getUserDesigns } from './service'
import Card from '../Common/Card'
import './ManageDesigns.css'

const ManageDesigns = ({ token }) => {
	const [userDesigns, setUserDesigns] = useState([])
	const [error, setError] = useState('')

	useEffect(() => {
		const getInitialLoad = async () => {
			try {
				const userDesigns = await getUserDesigns(token)
				setUserDesigns(userDesigns)
				setError('')
			} catch (error) {
				setError('Failed to load designs. Try refreshing the page.')
			}
		}
		if (token) getInitialLoad()
	}, [token])

	const handleDelete = deletedDesignId => {
		const dataWithoutDeletedDesign = userDesigns.filter(
			design => design.id !== deletedDesignId
		)
		setUserDesigns(dataWithoutDeletedDesign)
	}

	return (
		<section className='background'>
			<h1>Manage Your Designs</h1>
			<p>
				Below are all the designs you've submitted. To delete a design,
				click the links under the appropriate card.
			</p>
			{error && <h4 className='error-message'>{error}</h4>}
			<div className='row '>
				{userDesigns &&
					userDesigns.map(design => (
						<Card
							result={design}
							manage='true'
							passNewResults={handleDelete}
						/>
					))}
			</div>
		</section>
	)
}

export default ManageDesigns
