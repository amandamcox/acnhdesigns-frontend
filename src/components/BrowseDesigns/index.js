import React, { useState, useEffect } from 'react'
import { getAllDesigns, getFilteredDesigns, getSearchDesigns } from './service'
import Card from '../Common/Card'
import Pagination from './Pagination'
import Spinner from '../Common/Spinner'
import categoryData from '../../category-data.json'
import './BrowseDesigns.css'

const BrowseDesigns = () => {
	const [results, setResults] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [filter, setFilter] = useState('')
	const [query, setQuery] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)
	const [votes, setVotes] = useState([])

	const getDesigns = async (page = 1) => {
		try {
			setLoading(true)
			window.scroll(0, 0)
			const getAllRes = await getAllDesigns(page)
			setSearchData(getAllRes)
			setLoading(false)
		} catch (error) {
			setError(error.message)
		}
	}

	useEffect(() => {
		directSearch()
		const existingVotes = getVoteCookie()
		if (existingVotes) {
			setVotes(existingVotes)
		}
	}, [])

	const directSearch = page => {
		if (filter) {
			handleFilter(filter, page)
		} else if (query) {
			getSearchResults(page)
		} else {
			getDesigns(page)
		}
	}

	const setSearchData = data => {
		setResults(data.results)
		setCurrentPage(parseInt(data.currentPage))
		setTotalPages(parseInt(data.totalPages))
	}

	const handleSearch = async (event, page = 1) => {
		event.preventDefault()
		getSearchResults(page)
	}

	const getSearchResults = async (page = 1) => {
		setLoading(true)
		window.scroll(0, 0)
		setFilter('')
		const getSearchRes = await getSearchDesigns(query, page)
		setSearchData(getSearchRes)
		setLoading(false)
	}

	const handleFilter = async (category, page = 1) => {
		setLoading(true)
		window.scroll(0, 0)
		setFilter(category)
		setQuery('')
		const getFilterRes = await getFilteredDesigns(category, page)
		setSearchData(getFilterRes)
		setLoading(false)
	}

	const handleDesignVote = votedDesign => {
		setVoteCookie(votedDesign)
		const resultsWithoutChangedDesign = results.filter(
			result => result.id !== votedDesign.id
		)
		const newResults = [...resultsWithoutChangedDesign, votedDesign]
		const sortedResults = newResults.sort((a, b) => b.upvotes - a.upvotes)
		setResults(sortedResults)
	}

	const removeFilters = () => {
		setFilter('')
		getDesigns()
	}

	const removeSearch = () => {
		setQuery('')
		getDesigns()
	}

	const getVoteCookie = () => {
		if (
			document.cookie
				.split(';')
				.some(cookie => cookie.trim().startsWith('cddbVote='))
		) {
			const voteValues = document.cookie
				.split(';')
				.find(cookie => cookie.startsWith('cddbVote'))
			const sliceIndex = voteValues.indexOf('=')
			const allVotedDesigns = voteValues.slice(sliceIndex + 1)
			return allVotedDesigns.split(',')
		} else {
			return false
		}
	}

	const setVoteCookie = votedDesign => {
		const newVotes = [...votes, votedDesign.id]
		const today = new Date()
		const nextYear = today.setFullYear(today.getFullYear() + 1)
		document.cookie = `cddbVote=${newVotes.toString()};expires=${nextYear}`
		setVotes(newVotes)
	}

	return (
		<div>
			<div>
				{error && <h4 className='error-message'>{error}</h4>}
				<div className='row background'>
					<form onSubmit={handleSearch}>
						<div className='col s9 m11 input-field'>
							<input
								id='search-input'
								autoComplete='off'
								type='search'
								value={query}
								onChange={e => setQuery(e.target.value)}
							/>
							<label htmlFor='search-input' className='active'>
								Search Designs
							</label>
							<i
								className='material-icons'
								onClick={removeSearch}
							>
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
							if (category === filter) {
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
										onClick={() => handleFilter(category)}
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
					{loading ? (
						<Spinner />
					) : (
						results.map(result => (
							<Card
								key={result.id}
								result={result}
								passNewResults={handleDesignVote}
								votes={votes}
							/>
						))
					)}
				</div>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					handlePageClick={directSearch}
				/>
			</div>
		</div>
	)
}

export default BrowseDesigns
