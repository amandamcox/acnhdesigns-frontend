import React, { useState, useEffect } from 'react'
import { getAllDesigns, getFilteredDesigns, getSearchDesigns } from './service'
import Card from '../Common/Card'
import categoryData from '../../category-data.json'
import { sortResults } from '../../helpers/browseHelpers'
import './BrowseDesigns.css'

const BrowseDesigns = () => {
	const [results, setResults] = useState([])
	const [categoryFilter, setCategoryFilter] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const getDesigns = async () => {
		const results = await getAllDesigns()
		setResults(sortResults(results))
	}

	useEffect(() => {
		getDesigns()
	}, [])

	const handleCardUpdate = updatedDesign => {
		const dataWithoutUpdate = results.filter(
			result => result.id !== updatedDesign.id
		)
		const newResults = [...dataWithoutUpdate, updatedDesign]
		setResults(sortResults(newResults))
	}

	const handleSearch = async event => {
		event.preventDefault()
		const results = await getSearchDesigns(searchQuery)
		setResults(sortResults(results))
	}

	const filterByCategory = async category => {
		const results = await getFilteredDesigns(category)
		setResults(sortResults(results))
		setCategoryFilter(category)
		setSearchQuery('')
	}

	const removeFilters = () => {
		setCategoryFilter('')
		getDesigns()
	}

	const removeSearch = () => {
		setSearchQuery('')
		getDesigns()
	}

	return (
		<div>
			<div className='row background'>
				<form onSubmit={handleSearch}>
					<div className='col s9 m11 input-field'>
						<input
							id='search-input'
							autoComplete='off'
							type='search'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
						/>
						<label htmlFor='search-input'>Search Designs</label>
						<i class='material-icons' onClick={removeSearch}>
							close
						</i>
					</div>
					<div className='col s3 m1 input-field'>
						<button className='btn'>
							<i className='material-icons'>search</i>
						</button>
					</div>
				</form>
			</div>
			<div className='row section'>
				<div className='col s12 '>
					<span id='filter-label'>Filter by Category:</span>
					{categoryData.categoryTypes.map(category => {
						if (category === categoryFilter) {
							return (
								<div
									className='chip z-depth-1 purple lighten-3 clickable'
									onClick={removeFilters}
									key={category}
								>
									{category}
									<i className='material-icons close-icon'>
										close
									</i>
								</div>
							)
						} else {
							return (
								<div
									className='chip clickable'
									onClick={() => filterByCategory(category)}
									key={category}
								>
									{category}
								</div>
							)
						}
					})}
				</div>
			</div>
			<div className='row'>
				{results.map(result => (
					<Card
						key={result.id}
						result={result}
						passNewResults={handleCardUpdate}
					/>
				))}
			</div>
		</div>
	)
}

export default BrowseDesigns
