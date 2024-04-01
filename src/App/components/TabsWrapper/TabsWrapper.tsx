import React, { useEffect, useState } from 'react'
import TabSelectorItem from '../TabSelectorItem/TabSelectorItem'
import Icons from '../../shared/icons'
import TabButton from '../TabButton/TabButton'

interface TabsWrapperProps {
	children: any,
	defaultTabCode?: string,
	addHandler?: () => void,
	editHandler?: () => void,
	deleteHandler?: () => void
}

function TabsWrapper({ children, defaultTabCode, addHandler, editHandler, deleteHandler }: TabsWrapperProps) {
	const [activeTabCode, setActiveTabCode] = useState<string>("")

	const handleSelectorItemClick = (code: string) => {
		console.log(code)
		setActiveTabCode(code);
	}

	const createSelectorItem = (child: any) => {
		return <TabSelectorItem
			activeTabCode={activeTabCode}
			handleClick={handleSelectorItemClick}
			code={child.props.code}
			name={child.props.name}
		/>
	}

	const getSelector = () => {
		let array = children.length ? children : [children]
		return array.map(child => {
			return createSelectorItem(child)
		})
	}

	const getActiveTab = () => {
		let array = children.length ? children : [children]
		return array.find(child => child.props.code === activeTabCode)
	}

	useEffect(() => {
		console.log(children)
		if (!Array.isArray(children)) {
			setActiveTabCode(children.props.code)
			return
		}
		if (!defaultTabCode) {
			setActiveTabCode(children[0].props.code)
		} else {
			setActiveTabCode(defaultTabCode)
		}
	}, [])

	return (
		<div className="tabs-wrapper">
			<div className='tabs-wrapper__header'>
				<div className='tabs-wrapper__selector'>
					{getSelector()}
				</div>
				<div className='tabs-wrapper__actions'>
					{!!addHandler && <TabButton svg={Icons.Add} clickHandler={addHandler} title='добавить' />}
					{!!editHandler && <TabButton svg={Icons.Edit} clickHandler={editHandler} title='редактировать' />}
					{!!deleteHandler && <TabButton svg={Icons.Delete} clickHandler={deleteHandler} title='удалить' />}
				</div>
			</div>
			<div className='tabs-wrapper__container'>
				{getActiveTab()}
			</div>
		</div>
	)
}

export default TabsWrapper
