// радио кнопки выбора типа адресов при создании адреса
import React from 'react';

const addressOptions = [
	{ id: 'vbtn-radio1', label: 'Фактический адрес', value: 'Фактический Адрес' },
	{ id: 'vbtn-radio2', label: 'Юридический адрес', value: 'Юридический Адрес' },
	{ id: 'vbtn-radio3', label: 'Адрес пункта 1.2', value: 'Адрес пункта 1.2' },
	{ id: 'vbtn-radio4', label: 'Адрес пункта 3.4', value: 'Адрес пункта 3.4' },
	// { id: 'vbtn-radio5', label: 'Адрес подачи в уведомлении', value: 'Адрес подачи в уведомлении' },
	{ id: 'vbtn-radio5', label: 'Место подачи в уведомлении', value: 'Место подачи в уведомлении' },
];

const CompanyAddressRadio = ({ selectedType, handleOptionChange }) => {
	return (
		<div className="btn-group-vertical mb-4" role="group" aria-label="Vertical radio toggle button group">
			{addressOptions?.map((option) => (
				<React.Fragment key={option.id}>
					<input
						type="radio"
						className="btn-check"
						name="vbtn-radio"
						id={option.id}
						value={option.value}
						checked={selectedType === option.value}
						onChange={handleOptionChange}
					/>
					<label className="btn btn-outline-danger" htmlFor={option.id}>
						{option.label}
					</label>
				</React.Fragment>
			))}
		</div>
	);
};

export default CompanyAddressRadio;
