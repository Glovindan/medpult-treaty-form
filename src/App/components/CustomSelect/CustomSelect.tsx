import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';

interface CustomSelect extends CustomInputProps {
	getDataHandler: () => Promise<IInputData[]>
}

function CustomSelect(props: CustomSelect) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [values, setValues] = useState<IInputData[]>([]);
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = async () => {
		// Показать список
		setIsOpen(true)
		// Показать лоадер
		setIsLoading(true)

		// Показать данные
		setValues([]);
		const values = await props.getDataHandler();
		setValues(values);

		// Скрыть лоадер
		setIsLoading(false)
	}

	const handleOptionClick = (value: string) => {
		setIsOpen(false)
		console.log("handleOptionClick")
		props.inputHandler(props.name, { value: value })
	}

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isOpen])

	const buttonSvg = <svg height='10px' width='10px' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill="#64C3F4" d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' /></svg>

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				values={props.values}
				name={props.name}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor='pointer'
				isOpen={isOpen}
				buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
				readOnly
			/>
			<div
				className={
					isOpen
						? 'custom-select__list-wrapper custom-select__list-wrapper_open'
						: 'custom-select__list-wrapper'
				}

				style={{
					width: listWidth + "px"
				}}
			>
				<div className="custom-select__list">
					{values.map(value => <CustomSelectRow value={value.value} clickHandler={handleOptionClick} />)}
					{isLoading && <Loader />}
				</div>
			</div>
		</div>
	)
}

export default CustomSelect
