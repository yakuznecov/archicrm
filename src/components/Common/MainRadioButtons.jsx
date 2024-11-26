import React from 'react';

const MainRadioButtons = ({ radioOptions, selectedRadio, setSelectedRadio, handleRadioChange }) => {
	return (
		<div className="application_radio">
			<div className="btn-group w-100" role="group" aria-label="Basic radio toggle button group">
				{radioOptions?.map(({ id, name, value, label }) => (
					<React.Fragment key={id}>
						<input
							type="radio"
							className="btn-check"
							name={name}
							id={id}
							autoComplete="off"
							value={value}
							checked={selectedRadio === value}
							onChange={handleRadioChange}
						/>
						<label className="btn btn-light archi__radio_btn" htmlFor={id}>
							{label}
						</label>
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default MainRadioButtons;
