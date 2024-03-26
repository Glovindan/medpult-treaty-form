import React, { useContext, useState } from 'react'

import CustomSelect from './components/CustomSelect/CustomSelect'
import LabledField from './components/LabledField/LabledField'
import CustomInput from './components/CustomInput/CustomInput'
import Panel from './components/Panel/Panel'
import TabItem from './components/TabItem/TabItem'
import TabsWrapper from './components/TabsWrapper/TabsWrapper'
import GeneralTab from './components/GeneralTab/GeneralTab'
import Button from './components/Button/Button'

export default function App() {
	const [value, setValue] = useState<string>("test")

	const handleInput = (ev) => {
		setValue(ev.target.value)
	}

	return (
		<>
			<div style={{ background: "#F2F4F6", padding: "20px", height: "100%" }}>
				<Panel label={"Договор  001СБС00123456/2023ДМС от 01.12.2023 "}>
					<TabsWrapper>
						<TabItem code={"general"} name={"Общее"}>
							<GeneralTab />
						</TabItem>
						<TabItem code={"sides"} name={"Стороны"}>
							<LabledField label={"Номер"}>
								<CustomSelect values={[
									"turbo",
									"gmail",
									"com",
									"turbo",
									"gmail",
									"com",
									"turbo",
									"gmail",
									"com",
									"turbo",
									"gmail",
									"com",
								]} />
							</LabledField>
							<LabledField label={"Номер"}>
								<CustomInput
									value={value}
									inputHandler={handleInput}
								/>
							</LabledField>
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
