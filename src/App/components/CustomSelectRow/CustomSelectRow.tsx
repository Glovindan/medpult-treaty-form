import React, { useState } from 'react'

function CustomSelectRow({ value, clickHandler }: { value: string; clickHandler: any }) {
	return (
		<div className="custom-select__row" onClick={() => clickHandler(value)}>
			{value}
		</div>
	)
}

export default CustomSelectRow
