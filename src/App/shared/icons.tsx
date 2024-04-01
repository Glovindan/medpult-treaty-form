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

const Add = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M12 8V16M8 12H16"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Edit = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Delete = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M13.8284 8.17218L8.17157 13.829M8.17157 8.17218L13.8284 13.829"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
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
	/** Кнопка добавить */
	Add,
	/** Кнопка редактировать */
	Edit,
	/** Кнопка удалить */
	Delete,
}
