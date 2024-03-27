import React, { useEffect, useReducer, useRef, useState } from 'react'

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
	return (
		<button
			className={
				type == ""
					? `button`
					: `button button_${type}`
			}
			onClick={clickHandler}
		>
			{title}
		</button>
	)
}

export default Button
