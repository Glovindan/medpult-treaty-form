import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import { CustomInputProps, IFormData } from '../../shared/types';
import CustomInput from '../CustomInput/CustomInput';
import InputButton from '../InputButton/InputButton';
import Masks from '../../shared/utils/masks';

function CustomInputDate(props) {
	const { type = "date", inputHandler, name } = props;
	const pickerRef = useRef<HTMLInputElement>(null)

	const buttonSvg = <svg width='100%' height='100%' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7' stroke='#64C3F4' stroke-width='2' stroke-linecap='round' /><rect x='6' y='12' width='3' height='3' rx='0.5' fill='#64C3F4' /><rect x='10.5' y='12' width='3' height='3' rx='0.5' fill='#64C3F4' /><rect x='15' y='12' width='3' height='3' rx='0.5' fill='#64C3F4' /></svg>

	const openPicker = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		picker.showPicker();
	}

	//  При изменении значения пикера
	const onChangePickerValue = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		let value = "";
		switch (picker.type) {
			case "date":
				{
					const values = picker.value.split("-");
					value = values.reverse().join(".");
					break;
				}
			case "time":
				{
					value = picker.value;
					break;
				}
			case "datetime-local":
				{
					const values = picker.value.split("T");
					const dateValues = values[0].split("-");
					const timeValue = values[1];

					value = dateValues.reverse().join(".") + " " + timeValue;
					break;
				}
		}

		inputHandler(name, { value: value })
	}

	return (
		<div className='custom-input-date'>
			<input type={type} onChange={onChangePickerValue} className='custom-input-date__picker' ref={pickerRef} />
			<CustomInput
				{...props}
				buttons={<InputButton svg={buttonSvg} clickHandler={openPicker} />}
				placeholder={"ДД.ММ.ГГГГ"}
				maskFunction={Masks.applyDateMask}
			/>
		</div>
	)
}

export default CustomInputDate
