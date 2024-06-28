import React from 'react';
import CustomInput from '../../CustomInput/CustomInput';
import LabledField from '../../LabledField/LabledField';
import { ProgramDetailsData } from '../../../shared/types';
import CustomInputDate from '../../CustomInputDate/CustomInputDate';
import CustomSelect from '../../CustomSelect/CustomSelect';
import masks from '../../../shared/utils/masks';
import Scripts from '../../../shared/utils/clientScripts';
import CustomInputSearch from '../../CustomInputSearch/CustomInputSearch';

interface ProgramDetailsGeneralTabProps {
	isViewMode: boolean
	values: ProgramDetailsData
	setValue: (name: string, value: any) => void
}

/** Вкладка общее формы изменения плана страхования */
function ProgramDetailsGeneralTab({ isViewMode, values, setValue }: ProgramDetailsGeneralTabProps) {

	return (
		<div className="program-details-general">
			<div className="program-details-general__columns">

				<div className="program-details-general__column">
					<LabledField label={"Наименование"}>
						<CustomInput isViewMode={isViewMode} name='name' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Тип программы страхования"}>
						<CustomSelect isViewMode={isViewMode} name='type' inputHandler={setValue} values={values} getDataHandler={Scripts.getProgramTypes} />
					</LabledField>
				</div>

				<div className="program-details-general__column">
					<LabledField label={"Номер"}>
						<CustomInput isViewMode={isViewMode} name='number' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Маркетинговое наименование"}>
						<CustomInput isViewMode={isViewMode} name='marketingName' inputHandler={setValue} values={values} />
					</LabledField>
				</div>

				<div className="program-details-general__column">
					<LabledField label={"Риск / Спец.Риск"}>
						<CustomSelect isViewMode={isViewMode} name='riskType' inputHandler={setValue} values={values} getDataHandler={Scripts.getRiskTypes} />
					</LabledField>
					<LabledField label={"Валюта ответственности"}>
						<CustomSelect isViewMode={isViewMode} name='currency' inputHandler={setValue} values={values} getDataHandler={Scripts.getCurrencies} />
					</LabledField>
				</div>

			</div>
		</div>
	)
}

export default ProgramDetailsGeneralTab
