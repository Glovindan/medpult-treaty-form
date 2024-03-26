import React, { useState } from 'react'

import LabledField from '../LabledField/LabledField';
import CustomInput from '../CustomInput/CustomInput';

function GeneralTab() {
	return (
		<div className="general-tab__columns">
			<div className="general-tab__column">
				<LabledField label={"Номер"}>
					<CustomInput />
				</LabledField>
				<LabledField label={"Страхователь"}>
					<CustomInput />
				</LabledField>
				<LabledField label={"Продукт"}>
					<CustomInput />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Статус"}>
							<CustomInput />
						</LabledField>
						<LabledField label={"Дата начала действия"}>
							<CustomInput />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Дата заключения"}>
							<CustomInput />
						</LabledField>
						<LabledField label={"Дата окончания действия"}>
							<CustomInput />
						</LabledField>
					</div>
				</div>
			</div>

			<div className="general-tab__column">
				<LabledField label={"Канал продажи"}>
					<CustomInput />
				</LabledField>
				<LabledField label={"Регион заключения"}>
					<CustomInput />
				</LabledField>
				<LabledField label={"Валюта договора"}>
					<CustomInput />
				</LabledField>
				<div className="general-tab__columns">
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору"}>
							<CustomInput />
						</LabledField>
						<LabledField label={"Страховая премия по договору"}>
							<CustomInput />
						</LabledField>
					</div>
					<div className="general-tab__column">
						<LabledField label={"Страховая сумма по договору, руб"}>
							<CustomInput />
						</LabledField>
						<LabledField label={"Страховая премия по договору, руб"}>
							<CustomInput />
						</LabledField>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GeneralTab
