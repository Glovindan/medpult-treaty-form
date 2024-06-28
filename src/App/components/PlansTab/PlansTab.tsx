import React, { useEffect, useState } from 'react';

import { ListColumnData, PlanDetailsData, TabProps, getDetailsLayoutAttributes } from '../../shared/types';
import Scripts from '../../shared/utils/clientScripts';
import CustomList from '../CustomList/CustomList';
import PlanDetails from './PlanDetails/PlanDetails';
import { useMapState } from '../../shared/utils/utils';
import PlanDetailsLayout from './PlanDetailsLayout/planDetailsLayout';
import PlanCreate from '../PlanCreate/PlanCreate';

/** Вкладка Общее */
function PlansTab({ values, setActionHandlers, saveStateHandler }: TabProps) {

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		setActionHandlers.setAddHandler(() => () => { setIsCreateMode(true) })
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "Номер", code: "number", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Наименование", code: "title", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Тип плана", code: "type", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Возраст", code: "age", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 0.5, isSortable: true }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 0.5, isSortable: true }),
		new ListColumnData({ name: "Родительский план", code: "parentPlan", fr: 1, isSortable: true }),
		new ListColumnData({ name: "ДС", code: "additionalAgreement", fr: 1, isSortable: true }),
	]

	// Данные формы деталей плана
	const [planValues, setPlanValue, setPlanValues] = useMapState<PlanDetailsData>(new PlanDetailsData());

	/** Получение формы детальной информации по строке списка Планов страхования */
	const getPlanDetailsLayout = ({ rowData, reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <PlanDetails reloadData={reloadData} columnsSettings={columns} data={rowData} values={planValues} setValue={setPlanValue} setValues={setPlanValues} onClickRowHandler={onClickRowHandler} />
	}

	const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
	const closeCreateMode = () => {
		setIsCreateMode(false);
	}
	/** Получение формы детальной информации по строке списка Планов страхования */
	const getCreatePlanLayout = ({ reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <PlanCreate reloadData={reloadData} values={planValues} setValue={setPlanValue} setValues={setPlanValues} closeHandler={closeCreateMode} />
	}


	return (
		<div className="plans-tab">
			<div className="plans-tab__list">
				<CustomList columnsSettings={columns} getDataHandler={Scripts.getPlans} getDetailsLayout={getPlanDetailsLayout} isCreateMode={isCreateMode} getCreateLayout={getCreatePlanLayout} closeCreateMode={closeCreateMode} isScrollable={false} />
			</div>
		</div>
	)
}

export default PlansTab
