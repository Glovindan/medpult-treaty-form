import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { IInputData, ListColumnData } from '../../../shared/types'
import icons from '../../../shared/icons'
import CustomListRowColumn from '../CustomListRowColumn/CustomListRowColumn'

interface ListRowProps {
	columnsSettings: ListColumnData[]
	data: { [key: string]: IInputData }
}

function CustomListRow(props: ListRowProps) {
	const { columnsSettings, data } = props;

	return (
		<div className="custom-list-row">
			{columnsSettings.map(settings => {
				if (data == undefined) {
					console.log(data)
					return;
				}
				const columnData = data[settings.code];

				return (
					<CustomListRowColumn data={columnData} {...settings} />
				)
			})}
		</div>
	)
}

export default CustomListRow
