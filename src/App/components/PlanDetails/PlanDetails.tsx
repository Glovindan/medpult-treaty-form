import React, { useEffect } from 'react';
import TabsWrapper from '../TabsWrapper/TabsWrapper';
import TabItem from '../TabItem/TabItem';
import PlanDetailsGeneralTab from '../PlanDetailsGeneralTab/PlanDetailsGeneralTab';
import { ListColumnData } from '../../shared/types';
import CustomList from '../CustomList/CustomList';

/** Форма редактирования/просмотра плана страхования */
function PlanDetails(props) {
	/** Колонки списка программ */
	const columns = [
		new ListColumnData({ name: "номер", code: "number", fr: 1, isSortable: true }),
		new ListColumnData({ name: "наименование", code: "title", fr: 1, isSortable: true }),
		new ListColumnData({ name: "маркетинговое наименование", code: "marketingTitle", fr: 2 }),
	]

	const getPrograms = (data: any) => {
		return {
			data: [
				{
					"number": {
						"value": "IP000169/23"
					},
					"title": {
						"value": "Онко ТКМ"
					},
					"marketingTitle": {
						"value": "Лечение онкологии и трансплантация костного мозга"
					}
				},
				{
					"number": {
						"value": "IP000169/22"
					},
					"title": {
						"value": "Онко ТКМ"
					},
					"marketingTitle": {
						"value": "Лечение онкологии"
					}
				}
			],
			hasMore: false
		}
	}

	return (
		<div className="plan-details">
			<div className="plan-details__tabs">
				<TabsWrapper>
					<TabItem code={"general"} name={"Общее"} >
						<PlanDetailsGeneralTab />
					</TabItem>
					<TabItem code={"tou"} name={"ТОУ"}>
						TODO
					</TabItem>
				</TabsWrapper>
			</div>
			<div className="plan-details__programs">
				<div className="plan-details__programs-title">
					<span>программы</span>
				</div>
				<CustomList columnsSettings={columns} getDataHandler={getPrograms} isScrollable={false} />
			</div>
		</div>
	)
}

export default PlanDetails

