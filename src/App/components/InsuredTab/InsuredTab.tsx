import React, { useEffect, useState } from 'react';

import { IFormData, InputDataCategory, InputDataString, InsuredSearchData, ListColumnData, SideDataExtended } from '../../shared/types';
import SidesTabRow from '../SidesTabRow/SidesTabRow';
import CustomInput from '../CustomInput/CustomInput';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import Button from '../Button/Button';
import CustomSelectList from '../CustomSelect/CustomSelect';
import icons from '../../shared/icons';
import CustomList from '../CustomList/CustomList';
import Scripts from '../../shared/utils/clientScripts';

type GeneralTabProps = {
	handler: any
	values: InsuredSearchData
	isViewMode: boolean
	saveStateHandler: () => void
	setActionHandlers: {
		setAddHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>,
		setEditHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>,
		setDeleteHandler: React.Dispatch<React.SetStateAction<(() => void) | undefined>>
	}
}

const buttonTitle = (
	<div className="insured-search-button">
		<div className='insured-search-button__icon'>
			{icons.Search}
		</div>
		<div className="insured-search-button__title">
			Поиск
		</div>
	</div>
)

/** Вкладка Общее */
function InsuredTab(props: GeneralTabProps) {

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "ФИО", code: "fullname", fr: 1.5, isSortable: true, isLink: true }),
		new ListColumnData({ name: "Дата рождения", code: "birthDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Номер полиса", code: "policyNumber", fr: 1.5 }),
		new ListColumnData({ name: "Категория", code: "category", fr: 1.5 }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 1 }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 1 }),
		new ListColumnData({ name: "План", code: "plan", fr: 1.5 }),
		new ListColumnData({ name: "ДС", code: "additionalAgreement", fr: 1 }),
	]

	return (
		<div className="insured-tab">
			<div className="insured-tab__search">
				<CustomInput inputHandler={props.handler} values={props.values} name='fullname' placeholder='ФИО' />
				<CustomInputDate inputHandler={props.handler} values={props.values} name='birthDate' placeholder='Дата рождения' />
				<CustomInput inputHandler={props.handler} values={props.values} name='policyNumber' placeholder='Номер полиса' />
				<CustomSelectList inputHandler={props.handler} getDataHandler={async () => { return [new InputDataCategory()] }} values={props.values} name='category' placeholder='Категория' />
				<CustomInputDate inputHandler={props.handler} values={props.values} name='startDate' placeholder='Дата начала' />
				<CustomInputDate inputHandler={props.handler} values={props.values} name='endDate' placeholder='Дата окончания' />
				<CustomInput inputHandler={props.handler} values={props.values} name='plan' placeholder='План' />
				<CustomInput inputHandler={props.handler} values={props.values} name='additionalAgreement' placeholder='ДС' />
				<Button clickHandler={() => { }} title={buttonTitle} style={{ height: "100%" }} />
			</div>
			<div className="insured-tab-list">
				<CustomList columnsSettings={columns} getDataHandler={Scripts.getContractors} />
			</div>
		</div>
	)
}

export default InsuredTab
