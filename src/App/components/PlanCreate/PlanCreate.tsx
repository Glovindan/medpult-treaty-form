import React, { useState } from 'react';
import { DetailsProps, ListColumnData, PlanDetailsData } from './../../shared/types';
import CustomList from './../CustomList/CustomList';
import Scripts from './../../shared/utils/clientScripts';
import Button from './../Button/Button';
import Loader from './../Loader/Loader';
import PlanDetailsLayout from '../PlansTab/PlanDetailsLayout/planDetailsLayout';

class PlanCreateProps {
	values: PlanDetailsData;
	setValue: (name: string, value: any) => void
	setValues: (values: PlanDetailsData) => void
	closeHandler: () => any
	reloadData: () => void
}

function getPlanEmptyData() {
	const data = {
		'planNumber': {
			'value': '',
		},
		'startDate': {
			'value': '',
		},
		'endDate': {
			'value': '',
		},
		'insuranceType': {
			'value': '',
			'data': {
				'code': '',
			},
		},
		'ageFactor': {
			'value': '',
		},
		'startAge': {
			'value': '0',
		},
		'startAgeMeasurement': {
			'value': '',
			'data': {},
		},
		'endAge': {
			'value': '',
		},
		'endAgeMeasurement': {
			'value': '',
			'data': {},
		},
		'insurancePremium': {
			'value': '',
		},
		'name': {
			'value': '',
		},
		'previousPlan': {
			'value': '',
		},
		'relativeFactor': {
			'value': '',
		},
		'insuranceAmount': {
			'value': '',
		},
		'type': {
			'value': '',
		},
		'parentPlan': {
			'value': '',
		},
		'region': {
			'value': '',
			'data': {
				'isFull': true,
			},
		},
		'medicalFactor': {
			'value': '',
		},
	}

	return data
}

/** Форма редактирования/просмотра плана страхования */
function PlanCreate(props: PlanCreateProps) {
	const { values, setValue, setValues, closeHandler, reloadData } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	/** Сброс формы */
	React.useLayoutEffect(() => {
		setValues(getPlanEmptyData() as any)
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
	// const getProgramms = (page: number, sortData: SortData) => {
	// 	return Scripts.getPrograms(data.id, sortData);
	// }

	/** Нажатие на кнопку сохранить */
	const onClickSave = async () => {
		await Scripts.createPlan(values);
		reloadData()
		closeHandler()
	}

	return (
		<>
			{
				isLoading
					? (<div className="plan-details">
						< Loader />
					</div>)
					: (<div className="plan-details">
						<div className="plan-details__tabs">
							<PlanDetailsLayout {...props} isViewMode={false} />
						</div>
						<div className="plan-details__actions">
							<Button clickHandler={onClickSave} buttonType='outline' title='СОХРАНИТЬ' />
							<Button clickHandler={closeHandler} title='ЗАКРЫТЬ' />
						</div>
						{/* <div className="plan-details__programs">
							<div className="plan-details__programs-title">
								<span>программы</span>
							</div>
							<CustomList columnsSettings={columns} getDataHandler={getProgramms} isScrollable={false} />
						</div> */}
					</div>)
			}
		</>
	)
}

export default PlanCreate

