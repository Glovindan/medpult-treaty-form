import React, { useEffect, useState } from 'react';

import { AmendmentDetailsData, ListColumnData, TabProps, getDetailsLayoutAttributes } from '../../shared/types';
import CustomList from '../CustomList/CustomList';
import Scripts from '../../shared/utils/clientScripts';
import { useMapState } from '../../shared/utils/utils';
import AmendmentDetails from './AmendmentDetails/AmendmentDetails';

/** Вкладка ДС */
function AmendmentTab({ setActionHandlers }: TabProps) {

	// Установка обработчиков нажатия на кнопки действий в заголовке вкладок
	useEffect(() => {
		// setActionHandlers.setAddHandler(() => () => { setIsCreateMode(true) })
		setActionHandlers.setAddHandler(undefined)
		setActionHandlers.setEditHandler(undefined)
		setActionHandlers.setDeleteHandler(undefined)
	}, [])

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "Номер договора", code: "contract", fr: 1.5, isSortable: true }),
		new ListColumnData({ name: "Доп. соглашение", code: "amendment", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Дата подписания", code: "conclusionDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Тип ДС", code: "amendmentType", fr: 2, isSortable: true }),
		new ListColumnData({ name: "Дата начала", code: "startDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Дата окончания", code: "endDate", fr: 1, isSortable: true }),
		new ListColumnData({ name: "Статус", code: "status", fr: 2, isSortable: true }),
	]

	// Данные формы деталей ДС
	const [amendmentValues, setAmendmentValue, setAmendmentValues] = useMapState<AmendmentDetailsData>(new AmendmentDetailsData());

	/** Получение формы детальной информации по строке списка ДС */
	const getAmendmentDetailsLayout = ({ rowData, reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
		return <AmendmentDetails reloadData={reloadData} columnsSettings={columns} data={rowData} values={amendmentValues} setValue={setAmendmentValue} setValues={setAmendmentValues} onClickRowHandler={onClickRowHandler} />
	}

	// const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
	// const closeCreateMode = () => {
	// 	setIsCreateMode(false);
	// }
	// /** Получение формы детальной информации по строке списка ДС */
	// const getCreateAmendmentLayout = ({ reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => {
	// 	return <AmendmentDetails reloadData={reloadData} columnsSettings={columns} data={{ ...amendmentValues, id: "" }} values={amendmentValues} setValue={setAmendmentValue} setValues={setAmendmentValues} onClickRowHandler={closeCreateMode} />
	// }

	return (
		<div className="amendment-tab">
			<CustomList getDetailsLayout={getAmendmentDetailsLayout} /* getCreateLayout={getCreateAmendmentLayout} isCreateMode={isCreateMode} */ columnsSettings={columns} getDataHandler={Scripts.getAmendments} isScrollable={false} />
		</div>
	)
}

export default AmendmentTab
