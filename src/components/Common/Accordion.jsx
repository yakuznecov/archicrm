import React, { useState } from 'react';
import cn from 'classnames';
import { Collapse } from 'reactstrap';

const Accordion = ({ title, children, count, hasOpen = false }) => {
	const [isOpen, setIsOpen] = useState(hasOpen);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="accordion archi__accordion mb-2">
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className={cn('accordion-button', 'fw-medium', 'font-size-14', {
							collapsed: !isOpen,
						})}
						type="button"
						onClick={toggleAccordion}
						style={{ cursor: 'pointer' }}
					>
						{title}
					</button>
					{count && <span className="archi__acc_text">Количество записей:</span>}
					<span className="archi__acc_count">{count}</span>
				</h2>
				<Collapse className="accordion-collapse" isOpen={isOpen}>
					<div className="accordion-body">{children}</div>
				</Collapse>
			</div>
		</div>
	);
};

export default Accordion;
