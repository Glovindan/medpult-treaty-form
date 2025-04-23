import React from 'react'
import icons from '../../shared/icons'
import InputButton from '../InputButton/InputButton'

interface InfoModalProps {
	/** Заголовок модального окна */
	title: string
	/** Отменить */
	closeModal: () => void
	/** Массив значений для отображения (по строкам) */
	values?: string[]
	children?: React.ReactNode
}

/** Универсальное модальное окно */
export default function InfoModal({ title, closeModal, values, children }: InfoModalProps) {
	return (
		<div className="info-modal">
			<div className="info-modal__header">
				<span className="info-modal__label">{title}</span>
				<InputButton svg={icons.Cross} clickHandler={closeModal} />
			</div>
			<div className="info-modal__content" style={{ width: '420px' }}>
				<div className="info-modal__fields">
					{values && Array.isArray(values) ? (
						<>
							{values.map((value, index) => (
								<p key={index}>{value}</p>
							))}
						</>
					) : (
						children
					)}
				</div>
			</div>
		</div>
	)
}
