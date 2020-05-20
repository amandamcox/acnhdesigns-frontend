import React from 'react'
import LazyLoad from 'react-lazyload'
import RatingButton from './RatingButton'
import { rateDesign } from './service'

const Card = ({ result, passNewResults }) => {
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
		<LazyLoad height={400} offset={100}>
			<div className='col s12 m6 l6'>
				<div className='card z-depth-3'>
					<div className='card-image'>
						<img src={result.imageUrl} alt={result.designName} />
						<span className='card-title'>{result.designName}</span>
					</div>
					<div className='card-content'>
						<p>
							<span className='card-qualifier'>Design ID:</span>
							<span className='uppercase'>
								{result.customDesignId}
							</span>
						</p>
						<p>
							<span className='card-qualifier'>Creator ID:</span>
							<span className='uppercase'>
								{result.creatorId}
							</span>
						</p>
						{result.designCategory.map(category => (
							<div
								key={category}
								className='chip z-depth-1 purple lighten-3 capitialize card-category'
							>
								{category}
							</div>
						))}
					</div>
					<div className='card-action light-green lighten-5'>
						<a className='btn-floating waves-effect waves-light grey lighten-1'>
							<i className='material-icons'>favorite</i>
						</a>
						<RatingButton
							result={result}
							icon='thumb_down'
							onClick={handleRating}
						/>
						<RatingButton
							result={result}
							icon='thumb_up'
							onClick={handleRating}
						/>
					</div>
				</div>
			</div>
		</LazyLoad>
	)
}

export default Card
