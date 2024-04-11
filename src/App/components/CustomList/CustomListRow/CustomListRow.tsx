import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { IInputData, ListColumnData } from '../../../shared/types'
import icons from '../../../shared/icons'
import CustomListRowColumn from '../CustomListRowColumn/CustomListRowColumn'
import PlanDetails from '../../PlanDetails/PlanDetails'

interface ListRowProps {
	columnsSettings: ListColumnData[]
	data: { [key: string]: IInputData }
	isShowDetails?: boolean
	setOpenRowIndex?: () => any
	getDetailsLayout?: () => any
}

function CustomListRow(props: ListRowProps) {
	const { isShowDetails, columnsSettings, data, getDetailsLayout, setOpenRowIndex } = props;

	const getRowClassname = (): string => {
		if (getDetailsLayout && isShowDetails) return "custom-list-row custom-list-row_open"
		if (getDetailsLayout) return "custom-list-row custom-list-row_openable"
		return "custom-list-row"
	}

	return (
		<>
			<div className={getRowClassname()} onClick={setOpenRowIndex}>
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
			{isShowDetails && getDetailsLayout && getDetailsLayout()}
		</>
	)
}

export default CustomListRow
