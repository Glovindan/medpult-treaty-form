import React, { useContext, useEffect, useState } from 'react'

import CustomSelect from './components/CustomSelect/CustomSelect'
import LabledField from './components/LabledField/LabledField'
import CustomInput from './components/CustomInput/CustomInput'
import Panel from './components/Panel/Panel'
import TabItem from './components/TabItem/TabItem'
import TabsWrapper from './components/TabsWrapper/TabsWrapper'
import GeneralTab from './components/GeneralTab/GeneralTab'
import Button from './components/Button/Button'
import { ICategory, IFormData, IInputData } from './shared/types'
import Loader from './components/Loader/Loader'

export default function App() {
	const [values, setValues] = useState<IFormData>({
		number: { value: "" },
		policyHolder: { value: "" },
		objProduct: { value: "" },
		channel: { value: "" },
		region: { value: "" },
		currency: { value: "" },
		status: { value: "" },
		conclusionDate: { value: "" },
		startDate: { value: "" },
		endDate: { value: "" },
	});

	// Установка значения поля формы
	const setValue = (name: string, value: IInputData) => {
		setValues({ ...values, [name]: value })
	}

	// Debug
	useEffect(() => {
		console.log(values)
	}, [values])

	return (
		<>
			<div style={{ background: "#F2F4F6", padding: "20px", height: "100%" }}>
				<Panel label={"Договор  001СБС00123456/2023ДМС от 01.12.2023 "}>
					<TabsWrapper>
						<TabItem code={"general"} name={"Общее"}>
							<GeneralTab handler={setValue} values={values} />
						</TabItem>
						<TabItem code={"sides"} name={"Стороны"}>
							<Loader />
						</TabItem>
					</TabsWrapper>
					<div style={{ padding: "0 18px 18px 18px", textAlign: "right", display: "flex", gap: "18px", flexDirection: "row", justifyContent: "flex-end" }}>
						<Button clickHandler={() => { }} type='outline' title='ИЗМЕНИТЬ' />
						<Button clickHandler={() => { }} type='outline' title='СОХРАНИТЬ' />
						<Button clickHandler={() => { }} title='ЗАКРЫТЬ' />
					</div>
				</Panel>
			</div>
		</>
	)
}
