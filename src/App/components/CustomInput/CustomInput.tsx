import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';

interface CustomInputData {
	value?: string,
	inputHandler?: (ev) => void,
	clickHandler?: () => void,
	cursor?: string,
	isOpen?: boolean,
	wrapperRef?: React.RefObject<HTMLDivElement>,
	readOnly?: boolean
}

function CustomInput({ 
	value = "", 
	cursor = "text", 
	inputHandler,
	clickHandler, 
	isOpen = false, 
	wrapperRef = useRef<HTMLDivElement>(null) ,
	readOnly = false
}: CustomInputData) {

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
				className='custom-input__input'
				style={{
					cursor: cursor
				}}
				onInput={inputHandler}
				onClick={clickHandler}
				value={value}
				readOnly={readOnly}
			/>
		</div>
	)
}

export default CustomInput
