import React from 'react'

const RatingButton = ({ result, icon, onClick, votes }) => {
	const onRate = designId => {
		if (icon === 'thumb_down') {
			onClick(designId, 'down')
		} else {
			onClick(designId, 'up')
		}
	}

	return (
		<div>
			{votes.includes(result.id) ? (
				<div className='right small-right-margin'>
					<div className='chip rate-chip teal lighten-1'>
						<i className='material-icons'>{icon}</i>
						<span>
							{icon === 'thumb_down'
								? result.downvotes
								: result.upvotes}
						</span>
					</div>
				</div>
			) : (
				<a
					className='right small-right-margin clickable'
					onClick={() => onRate(result.id)}
				>
					<div className='chip rate-chip'>
						<i className='material-icons'>{icon}</i>
						<span>
							{icon === 'thumb_down'
								? result.downvotes
								: result.upvotes}
						</span>
					</div>
				</a>
			)}
		</div>
	)
}

export default RatingButton
