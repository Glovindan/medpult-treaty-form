import React, { useState } from 'react';
import { DetailsProps, IInputData, InputDataCategory, InputDataString, InsuredDetailsData, ListColumnData, ProgramDetailsData, SortData } from '../../../shared/types';
import CustomList from '../../CustomList/CustomList';
import CustomListRow from '../../CustomList/CustomListRow/CustomListRow';
import Scripts from '../../../shared/utils/clientScripts';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import InsuredDetailsGeneralTab from '../InsuredDetailsGeneralTab/InsuredDetailsGeneralTab';
import TabsWrapper from '../../TabsWrapper/TabsWrapper';
import TabItem from '../../TabItem/TabItem';
import { localStorageDraftKeyInsuredData, localStorageDraftKeyInsuredId } from '../../../shared/utils/constants';

interface InsuredRowData {
	'id': string,
	'fullname': InputDataCategory
	'birthDate': InputDataString,
	'policyNumber': InputDataString,
	'category': InputDataCategory,
	'startDate': InputDataString,
	'endDate': InputDataString,
	'plan': InputDataString,
	'additionalAgreement': InputDataString,
}

class InsuredDetailsProps implements DetailsProps {
	data: InsuredRowData;
	values: InsuredDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: InsuredDetailsData) => void
	columnsSettings: ListColumnData[];
	onClickRowHandler: () => any
	reloadData: () => void
	saveStateHandler: () => void
}

/** Форма редактирования/просмотра плана страхования */
function InsuredDetails(props: InsuredDetailsProps) {
	const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, reloadData, saveStateHandler } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isViewMode, setIsViewMode] = useState<boolean>(true);

	/** Сохранение состояния с данными Застрахованного */
	const saveStateWithInsuredData = () => {
		// Сохранение состояния всей формы
		saveStateHandler();
		// Сохранение идентификатора
		localStorage.setItem(localStorageDraftKeyInsuredId, data.id);
		// Сохранение данных детальной формы
		localStorage.setItem(localStorageDraftKeyInsuredData, JSON.stringify(values));
	}

	// Получение данных
	React.useLayoutEffect(() => {
		setIsLoading(true)

		// Получение данных из черновика
		const draftData = localStorage.getItem(localStorageDraftKeyInsuredData);

		// Если нет данных из черновика - загрузить свежие
		if (!draftData) {
			// Получить полные данные по data.id 
			Scripts.getInsuredFulldata(data.id).then(fullData => {
				setIsLoading(false)
				// Присвоить полные данные в состояние
				setValues(fullData as any)
			})
			return;
		}

		// Сброс черновика
		localStorage.removeItem(localStorageDraftKeyInsuredData)
		const draftDataParsed: InsuredDetailsData = JSON.parse(draftData);
		// Получить полные данные по draftDataParsed.fullname.data.code 
		Scripts.getInsuredFulldata(draftDataParsed.fullname.data.code).then(fullData => {
			setIsLoading(false)
			setIsViewMode(false)

			// Присвоить полные данные в состояние
			setValues(fullData as any)
		})
	}, [])

	/** Колонки списка ВМП */
	const columns = [
		new ListColumnData({ name: "ВМП", code: "name", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Стоимость риска в год", code: "riskAmount", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Страховая сумма на 1 3х, год", code: "insuranceAmount", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Временная франшиза, дни", code: "timeFranchise", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Франшиза %", code: "riskFranchise", fr: 1, isSortable: true }),
	]

	/** Получение рисков по идентификатору застрахованного */
	const getRisks = (page: number, sortData: SortData) => {
		return Scripts.getRisksInsured(data.id, sortData);
	}

	/** Нажатие на кнопку Изменить */
	const onClickEdit = () => {
		setIsViewMode(false)
	}

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.saveInsured(data.id, values);

		setIsViewMode(true)
		reloadData()
	}

	const formActionButton = (
		isViewMode
			? <Button clickHandler={onClickEdit} buttonType='outline' title='ИЗМЕНИТЬ' />
			: <Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
	)

	/** Получение данных строки с данными формы */
	const getRowData = () => {
		if (isLoading) {
			return data
		}

		const dataWithValues: InsuredRowData = {
			...data,
			fullname: values.fullname,
			policyNumber: values.policyNumber,
			category: values.category,
			startDate: values.policyStartDate,
			endDate: values.policyEndDate,
			plan: new InputDataString(values.currentPlan.value)
		}

		return dataWithValues as any
	}

	return (
		<>
			<CustomListRow
				data={getRowData()}
				columnsSettings={columnsSettings}
				setOpenRowIndex={onClickRowHandler}
				isClickable
				isOpen
				reloadData={function () { }}
			/>
			{
				isLoading
					? (<div className="insured-details">
						< Loader />
					</div>)
					: (<div className="insured-details">
						<div className="insured-details__tabs">
							<InsuredDetailsGeneralTab {...props} saveStateHandler={saveStateWithInsuredData} isViewMode={isViewMode} />
						</div>
						<div className="insured-details__actions">
							{formActionButton}
							<Button clickHandler={onClickRowHandler} title='ЗАКРЫТЬ' />
						</div>
						<TabsWrapper>
							<TabItem code={"risks"} name={"Виды медицинской помощи"} >
								<CustomList columnsSettings={columns} getDataHandler={getRisks} isScrollable={false} />
							</TabItem>
							<TabItem code={"files"} name={"Вложения"} >
								TODO
							</TabItem>
						</TabsWrapper>
					</div>)
			}
		</>
	)
}

export default InsuredDetails

