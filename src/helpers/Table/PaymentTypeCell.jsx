import cn from "classnames";

const statusMap = {
	1: 'Налич.',
	2: 'Безнал',
};

const PaymentTypeCell = ({ value }) => {
	const text = statusMap[value] || '';

	const statusClassName = cn('archi__status', {
		'archi__status_pending': value === 2,
	});

	return <div className={statusClassName}>{text}</div>;
};

export default PaymentTypeCell;