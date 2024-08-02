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
	data: null;
	values: InsuredDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: InsuredDetailsData) => void
	columnsSettings: ListColumnData[];
	onClickRowHandler: () => any
	reloadData: () => void
	saveStateHandler: () => void
}

/** Форма редактирования/просмотра Застрахованного */
function InsuredCreate(props: InsuredDetailsProps) {
	const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, reloadData, saveStateHandler } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	/** Сохранение состояния с данными Застрахованного */
	/** Сброс формы */
	React.useLayoutEffect(() => {
		setValues(new InsuredDetailsData());
	}, [])

	const saveStateWithInsuredData = () => {
		// Сохранение состояния всей формы
		saveStateHandler();
		// Сохранение идентификатора
		localStorage.setItem(localStorageDraftKeyInsuredId, "");
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
			return;
		}

		// Сброс черновика
		localStorage.removeItem(localStorageDraftKeyInsuredData)
		const draftDataParsed: InsuredDetailsData = JSON.parse(draftData);

		setValues(draftDataParsed as any)
	}, [])

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.saveInsured("", values);
		reloadData()
		onClickRowHandler()
	}

	return (
		<>
			<div className="insured-details">
				<div className="insured-details__tabs">
					<InsuredDetailsGeneralTab {...props} saveStateHandler={saveStateWithInsuredData} isViewMode={false} />
				</div>
				<div className="insured-details__actions">
					<Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
					<Button clickHandler={onClickRowHandler} title='ЗАКРЫТЬ' />
				</div>
			</div>
		</>
	)
}

export default InsuredCreate

