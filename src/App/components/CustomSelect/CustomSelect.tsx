import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';

interface CustomSelectData {
	values: string[]
}

function CustomSelect({ values }: CustomSelectData) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");
	const [listWidth, setListWidth] = useState<number>(100);
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = () => {
		console.log(wrapperRef.current)
		setIsOpen(true)
	}

	const handleOptionClick = (value: string) => {
		setIsOpen(false)
		setValue(value);
	}

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	})

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			console.log(event)
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [isOpen])


	return (
		<div className="custom-select" ref={rootRef}>
			<div
				className={
					isOpen
						? 'custom-select__input-wrapper custom-select__input-wrapper_open'
						: 'custom-select__input-wrapper'
				}

				ref={wrapperRef}
			>
				<input
					className='custom-select__input'
					onClick={clickHandler}
					value={value}
					readOnly
				/>
			</div>
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
					{values.map(value => <CustomSelectRow value={value} clickHandler={handleOptionClick} />)}
				</div>
			</div>
		</div>
	)
}

export default CustomSelect
