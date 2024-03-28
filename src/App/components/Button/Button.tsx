import React, { ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import Loader from '../Loader/Loader';

interface ButtonData {
	title: string,
	clickHandler: any
	type?: string,
}

function Button({
	title,
	type,
	clickHandler
}: ButtonData) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [loader, setLoader] = useState<ReactNode>(<div><Loader /></div>)

	const loadOnClick = async () => {
		setIsLoading(true)
		const buttonWidth = (buttonRef.current?.getBoundingClientRect().width ?? 40) - 40;
		console.log(buttonRef.current)
		const loaderElement = <div style={{ width: buttonWidth + "px" }}><Loader /></div>
		setLoader(loaderElement)
		await clickHandler();
		setIsLoading(false)
	}

	const buttonContent = isLoading
		? loader
		: title

	return (
		<button
			className={
				type == ""
					? `button`
					: `button button_${type}`
			}
			disabled={isLoading}
			onClick={loadOnClick}
			ref={buttonRef}
		>
			{buttonContent}
		</button>
	)
}

export default Button
