import React from "react"

const Search = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="10"
			cy="10"
			r="6"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M14.5 14.5L19 19"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Calendar = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<rect x="6" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
		<rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
		<rect x="15" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
	</svg>
)

const Triangle = (
	<svg
		height="10px"
		width="10px"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill="#64C3F4"
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
		/>
	</svg>
)

const Cross = (
	<svg
		height="100%"
		width="100%"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M8 8L16 16" stroke="#64C3F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M16 8L8 16" stroke="#64C3F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
)

export default {
	/** Лупа */
	Search,
	/** Календарь */
	Calendar,
	/** Маленький треугольник */
	Triangle,
	/** Крест */
	Cross,
}
