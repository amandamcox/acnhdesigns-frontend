import React from 'react'
import RatingButton from './RatingButton'
import { rateDesign } from '../BrowseDesigns/service'

const CardRateAction = ({ result, passNewResults, votes }) => {
	const handleRating = async (designId, vote) => {
		try {
			if (vote === 'up') {
				const updatedDesign = await rateDesign(designId, 'up')
				passNewResults(updatedDesign)
			} else if (vote === 'down') {
				const updatedDesign = await rateDesign(designId, 'down')
				passNewResults(updatedDesign)
			}
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<div className='card-action light-green lighten-5'>
			<RatingButton
				result={result}
				icon='thumb_down'
				onClick={handleRating}
				votes={votes}
			/>
			<RatingButton
				result={result}
				icon='thumb_up'
				onClick={handleRating}
				votes={votes}
			/>
		</div>
	)
}

export default CardRateAction
