import React, { useContext, useEffect, useState } from 'react'

import CustomSelect from './components/CustomSelect/CustomSelect'
import LabledField from './components/LabledField/LabledField'
import CustomInput from './components/CustomInput/CustomInput'
import Panel from './components/Panel/Panel'	/** Договор */
import TabItem from './components/TabItem/TabItem'
import TabsWrapper from './components/TabsWrapper/TabsWrapper'
import GeneralTab from './components/GeneralTab/GeneralTab'
import Button from './components/Button/Button'
import { IFormData, IInputData, InsuredSearchData, TreatyFormData } from './shared/types'
import Loader from './components/Loader/Loader'
import Scripts from './shared/utils/clientScripts'
import { localStorageDraftKey } from './shared/utils/constants'
import SidesTab from './components/SidesTab/SidesTab'
import InsuredTab from './components/InsuredTab/InsuredTab'

export default function App() {

	const [isViewMode, setIsViewMode] = useState<boolean>(true);

	// Обработчик нажатия на кнопку добавить
	const [addHandler, setAddHandler] = useState<() => void>()
	// Обработчик нажатия на кнопку редактировать
	const [editHandler, setEditHandler] = useState<() => void>()
	// Обработчик нажатия на кнопку удалить
	const [deleteHandler, setDeleteHandler] = useState<() => void>()
	const setActionHandlers = {
		setAddHandler,
		setEditHandler,
		setDeleteHandler
	}

	const [values, setValues] = useState<IFormData>(new TreatyFormData());
	const [insuredValues, setInsuredValues] = useState<InsuredSearchData>(new InsuredSearchData());


	// Установка значения поля формы
	const setValue = (name: string, value: IInputData) => {
		setValues({ ...values, [name]: value })
	}

	// Установка значения поля поиска застрахованного
	const setValueSearch = (name: string, value: IInputData) => {
		setInsuredValues({ ...insuredValues, [name]: value })
	}

	// Получение данных договора
	useEffect(() => {
		console.log(deleteHandler)
		// Получение данных из черновика
		const draftData = localStorage.getItem(localStorageDraftKey)
		localStorage.removeItem(localStorageDraftKey)
		if (draftData) {
			const data = JSON.parse(draftData);
			setValues(data)
			setIsViewMode(false);
			return;
		}

		// Получение данных из Системы
		const dataPromise: Promise<IFormData> = Scripts.getTreaty();
		dataPromise.then((data) => {
			setValues(data)
		})
	}, [])

	// Debug
	useEffect(() => {
		console.log(values)
	}, [values])

	/** Нажатие на кнопку Изменить */
	const onClickEdit = () => {
		setIsViewMode(false)
	}

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.saveTreaty(values);
		setIsViewMode(true)
	}

	/** Сохранить состояние в localStorage */
	const saveState = () => {
		const data = JSON.stringify(values)
		localStorage.setItem(localStorageDraftKey, data);
	}

	/** Кнопка Изменить или Сохранить взависимости от режима формы */
	const formActionButton = (
		isViewMode
			? <Button clickHandler={onClickEdit} buttonType='outline' title='ИЗМЕНИТЬ' />
			: <Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
	)

	/** Заголовок панели */
	const panelLabel =
		values.number.value
			? `Договор ${values.number.value} от 01.12.2023`
			: "Новый договор"

	return (
		<>
			<div style={{ background: "#F2F4F6", padding: "10px", height: "100%" }}>
				<Panel label={panelLabel}>
					<TabsWrapper addHandler={addHandler} editHandler={editHandler} deleteHandler={deleteHandler}>
						<TabItem code={"general"} name={"Общее"} >
							<GeneralTab handler={setValue} values={values} isViewMode={isViewMode} saveStateHandler={saveState} setActionHandlers={setActionHandlers} />
						</TabItem>
						<TabItem code={"sides"} name={"Стороны"}>
							<SidesTab handler={setValue} values={values} isViewMode={isViewMode} saveStateHandler={saveState} setActionHandlers={setActionHandlers} />
						</TabItem>
						<TabItem code={"insured"} name={"Застрахованные"}>
							<InsuredTab handler={setValueSearch} values={insuredValues} isViewMode={isViewMode} saveStateHandler={saveState} setActionHandlers={setActionHandlers} />
						</TabItem>
						<TabItem code={"insurancePlans"} name={"Планы страхования"}>
							TODO
						</TabItem>
						<TabItem code={"agreementsAdditional"} name={"Доп соглашения"}>
							TODO
						</TabItem>
						<TabItem code={"files"} name={"Вложения"}>
							TODO
						</TabItem>
					</TabsWrapper>
					<div style={{ padding: "0 18px 18px 18px", textAlign: "right", display: "flex", gap: "18px", flexDirection: "row", justifyContent: "flex-end" }}>
						{formActionButton}
						<Button clickHandler={() => { }} title='ЗАКРЫТЬ' />
					</div>
				</Panel>
			</div>
		</>
	)
}
