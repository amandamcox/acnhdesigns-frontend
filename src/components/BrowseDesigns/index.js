import React, { useState, useEffect } from 'react'
import { getAllDesigns, getFilteredDesigns } from './service'
import Card from './Card'
import categoryData from '../../category-data.json'
import './BrowseDesigns.css'

const BrowseDesigns = () => {
	const [results, setResults] = useState([])
	const [categoryFilter, setCategoryFilter] = useState('')

	const getDesigns = async () => {
		const results = await getAllDesigns()
		setResults(sortResults(results))
	}

	useEffect(() => {
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

	const filterByCategory = async category => {
		const results = await getFilteredDesigns(category)
		setResults(sortResults(results))
		setCategoryFilter(category)
	}

	const removeFilters = () => {
		setCategoryFilter('')
		getDesigns()
	}

	return (
		<div>
			<div className='row section'>
				<div className='col s12 '>
					<span id='filter-label'>Filter by Category:</span>
					{categoryData.categoryTypes.map(category => {
						if (category === categoryFilter) {
							return (
								<div
									className='chip z-depth-1 purple lighten-3 clickable'
									onClick={removeFilters}
								>
									{category}
									<i class='material-icons close-icon'>
										close
									</i>
								</div>
							)
						} else {
							return (
								<div
									className='chip clickable'
									onClick={() => filterByCategory(category)}
								>
									{category}
								</div>
							)
						}
					})}
				</div>
			</div>
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
