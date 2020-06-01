import React from 'react'
import LazyLoad from 'react-lazyload'
import CardAction from './CardAction'

const Card = ({ result, passNewResults }) => {
	return (
		<LazyLoad height={400} offset={100}>
			<div className='col s12 m6 l6'>
				<div className='card large'>
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
					<CardAction
						result={result}
						passNewResults={passNewResults}
					/>
				</div>
			</div>
		</LazyLoad>
	)
}

export default Card
