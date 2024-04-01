import React, { useState } from 'react'
import { IFormData, IInputData, InputDataCategory } from '../../shared/types'
import CustomSelect from '../CustomSelect/CustomSelect'
import Scripts from '../../shared/utils/clientScripts'
import CustomInputAppItem from '../CustomInputAppItem/CustomInputAppItem'

type SidesTabRowProps = {
	index: number
	type: InputDataCategory
	contractor: InputDataCategory
	isEdit?: boolean
	values: IFormData
	handler: any
}

/** Вкладка Общее */
function SidesTabRow({ index, type, contractor, isEdit, values, handler }: SidesTabRowProps) {
	const selectHandler = (name: string, data: IInputData) => {
		console.log(handler)
		const sides = values.sides;
		sides[index].type = new InputDataCategory(data.value, data.data.code);

		handler("sides", sides)
	}

	const getValueHandler = () => {
		const sides = values.sides;
		return sides[index].type.value
	}

	const editLayout = ([
		<CustomSelect getValueHandler={getValueHandler} getDataHandler={Scripts.getResponsibleTypes} name='sides' values={values} inputHandler={selectHandler} />,
		<CustomInputAppItem getValueHandler={getValueHandler} getDataHandler={Scripts.getResponsibleTypes} name='sides' values={values} inputHandler={selectHandler} />
	])

	const viewLayout = ([
		<div className="sides-tab-row__type">{type.value}</div>,
		<div className="sides-tab-row__contractor">{contractor.value}</div>
	])

	return (
		<div className="sides-tab-row">
			{
				isEdit
					? editLayout
					: viewLayout
			}
		</div>
	)
}

export default SidesTabRow
