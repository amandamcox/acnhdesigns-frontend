import React from 'react'

const RatingButton = ({ result, icon, onClick }) => {
	const onRate = designId => {
		if (icon === 'thumb_down') {
			onClick(designId, 'down')
		} else {
			onClick(designId, 'up')
		}
	}

	return (
		<a
			className='right small-right-margin clickable'
			onClick={() => onRate(result.id)}
		>
			<div className='chip rate-chip'>
				<i className='material-icons'>{icon}</i>
				<span>
					{icon === 'thumb_down' ? result.downvotes : result.upvotes}
				</span>
			</div>
		</a>
	)
}

export default RatingButton
