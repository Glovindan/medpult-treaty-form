import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';
import icons from '../../shared/icons';

interface CustomInputSearch extends CustomInputProps {
	getDataHandler: (query?: any) => Promise<any>,
	isViewMode: boolean
}

function CustomInputSearch(props: CustomInputSearch) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [values, setValues] = useState<any[]>([]);
	const [buffer, setBuffer] = useState<any>();
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = async () => {
		// Записать в буфер и очистить в поле
		setBuffer("")
	}

	const loadData = async (query: string) => {
		// Показать лоадер
		setIsLoading(true)

		// Показать данные
		setValues([]);
		const values = await props.getDataHandler(query);
		setValues(values);

		// Скрыть лоадер
		setIsLoading(false)
	}

	const inputHandler = async (name: string, data: IInputData) => {

		props.inputHandler(props.name, data)
		// Показать список
		setIsOpen(true)

		await loadData(data.value);
	}

	const handleOptionClick = async ({ value, data }: { value: string, data?: any }) => {
		console.log(data);
		setIsOpen(false)
		props.inputHandler(props.name, { value: value, data: data })
	}

	/** Не закрывать список подсказок, если адрес неполный */
	useEffect(() => {
		if (props.values[props.name].data && !props.values[props.name].data.isFull) {
			setIsOpen(true)
			loadData(props.values[props.name].value)
		}
	}, [props.values[props.name]])

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	useEffect(() => {
		const handleClick = (event) => {
			const { target } = event;
			console.log(target.className)
			if (!rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [])

	const buttonSvg = icons.Triangle;

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				values={props.values}
				name={props.name}
				clickHandler={clickHandler}
				inputHandler={inputHandler}
				wrapperRef={wrapperRef}
				cursor={props.isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
				isViewMode={props.isViewMode}
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
					{values.map(value => <CustomSelectRow value={value.value} data={{ isFull: value.isFull }} clickHandler={handleOptionClick} />)}
					{isLoading && <Loader />}
				</div>
			</div>
		</div>
	)
}

export default CustomInputSearch
