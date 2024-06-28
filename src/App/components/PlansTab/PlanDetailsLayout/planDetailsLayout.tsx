import React, { useState } from 'react';
import TabsWrapper from '../../TabsWrapper/TabsWrapper';
import TabItem from '../../TabItem/TabItem';
import PlanDetailsGeneralTab from '../PlanDetailsGeneralTab/PlanDetailsGeneralTab';
import { DetailsProps, ListColumnData, PlanDetailsData, SortData } from '../../../shared/types';
import CustomList from '../../CustomList/CustomList';
import CustomListRow from '../../CustomList/CustomListRow/CustomListRow';
import Scripts from '../../../shared/utils/clientScripts';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';

class PlanDetailsLayoutProps {
	values: PlanDetailsData;
	setValue: (name: string, value: any) => void
	isViewMode: boolean
}

/** Форма редактирования/просмотра плана страхования */
function PlanDetailsLayout({ values, setValue, isViewMode }: PlanDetailsLayoutProps) {
	return (
		<>
			<TabsWrapper>
				<TabItem code={"general"} name={"Общее"} >
					<PlanDetailsGeneralTab isViewMode={isViewMode} values={values} setValue={setValue} />
				</TabItem>
				{/* <TabItem code={"tou"} name={"ТОУ"}>
					TODO
				</TabItem> */}
			</TabsWrapper>
		</>
	)
}

export default PlanDetailsLayout

