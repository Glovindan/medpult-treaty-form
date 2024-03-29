import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import { CustomInputProps, IFormData } from '../../shared/types';

function CustomInput(props) {
	const {
		values,
		name,
		buttons,
		cursor = "text",
		inputHandler,
		clickHandler,
		isOpen = false,
		wrapperRef = useRef<HTMLDivElement>(null),
		readOnly = false,
		isViewMode = false,
		placeholder = "",
		maskFunction,
		...inputStyles
	} = props;

	const getValueByName = () => {
		const value = values[name];
		if (!value) return "";

		return value.value
	}

	const onInput = (ev) => {
		if (!inputHandler) return;

		let value = ev.target.value;
		if (maskFunction) value = maskFunction(ev.target.value)

		inputHandler(name, { value: value })
	}

	let buttonsWrapper;

	if (!isViewMode && buttons) {
		buttonsWrapper =
			<div className='custom-input__buttons'>
				{buttons}
			</div>
	}

	return (
		<div
			className={
				isOpen
					? 'custom-input__wrapper custom-input__wrapper_open'
					: 'custom-input__wrapper'
			}

			ref={wrapperRef}
		>
			<input
				name={name}
				className='custom-input__input'
				style={{
					cursor: cursor
				}}
				onInput={onInput}
				onClick={clickHandler}
				value={getValueByName()}
				readOnly={readOnly || isViewMode}
				placeholder={placeholder}
				{...inputStyles}
			/>
			{buttonsWrapper}
		</div>
	)
}

export default CustomInput
