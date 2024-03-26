import React, { useEffect, useState } from 'react'
import TabSelectorItem from '../TabSelectorItem/TabSelectorItem'

interface TabsWrapperProps {
	children: any,
	defaultTabCode?: string
}

function TabsWrapper({ children, defaultTabCode }: TabsWrapperProps) {
	const [activeTabCode, setActiveTabCode] = useState<string>("")

	const handleSelectorItemClick = (code: string) => {
		console.log(code)
		setActiveTabCode(code);
	}

	const getSelector = () => {
		return children.map(child => {
			return <TabSelectorItem
				activeTabCode={activeTabCode}
				handleClick={handleSelectorItemClick}
				code={child.props.code}
				name={child.props.name}
			/>
		})
	}

	const getActiveTab = () => {
		return children.find(child => child.props.code === activeTabCode)
	}

	useEffect(() => {
		console.log(children)
		if (!defaultTabCode) {
			setActiveTabCode(children[0].props.code)
		} else {
			setActiveTabCode(defaultTabCode)
		}
	}, [])

	return (
		<div className="tabs-wrapper">
			<div className='tabs-wrapper__selector'>
				{getSelector()}
			</div>
			<div className='tabs-wrapper__container'>
				{getActiveTab()}
			</div>
		</div>
	)
}

export default TabsWrapper
