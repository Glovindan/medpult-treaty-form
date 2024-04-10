import React, { useEffect, useState } from 'react';
import TabsWrapper from '../TabsWrapper/TabsWrapper';
import TabItem from '../TabItem/TabItem';
import CustomInput from '../CustomInput/CustomInput';
import LabledField from '../LabledField/LabledField';
import { IInputData } from '../../shared/types';
import CustomInputDate from '../CustomInputDate/CustomInputDate';
import CustomSelect from '../CustomSelect/CustomSelect';
import masks from '../../shared/utils/masks';
import Button from '../Button/Button';

/** Вкладка общее формы изменения плана страхования */
function PlanDetailsGeneralTab(props) {
	const [values, setValues] = useState<any>({});

	// Установка значения поля формы
	const setValue = (name: string, value: IInputData) => {
		setValues({ ...values, [name]: value })
	}

	return (
		<div className="plan-details-general">
			<div className="plan-details-general__columns">

				<div className="plan-details-general__column">
					<LabledField label={"Номер"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} />
					</LabledField>
					<div className="plan-details-general__columns">
						<div className="plan-details-general__column">
							<LabledField label={"Дата начала"}>
								<CustomInputDate isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
						<div className="plan-details-general__column">
							<LabledField label={"Дата окончания"}>
								<CustomInputDate isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} />
							</LabledField>
						</div>
					</div>
					<LabledField label={"Тип ЗХ"}>
						<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
							throw new Error('Function not implemented.');
						}} />
					</LabledField>
					<LabledField label={"Возрастной коэффициент"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
					</LabledField>
					<LabledField label={"Страховая премия по плану на 1 ЗХ, год"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
					</LabledField>
				</div>

				<div className="plan-details-general__column">
					<LabledField label={"Наименование"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Предыдущий план"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} />
					</LabledField>
					<LabledField label={"Возраст"}>
						<div className="plan-age-input">
							<div className="plan-age-input__column">
								<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
								<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
									throw new Error('Function not implemented.');
								}} />
							</div>
							<div className="plan-age-input__separator">
								–
							</div>
							<div className="plan-age-input__column">
								<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
								<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
									throw new Error('Function not implemented.');
								}} />
							</div>
						</div>
					</LabledField>
					<LabledField label={"Коэффициент на родственника"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
					</LabledField>
					<LabledField label={"Страховая сумма по плану на 1 ЗХ, год"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
					</LabledField>
				</div>

				<div className="plan-details-general__column">
					<LabledField label={"Тип плана"}>
						<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
							throw new Error('Function not implemented.');
						}} />
					</LabledField>
					<LabledField label={"Родительский план"}>
						<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
							throw new Error('Function not implemented.');
						}} />
					</LabledField>
					<LabledField label={"Основной регион"}>
						<CustomSelect isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} getDataHandler={function (): Promise<IInputData[]> {
							throw new Error('Function not implemented.');
						}} />
					</LabledField>
					<LabledField label={"Медицинский коэффициент"}>
						<CustomInput isViewMode={props.isViewMode} name='number' inputHandler={setValue} values={values} maskFunction={masks.applyNumbersMask} />
					</LabledField>
				</div>

			</div>
			<div className="plan-details-general__actions">
				<Button clickHandler={() => { }} buttonType='outline' title='ИЗМЕНИТЬ' />
				<Button clickHandler={() => { }} title='ЗАКРЫТЬ' />
			</div>
		</div>
	)
}

export default PlanDetailsGeneralTab
