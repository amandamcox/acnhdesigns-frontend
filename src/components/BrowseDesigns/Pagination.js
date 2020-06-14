import React, { useState, useEffect } from 'react'

const Pagination = ({ currentPage, totalPages, handlePageClick }) => {
	const [backArrow, setBackArrow] = useState(false)
	const [forwardArrow, setForwardArrow] = useState(false)

	useEffect(() => {
		if (currentPage === 1) {
			setBackArrow(false)
		}
		if (currentPage === totalPages) {
			setForwardArrow(false)
		}
		if (currentPage > 1) {
			setBackArrow(true)
		}
		if (currentPage < totalPages) {
			setForwardArrow(true)
		}
	}, [currentPage, totalPages])

	const pages = () => {
		return [...Array(totalPages)].map((page, index) => (
			<li
				className={`${currentPage === index + 1 && 'active'}`}
				key={index + 1}
			>
				<a
					className='clickable'
					onClick={() => handlePageClick(index + 1)}
				>
					{index + 1}
				</a>
			</li>
		))
	}

	return (
		<div className='row'>
			<div className='col s12'>
				<ul className='pagination'>
					<li className={`waves-effect ${!backArrow && 'disabled'}`}>
						{backArrow ? (
							<a onClick={() => handlePageClick(currentPage - 1)}>
								<i className='material-icons'>chevron_left</i>
							</a>
						) : (
							<i className='material-icons'>chevron_left</i>
						)}
					</li>
					{pages()}
					<li
						className={`waves-effect ${
							!forwardArrow && 'disabled'
						}`}
					>
						{forwardArrow ? (
							<a onClick={() => handlePageClick(currentPage + 1)}>
								<i className='material-icons'>chevron_right</i>
							</a>
						) : (
							<i className='material-icons'>chevron_right</i>
						)}
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Pagination
