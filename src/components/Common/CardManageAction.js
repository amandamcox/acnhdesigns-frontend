import React from 'react'
import { deleteUserDesign } from '../ManageDesigns/service'

const CardManageAction = ({ result, passNewResults }) => {
	const handleDesignDelete = async designId => {
		const res = await deleteUserDesign(designId)
		if (res) passNewResults(designId)
	}

	return (
		<div className='card-action light-green lighten-5'>
			<button
				className='btn red right'
				onClick={() => handleDesignDelete(result.id)}
			>
				Delete
			</button>
		</div>
	)
}

export default CardManageAction
