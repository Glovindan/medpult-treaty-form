import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';
import icons from '../../shared/icons';
import CustomSelectList from '../CustomSelectList/CustomSelectList';
import { useDebounce } from '../../shared/utils/utils';

interface CustomInputSearch extends CustomInputProps {
	getDataHandler: (query?: any) => Promise<any>,
	isViewMode: boolean
	/** Загружать сразу при нажатии */
	isLoadOnClick?: boolean
}

function CustomInputSearch(props: CustomInputSearch) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [values, setValues] = useState<any[]>([]);
	const [buffer, setBuffer] = useState<any>();
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	// Значение поискового запроса
	const [query, setQuery] = useState<string>("");
	// Значение поискового запроса с debounce
	const deferredQuery = useDebounce(query, 500);

	useEffect(() => {
		loadData(query);
	}, [deferredQuery])

	const clickHandler = async () => {
		// Записать в буфер и очистить в поле
		setBuffer("")

		if (props.isLoadOnClick && !props.isViewMode) {
			setIsOpen(true);
			loadData(props.values[props.name].value);
		}
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
		if (!props.inputHandler || props.isViewMode) return
		props.inputHandler(props.name, data)

		setQuery(data.value)
		// Показать список
		setIsOpen(true)
	}

	const handleOptionClick = async ({ value, data }: { value: string, data?: any }) => {
		console.log(data);
		setIsOpen(false)

		if (!props.inputHandler) return
		props.inputHandler(props.name, { value: value, data: data })
	}

	/** Не закрывать список подсказок, если адрес неполный */
	React.useLayoutEffect(() => {
		const isFull = props.values[props.name].data?.isFull
		if (props.values[props.name].data && isFull === false) {
			setIsOpen(true)
			loadData(props.values[props.name].value)
		}
	}, [props.values[props.name]])

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

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
			{isOpen &&
				<CustomSelectList
					rootRef={rootRef}
					isOpen={isOpen}
					closeHandler={() => setIsOpen(false)}
					isLoading={isLoading}
					listWidth={listWidth}
				>
					{values.map(value =>
						<CustomSelectRow
							value={value.value}
							data={value.data}
							clickHandler={handleOptionClick}
						/>
					)}
				</CustomSelectList>
			}
		</div>
	)
}

export default CustomInputSearch
