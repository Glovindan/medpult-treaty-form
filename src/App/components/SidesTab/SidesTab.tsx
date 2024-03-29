import React, { useState } from 'react'

import LabledField from '../LabledField/LabledField';
import CustomInput from '../CustomInput/CustomInput';
import { IFormData, IInputData } from '../../shared/types';
import CustomSelect from '../CustomSelect/CustomSelect';
import Scripts from '../../shared/utils/clientScripts';
import Masks from '../../shared/utils/masks';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import CustomInputAppItem from '../CustomInputAppItem/CustomInputAppItem';
import CustomInputSearch from '../CustomInputSearch/CustomInputSearch';
import SidesTabRow from '../SidesTabRow/SidesTabRow';

type GeneralTabProps = {
	handler: any
	values: IFormData
	isViewMode: boolean
	saveStateHandler: () => void
}

/** Вкладка Общее */
function SidesTab(props: GeneralTabProps) {
	const { handler, values, isViewMode, saveStateHandler } = props;
	return (
		<div className="sides-tab">
			<div className="sides-tab__header">
				<div className="sides-tab__header-item">Тип ответственного лица</div>
				<div className="sides-tab__header-item">Ответственное лицо</div>
			</div>
			<div className="sides-tab__list">
				<SidesTabRow {...props} />
				<SidesTabRow {...props} />
				<SidesTabRow {...props} />
			</div>
		</div>
	)
}

export default SidesTab
