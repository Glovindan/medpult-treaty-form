import React, { useEffect } from 'react';
import TabsWrapper from '../TabsWrapper/TabsWrapper';
import TabItem from '../TabItem/TabItem';
import PlanDetailsGeneralTab from '../PlanDetailsGeneralTab/PlanDetailsGeneralTab';

/** Форма редактирования/просмотра плана страхования */
function PlanDetails(props) {

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
			<div className="plan-details__programs"></div>
		</div>
	)
}

export default PlanDetails
