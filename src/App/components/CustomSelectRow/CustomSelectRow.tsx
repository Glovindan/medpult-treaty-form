import React, { useEffect, useState } from 'react'

function CustomSelectRow({ value, code, data, clickHandler }: { value: string; code?: string, data?: any, clickHandler: any }) {
	return (
		<div className="custom-select__row" onClick={() => clickHandler({ value, code, data })}>
			{value}
		</div>
	)
}

export default CustomSelectRow
