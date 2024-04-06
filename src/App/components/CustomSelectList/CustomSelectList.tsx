import React, { PropsWithChildren, useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';
import icons from '../../shared/icons';

interface CustomSelectListProps {
	rootRef: React.RefObject<HTMLDivElement>,
	isOpen: boolean,
	closeHandler: () => void,
	isLoading: boolean,
	listWidth: number
}

function CustomSelectList({
	rootRef,
	isOpen,
	closeHandler,
	isLoading,
	listWidth,
	children
}: PropsWithChildren<CustomSelectListProps>) {

	/** Клик снаружи списка */
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				closeHandler();
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isOpen])

	return (
		<div
			className='custom-select-list'

			style={{
				width: listWidth + "px"
			}}
		>
			<div className="custom-select-list__content">
				{children}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomSelectList
