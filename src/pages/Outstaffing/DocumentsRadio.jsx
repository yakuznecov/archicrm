import React from 'react';

const documentsOptions = [
	{ id: 'radio1', label: 'ЕАЭС', value: 'ЕАЭС' },
	{ id: 'radio2', label: 'Указ президента', value: 'Указ президента' },
];

const DocumentsRadio = ({ selectedDocumentType, handleDocumentTypeChange }) => {

	return (
		<div className="btn-group" role="group" aria-label="Vertical radio toggle button group">
			{documentsOptions?.map((option) => (
				<React.Fragment key={option.id}>
					<input
						type="radio"
						className="btn-check"
						name="vbtn-radio"
						id={option.id}
						value={option.value}
						checked={selectedDocumentType === option.value}
						onChange={handleDocumentTypeChange}
					/>
					<label className="btn btn-outline-danger" htmlFor={option.id}>
						{option.label}
					</label>
				</React.Fragment>
			))}
		</div>
	)
}

export default DocumentsRadio;