import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';
import icons from '../../shared/icons';

interface CustomSelect extends CustomInputProps {
	getDataHandler: () => Promise<IInputData[]>,
	isViewMode?: boolean
}

function CustomSelect(props: CustomSelect) {
	const {
		isViewMode,
		getDataHandler,
		inputHandler,
		name,
		values,
		...customInputProps
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listValues, setListValues] = useState<IInputData[]>([]);
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = async (ev) => {
		ev.stopPropagation();
		if (isViewMode) return;
		if (isOpen) return;
		// Показать список
		setIsOpen(true)
		// Показать лоадер
		setIsLoading(true)

		// Показать данные
		setListValues([]);
		const values = await getDataHandler();
		console.log(values);
		setListValues(values);

		// Скрыть лоадер
		setIsLoading(false)
	}

	const handleOptionClick = ({ value, code }: { value: string, code: string }) => {
		setIsOpen(false)
		if (!inputHandler) return;
		inputHandler(name, { value: value, data: { code: code } })
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

	const buttonSvg = icons.Triangle;

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				values={values}
				name={name}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor={isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
				isViewMode={isViewMode}
				{...customInputProps}
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
					{listValues.map(value => <CustomSelectRow value={value.value} code={value.data.code} clickHandler={handleOptionClick} />)}
					{isLoading && <Loader />}
				</div>
			</div>
		</div>
	)
}

export default CustomSelect
