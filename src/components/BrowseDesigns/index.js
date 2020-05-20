import React, { useState, useEffect } from 'react'
import { getAllDesigns } from './service'
import Card from './Card'
import './BrowseDesigns.css'

const BrowseDesigns = () => {
	const [results, setResults] = useState([])

	useEffect(() => {
		const getDesigns = async () => {
			const results = await getAllDesigns()
			setResults(sortResults(results))
		}
		getDesigns()
	}, [])

	const sortResults = dataSet => dataSet.sort((a, b) => b.upvotes - a.upvotes)

	const handleCardUpdate = updatedDesign => {
		const dataWithoutUpdate = results.filter(
			result => result.id !== updatedDesign.id
		)
		const newResults = [...dataWithoutUpdate, updatedDesign]
		setResults(sortResults(newResults))
	}

	return (
		<div>
			<div className='row'>
				<div className='col s12'>
					{results.map(result => (
						<Card
							key={result.id}
							result={result}
							passNewResults={handleCardUpdate}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default BrowseDesigns
