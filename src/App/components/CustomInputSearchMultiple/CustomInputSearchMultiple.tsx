import React, { useEffect, useState } from 'react';
import { CustomInputProps, IInputData, InputDataCategory } from '../../shared/types';
import CustomInputSearch from '../CustomInputSearch/CustomInputSearch';
import SearchElement from './SearchElement/SearchElement';

interface CustomInputSearchMultipleProps extends CustomInputProps {
	getDataHandler: (query?: any) => Promise<InputDataCategory[]>,
	isViewMode: boolean
	/** Загружать сразу при нажатии */
	isLoadOnClick?: boolean
	/** Запись значения */
	inputHandler: (name: string, value: InputDataCategory[]) => void
}

/** Выпадающий список с множественным выбором и поиском */
export default function CustomInputSearchMultiple(props: CustomInputSearchMultipleProps) {
	const { isLoadOnClick, isViewMode, getDataHandler, values, name, inputHandler } = props

	const getValues = (): InputDataCategory[] => {
		return values[name]
	}

	/** Добавление значения в фильтр */
	const addValue = (name: string, value: InputDataCategory) => {
		const newValues: InputDataCategory[] = getValues();
		if (Boolean(newValues.find(item => item.data.code === value.data.code))) return;
		newValues.push(value);

		inputHandler(name, newValues)
	}

	/** Счетчик выбранных значений */
	// Количество элементов
	const [selectedItemsCount, setSelectedItemsCount] = useState<number>(getValues().length);

	// Изменение счетчика выбранных элементов
	React.useLayoutEffect(() => {
		setSelectedItemsCount(getValues().length)
	}, [getValues().length])

	// Надпись о количестве выбранных элементов
	const selectedItemsLabel = `Выбрано: ${selectedItemsCount}`

	/** Обработчик удаления элемента */
	const deleteHandler = (code: string) => {
		const newValues: InputDataCategory[] = getValues();
		const filteredValues = newValues.filter(item => item.data.code !== code);

		inputHandler(name, filteredValues)
	}

	/** Получение данных без дубликатов */
	const getDataFiltered = async (query?: string): Promise<InputDataCategory[]> => {
		const data = await getDataHandler(query);
		const filteredData = data.filter(value => !Boolean(getValues().find(item => item.data.code === value.data.code)))

		return filteredData;
	}

	return (
		<div className="custom-input-search-multiple">
			{!isViewMode && <div className="custom-input-search-multiple__select"><CustomInputSearch {...props} inputHandler={addValue} getDataHandler={getDataFiltered} getValueHandler={() => selectedItemsLabel} /> </div>}
			<div className="custom-input-search-multiple__variants">
				{getValues().map(item => <SearchElement isViewMode={isViewMode} name={item.value} deleteHandler={() => deleteHandler(item.data.code)} />)}
			</div>
		</div>
	)
}