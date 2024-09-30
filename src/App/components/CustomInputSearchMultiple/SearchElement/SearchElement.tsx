import React from 'react';
import icons from '../../../shared/icons';

interface SearchElementProps {
	/** Значение элемента */
	name: string,
	/** Обработчик удаления элемента */
	deleteHandler: () => void
	/** Режим просморта */
	isViewMode: boolean
}

/** Обертка значения выпадающего списка с множественной выборкой и поиском */
export default function SearchElement({ name, deleteHandler, isViewMode }: SearchElementProps) {
	return (
		<div className="search-element">
			<div className="search-element__name">{name}</div>
			{!isViewMode && <div className="search-element__close-button" onClick={() => deleteHandler()}>{icons.DeleteSearchItem}</div>}
		</div>
	)
}