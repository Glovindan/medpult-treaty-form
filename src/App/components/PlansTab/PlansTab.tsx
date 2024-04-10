import React, { useEffect } from 'react';

import { InsuredSearchData, ListColumnData, TabProps } from '../../shared/types';
import Scripts from '../../shared/utils/clientScripts';
import CustomList from '../CustomList/CustomList';
import PlanDetails from '../PlanDetails/PlanDetails';

/** Вкладка Общее */
function PlansTab({ values, handler, setActionHandlers, saveStateHandler }: TabProps) {

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(undefined)
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "Номер", code: "number", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Наименование", code: "title", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Тип плана", code: "type", fr: 1 }),
		new ListColumnData({ name: "Возраст", code: "age", fr: 1 }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 0.5 }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 0.5 }),
		new ListColumnData({ name: "Родительский план", code: "parentPlan", fr: 1 }),
		new ListColumnData({ name: "ДС", code: "additionalAgreement", fr: 1 }),
	]

	return (
		<div className="plans-tab">
			<PlanDetails />
			<div className="plans-tab__list">
				<CustomList columnsSettings={columns} searchData={values} getDataHandler={Scripts.getPlans} />
			</div>
		</div>
	)
}

export default PlansTab
