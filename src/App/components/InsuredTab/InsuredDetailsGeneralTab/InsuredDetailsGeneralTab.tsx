import React from 'react';
import CustomInput from '../../CustomInput/CustomInput';
import LabledField from '../../LabledField/LabledField';
import { InsuredDetailsData } from '../../../shared/types';
import CustomInputDate from '../../CustomInputDate/CustomInputDate';
import CustomSelect from '../../CustomSelect/CustomSelect';
import Scripts from '../../../shared/utils/clientScripts';
import CustomInputAppItem from '../../CustomInputAppItem/CustomInputAppItem';

interface PlanDetailsGeneralTabProps {
	isViewMode: boolean
	values: InsuredDetailsData
	setValue: (name: string, value: any) => void
	saveStateHandler: () => void
}

/** Вкладка общее формы изменения застрахованного */
function InsuredDetailsGeneralTab({ isViewMode, values, setValue, saveStateHandler }: PlanDetailsGeneralTabProps) {

	return (
		<div className="plan-details-general">
			<div className="plan-details-general__columns">

				<div className="plan-details-general__column">
					<LabledField label={"ФИО"}>
						<CustomInputAppItem isViewMode={isViewMode} saveStateHandler={saveStateHandler} href={Scripts.getSelectInsuredPageLinkResponsible()} name='fullname' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Номер договора"}>
						<CustomInput isViewMode={true} name='contractNumber' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Номер полиса"}>
						<CustomInput isViewMode={isViewMode} name='policyNumber' inputHandler={setValue} values={values} />
					</LabledField>
				</div>

				<div className="plan-details-general__column">
					<LabledField label={"Категория"}>
						<CustomSelect isViewMode={isViewMode} name='category' getDataHandler={Scripts.getPolicyCategories} inputHandler={setValue} values={values} />
					</LabledField>

					<div className="plan-details-general__columns">
						<div className="plan-details-general__column">
							<LabledField label={"Дата прикрепления"}>
								<CustomInputDate isViewMode={isViewMode} name='startDate' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
						<div className="plan-details-general__column">
							<LabledField label={"Дата открепления"}>
								<CustomInputDate isViewMode={isViewMode} name='endDate' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
					</div>

					<div className="plan-details-general__columns">
						<div className="plan-details-general__column">
							<LabledField label={"Дата начала действия полиса"}>
								<CustomInputDate isViewMode={isViewMode} name='policyStartDate' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
						<div className="plan-details-general__column">
							<LabledField label={"Дата окончания действия полиса"}>
								<CustomInputDate isViewMode={isViewMode} name='policyEndDate' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
					</div>
				</div>

				<div className="plan-details-general__column">
					<LabledField label={"Текущий план"}>
						<CustomSelect isViewMode={isViewMode} name='currentPlan' inputHandler={setValue} values={values} getDataHandler={Scripts.getParentPlans} />
					</LabledField>
					<LabledField label={"Прикреплен"}>
						<CustomSelect isViewMode={isViewMode} name='attach' inputHandler={setValue} values={values} getDataHandler={Scripts.getParentPlans} />
					</LabledField>
					<LabledField label={"Откреплен"}>
						<CustomSelect isViewMode={isViewMode} name='detach' inputHandler={setValue} values={values} getDataHandler={Scripts.getParentPlans} />
					</LabledField>
				</div>

			</div>
		</div>
	)
}

export default InsuredDetailsGeneralTab
