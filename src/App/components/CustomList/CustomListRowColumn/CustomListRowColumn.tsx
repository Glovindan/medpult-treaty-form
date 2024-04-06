import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { IInputData, ListColumnData, SortData } from '../../../shared/types'
import icons from '../../../shared/icons'

interface ListColumnProps extends ListColumnData {
	value: string
}

function CustomListRowColumn(props: ListColumnProps) {
	const { code, fr, isSortable, name, value, isLink } = props;

	return (
		<div className={
			isLink
				? "custom-list-row-column custom-list-row-column__link"
				: "custom-list-row-column"
		} style={{ flex: fr }}>
			{value}
		</div>
	)
}

export default CustomListRowColumn
