import React, { useState } from 'react';
import TabsWrapper from '../../TabsWrapper/TabsWrapper';
import TabItem from '../../TabItem/TabItem';
import PlanDetailsGeneralTab from '../PlanDetailsGeneralTab/PlanDetailsGeneralTab';
import { DetailsProps, InputDataCategory, InputDataString, ListColumnData, PlanDetailsData, ProgramDetailsData, SortData, getDetailsLayoutAttributes } from '../../../shared/types';
import CustomList from '../../CustomList/CustomList';
import CustomListRow from '../../CustomList/CustomListRow/CustomListRow';
import Scripts from '../../../shared/utils/clientScripts';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import PlanDetailsLayout from '../PlanDetailsLayout/planDetailsLayout';
import { useMapState } from '../../../shared/utils/utils';
import ProgramDetails from '../ProgramDetails/ProgramDetails';

interface PlanRowData {
	'number': InputDataCategory,
	'title': InputDataString,
	'type': InputDataCategory,
	'age': InputDataString,
	'startDate': InputDataString,
	'endDate': InputDataString,
	'parentPlan': InputDataCategory,
	'additionalAgreement': InputDataString
}

class PlanDetailsProps implements DetailsProps {
	data: PlanRowData;
	values: PlanDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: PlanDetailsData) => void
	columnsSettings: ListColumnData[];
	onClickRowHandler: () => any
	reloadData: () => void
}

/** Форма редактирования/просмотра плана страхования */
function PlanDetails(props: PlanDetailsProps) {
	const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, reloadData } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isViewMode, setIsViewMode] = useState<boolean>(true);

	React.useLayoutEffect(() => {
		setIsLoading(true)
		// Получить полные данные по data.id 
		Scripts.getPlanFulldata(data.id).then(fullData => {
			setIsLoading(false)
			// Присвоить полные данные в состояние
			setValues(fullData as any)
		})
	}, [])

	React.useLayoutEffect(() => {

	}, [values])

	/** Колонки списка программ */
	const columns = [
		new ListColumnData({ name: "номер", code: "number", fr: 1, isSortable: true }),
		new ListColumnData({ name: "наименование", code: "title", fr: 1, isSortable: true }),
		new ListColumnData({ name: "маркетинговое наименование", code: "marketingTitle", fr: 2, isSortable: true }),
	]

	/** Получение программ по идентификатору плана */
	const getProgramms = (page: number, sortData: SortData) => {
		return Scripts.getPrograms(data.id, sortData);
	}


	/** Нажатие на кнопку Изменить */
	const onClickEdit = () => {
		setIsViewMode(false)
	}

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.savePlan(data.id, values);
		setIsViewMode(true)
		reloadData()
	}

	const formActionButton = (
		isViewMode
			? <Button clickHandler={onClickEdit} buttonType='outline' title='ИЗМЕНИТЬ' />
			: <Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
	)

	// Данные формы деталей плана
	const [programValues, setProgramValue, setProgramValues] = useMapState<ProgramDetailsData>(new ProgramDetailsData());

	/** Получение формы детальной информации по строке списка Программ страхования */
	const getProgramDetailsLayout = ({ rowData, reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <ProgramDetails reloadData={reloadData} columnsSettings={columns} data={rowData} values={programValues} setValue={setProgramValue} setValues={setProgramValues} onClickRowHandler={onClickRowHandler} />
	}

	/** Получение данных строки с данными формы */
	const getRowData = () => {
		if (isLoading) {
			return data
		}

		// Формирование строки с возрастом
		const age = `от ${values.startAge.value} ${values.startAgeMeasurement.value !== values.endAgeMeasurement.value ? values.startAgeMeasurement.value : ""} до ${values.endAge.value} ${values.endAgeMeasurement.value}`

		const dataWithValues: PlanRowData = {
			...data,
			number: new InputDataCategory(values.planNumber.value),
			title: values.name,
			type: values.type,
			age: new InputDataString(age),
			startDate: values.startDate,
			endDate: values.endDate,
			parentPlan: new InputDataCategory(values.parentPlan.value)
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
					? (<div className="plan-details">
						< Loader />
					</div>)
					: (<div className="plan-details">
						<div className="plan-details__tabs">
							<PlanDetailsLayout {...props} isViewMode={isViewMode} />
						</div>
						<div className="plan-details__actions">
							{formActionButton}
							<Button clickHandler={onClickRowHandler} title='ЗАКРЫТЬ' />
						</div>
						<div className="plan-details__programs">
							<div className="plan-details__programs-title">
								<span>программы</span>
							</div>
							<CustomList getDetailsLayout={getProgramDetailsLayout} columnsSettings={columns} getDataHandler={getProgramms} isScrollable={false} />
						</div>
					</div>)
			}
		</>
	)
}

export default PlanDetails

