import React, { useRef, useState } from 'react'
import CustomInput from '../../../CustomInput/CustomInput'
import { InputDataString } from '../../../../shared/types'
import InputButton from '../../../InputButton/InputButton'
import icons from '../../../../shared/icons'
import InfoModal from '../../../InfoModal/InfoModal'
import ModalWrapper from '../../../InfoModal/ModalWrapper/ModalWrapper'

interface CustomInputRegionProps {
	/** Список регионов */
	regions: string[]
	/** Является регионом включения? */
	isInclude: boolean
}

function CustomInputRegion(props: CustomInputRegionProps) {
	const {
		isInclude,
		regions,
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [listWidth, setListWidth] = useState<number>(100)
	const rootRef = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const buttonSvg = icons.Triangle

	const [isModalOpen, setIsModalOpen] = useState(false)
	// Обработчик открытия модального окна
	const handleInfoButtonClick = () => {
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}

	// Костыль для отображения значения
	const values = {
		regions: new InputDataString(regions.join(","))
	}

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				values={values}
				name={"regions"}
				wrapperRef={wrapperRef}
				cursor={'text'}
				viewModeButtons={
					regions.length > 0
						? [<InputButton svg={icons.InfoRegion} clickHandler={handleInfoButtonClick} />] : undefined
				}
				isViewMode={true}
			/>
			{/* Модальное окно */}
			{isModalOpen && (
				<ModalWrapper>
					<InfoModal
						title={isInclude ? ' Регион включения' : 'Регион исключения'}
						closeModal={closeModal}
						values={regions}
					></InfoModal>
				</ModalWrapper>
			)}
		</div>
	)
}

export default CustomInputRegion
