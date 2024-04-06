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
	const [columns, setColumns] = useState<React.JSX.Element[]>();

	useEffect(() => {
		const columns = columnsSettings.map(settings => {
			const columnData = data[settings.code];

			console.log(data)
			return (
				<CustomListRowColumn value={columnData.value} {...settings} />
			)
		})

		setColumns(columns)
	}, [])

	return (
		<div className="custom-list-row">
			{columns}
		</div>
	)
}

export default CustomListRow
