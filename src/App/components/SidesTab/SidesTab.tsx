import React, { useDebugValue, useEffect, useState } from 'react'

import LabledField from '../LabledField/LabledField';
import CustomInput from '../CustomInput/CustomInput';
import { IFormData, IInputData } from '../../shared/types';
import CustomSelect from '../CustomSelect/CustomSelect';
import Scripts from '../../shared/utils/clientScripts';
import Masks from '../../shared/utils/masks';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import CustomInputAppItem from '../CustomInputAppItem/CustomInputAppItem';
import CustomInputSearch from '../CustomInputSearch/CustomInputSearch';
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

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(() => () => { alert("add") })
		setActionHandlers.setEditHandler(() => () => { alert("edit") })
		setActionHandlers.setDeleteHandler(() => () => { alert("delete") })
	}, [])

	// Обновление строк при изменении значения
	useEffect(() => {
		const rows = values.sides.map((value, index) => {
			return <SidesTabRow index={index} contractor={value.contractor} type={value.type} isEdit={value.isEdit} {...props} />
		})

		setRows(rows);
	}, [values])


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
