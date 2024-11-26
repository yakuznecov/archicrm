import cn from "classnames";

const statusMap = {
	1: 'Приход',
	2: 'Расход',
};

const CashierTypeCell = ({ type }) => {
	const text = statusMap[type] || '';

	const statusClassName = cn('archi__status', {
		'archi__status_forCall': type === 2,
	});

	return <div className={statusClassName}>{text}</div>;
};

export default CashierTypeCell;