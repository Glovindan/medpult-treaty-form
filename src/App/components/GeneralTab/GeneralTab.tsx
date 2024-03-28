import React, { useState } from 'react'

import LabledField from '../LabledField/LabledField';
import CustomInput from '../CustomInput/CustomInput';
import { IFormData, IInputData } from '../../shared/types';
import CustomSelect from '../CustomSelect/CustomSelect';
import Scripts from '../../shared/utils/clientScripts';
import Masks from '../../shared/utils/masks';
import CustomInputDate from '../CustomInputDate/CustomInputDate';

type GeneralTabProps = {
	handler: any
	values: IFormData
}

function GeneralTab({ handler, values }: GeneralTabProps) {
	return (
		<div className="general-tab general-tab__columns">
			<div className="general-tab__column">
				<LabledField label={"Номер"}>
					<CustomInput name='number' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Страхователь"}>
					<CustomInput name='policyHolder' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Продукт"}>
					<CustomSelect getDataHandler={Scripts.getProducts} name='objProduct' inputHandler={handler} values={values} />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Статус"}>
							<CustomSelect getDataHandler={Scripts.getStatuses} name='status' inputHandler={handler} values={values} />
						</LabledField>
						<LabledField label={"Дата начала действия"}>
							<CustomInputDate name='startDate' inputHandler={handler} values={values} />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Дата заключения"}>
							<CustomInputDate name='conclusionDate' inputHandler={handler} values={values} />
						</LabledField>
						<LabledField label={"Дата окончания действия"}>
							<CustomInputDate name='endDate' inputHandler={handler} values={values} />
						</LabledField>
					</div>
				</div>
			</div>

			<div className="general-tab__column">
				<LabledField label={"Канал продажи"}>
					<CustomSelect getDataHandler={Scripts.getChannels} name='channel' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Регион заключения"}>
					<CustomInput name='region' inputHandler={handler} values={values} />
				</LabledField>
				<LabledField label={"Валюта договора"}>
					<CustomSelect getDataHandler={Scripts.getCurrencies} name='currency' inputHandler={handler} values={values} />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору"}>
							<CustomInput name='insuranceAmount' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
						<LabledField label={"Страховая премия по договору"}>
							<CustomInput name='insurancePremium' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору, руб"}>
							<CustomInput name='insuranceAmountRub' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
						<LabledField label={"Страховая премия по договору, руб"}>
							<CustomInput name='insurancePremiumRub' inputHandler={handler} values={values} maskFunction={Masks.applyNumbersMask} />
						</LabledField>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GeneralTab
