import React, { useEffect, useState } from 'react';

import { IFormData, SideDataExtended } from '../../shared/types';
import SidesTabRow from '../SidesTabRow/SidesTabRow';

type GeneralTabProps = {
	handler: any
	values: IFormData
	isViewMode: boolean
	saveStateHandler: () => void
	setActionHandlers: {
		setAddHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>,
		setEditHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>,
		setDeleteHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
	}
}

/** Вкладка Общее */
function SidesTab(props: GeneralTabProps) {
	const { handler, values, isViewMode, saveStateHandler, setActionHandlers } = props;

	const [rows, setRows] = useState<React.JSX.Element[]>([])

	const [selectedRowIndex, setSelectedRowIndex] = useState<number>();

	/** При выборе  */
	useEffect(() => {
		if (selectedRowIndex != undefined) {
			setActionHandlers.setEditHandler(() => editRowHandler)
			setActionHandlers.setDeleteHandler(() => deleteRowHandler)
		} else {
			setActionHandlers.setEditHandler(undefined)
			setActionHandlers.setDeleteHandler(undefined)
		}
	}, [selectedRowIndex])

	const editRowHandler = () => {
		if (selectedRowIndex == undefined) return;

		const sides = values.sides;
		sides[selectedRowIndex].isEdit = true;

		handler("sides", sides)
	}

	const deleteRowHandler = () => {
		if (selectedRowIndex == undefined) return;

		setSelectedRowIndex(undefined);
		const sides = values.sides;
		sides.splice(selectedRowIndex, 1);

		handler("sides", sides)
	}

	const addRowHandler = () => {
		const sides = values.sides;

		sides.push(new SideDataExtended(true))

		handler("sides", sides)
	}

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(() => addRowHandler)
	}, [])

	// Обновление строк при изменении значения
	useEffect(() => {
		const rows = values.sides.map((value, index) => {
			return <SidesTabRow
				index={index}
				contractor={value.actualData.contractor}
				type={value.actualData.type}
				isEdit={value.isEdit}
				setSelectedRowIndex={setSelectedRowIndex}
				selectedRowIndex={selectedRowIndex}
				{...props}
			/>
		})

		setRows(rows);
	}, [values, selectedRowIndex])


	return (
		<div className="sides-tab">
			<div className="sides-tab__header">
				<div className="sides-tab__header-item">Тип ответственного лица</div>
				<div className="sides-tab__header-item">Ответственное лицо</div>
			</div>
			<div className="sides-tab__list">
				{rows}
			</div>
		</div>
	)
}

export default SidesTab
