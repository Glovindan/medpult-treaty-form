import React, { useEffect, useState } from 'react';

import { InputDataCategory, InsuredDetailsData, InsuredSearchData, ListColumnData, TabProps, getDetailsLayoutAttributes } from '../../shared/types';
import CustomInput from '../CustomInput/CustomInput';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import Button from '../Button/Button';
import CustomSelectList from '../CustomSelect/CustomSelect';
import icons from '../../shared/icons';
import CustomList from '../CustomList/CustomList';
import Scripts from '../../shared/utils/clientScripts';
import utils, { openContractorPage, redirectSPA, useMapState } from '../../shared/utils/utils';
import InsuredDetails from './InsuredDetails/InsuredDetails';
import { localStorageDraftKeyInsuredId } from '../../shared/utils/constants';
import InsuredCreate from './InsuredCreate/InsuredCreate';

interface InsuredTabProps extends Omit<TabProps, "values"> {
	values: InsuredSearchData
}

/** Вкладка Общее */
function InsuredTab({ values, handler, setActionHandlers, saveStateHandler }: InsuredTabProps) {
	const [onClickSearch, setOnClickSearch] = useState<any>();

	/** Получить идентификатор строки из черновика */
	const getDefaultRowIdFromDraft = (): string | undefined => {
		// Получение данных из черновика
		const draftData = localStorage.getItem(localStorageDraftKeyInsuredId);
		console.log(draftData)

		if (draftData == "") {
			setIsCreateMode(true)
		}

		localStorage.removeItem(localStorageDraftKeyInsuredId)

		return draftData ?? undefined
	}

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(() => onClickCreateContractor)
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

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

	/** Создание контрагента */
	const onClickCreateContractor = () => {
		// saveStateHandler();
		// openContractorPage()
		setIsCreateMode(true);
	}

	/** Нажатие на контрагента */
	const onClickContractor = (data: InputDataCategory) => {
		saveStateHandler();
		openContractorPage(data.data.code)
	}

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "ФИО", code: "fullname", fr: 1.5, isSortable: true, isLink: true, onClick: onClickContractor }),
		new ListColumnData({ name: "Дата рождения", code: "birthDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Номер полиса", code: "policyNumber", fr: 1.5 }),
		new ListColumnData({ name: "Категория", code: "category", fr: 1.5 }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 1 }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 1 }),
		new ListColumnData({ name: "План", code: "plan", fr: 1.5 }),
		new ListColumnData({ name: "ДС", code: "additionalAgreement", fr: 1 }),
	]

	// Данные формы деталей плана
	const [insuredValues, setInsuredValue, setInsuredValues] = useMapState<InsuredDetailsData>(new InsuredDetailsData());

	/** Получение формы детальной информации по строке списка Застрахованных */
	const getInsuredDetailsLayout = ({ rowData, reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <InsuredDetails saveStateHandler={saveStateHandler} reloadData={reloadData} columnsSettings={columns} data={rowData} values={insuredValues} setValue={setInsuredValue} setValues={setInsuredValues} onClickRowHandler={onClickRowHandler} />
	}

	const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
	const closeCreateMode = () => {
		setIsCreateMode(false);
	}
	/** Получение формы детальной информации по строке списка Застрахованных */
	const getCreateInsuredLayout = ({ reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <InsuredCreate saveStateHandler={saveStateHandler} reloadData={reloadData} columnsSettings={columns} data={null} values={insuredValues} setValue={setInsuredValue} setValues={setInsuredValues} onClickRowHandler={closeCreateMode} />
	}

	return (
		<div className="insured-tab">
			<div className="insured-tab__search">
				<CustomInput inputHandler={handler} values={values} name='fullname' placeholder='ФИО' />
				<CustomInputDate inputHandler={handler} values={values} name='birthDate' placeholder='Дата рождения' />
				<CustomInput inputHandler={handler} values={values} name='policyNumber' placeholder='Номер полиса' />
				<CustomSelectList inputHandler={handler} getDataHandler={async () => { return [new InputDataCategory()] }} values={values} name='category' placeholder='Категория' />
				<CustomInputDate inputHandler={handler} values={values} name='startDate' placeholder='Дата начала' />
				<CustomInputDate inputHandler={handler} values={values} name='endDate' placeholder='Дата окончания' />
				<CustomInput inputHandler={handler} values={values} name='plan' placeholder='План' />
				<CustomInput inputHandler={handler} values={values} name='additionalAgreement' placeholder='ДС' />
				<Button clickHandler={onClickSearch} title={buttonTitle} style={{ height: "100%" }} />
			</div>
			<div className="insured-tab-list">
				<CustomList defaultOpenRowId={() => getDefaultRowIdFromDraft()} getCreateLayout={getCreateInsuredLayout} closeCreateMode={closeCreateMode} isCreateMode={isCreateMode} columnsSettings={columns} searchData={values} setSearchHandler={setOnClickSearch} getDetailsLayout={getInsuredDetailsLayout} getDataHandler={Scripts.getContractors} />
			</div>
		</div>
	)
}

export default InsuredTab
