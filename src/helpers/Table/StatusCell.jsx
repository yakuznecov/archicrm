import cn from "classnames";

const statusMap = {
	1: 'Новые',
	2: 'В работе',
	3: 'Отработанные',
	4: 'Спам',
	5: 'Перезвонить',
	6: 'Для обзвона',
	'Оплачено': 'Оплачено',
	'Отмена': 'Отмена',
	'Подтверждено': 'Подтверж.',
	'В работе': 'В работе',
	'Новая': 'Новая',
	'Отложено': 'Отложено',
	'На приеме': 'На приеме',
	'В процессе': 'В процессе',
	'Одобрено': 'Одобрено',
	'Отклонено': 'Отклонено',
	'ACTIVE': 'Активно',
	'BLOCKED': 'Аннулир',
	'NEW': 'Новый',
};

const StatusCell = ({ value }) => {
	const text = statusMap[value] || '';

	const statusClassName = cn('archi__status', {
		'archi__status_inWorking': value === 2 || value === 'В работе' || value === 'В процессе' || value === 'NEW',
		'archi__status_spam': value === 4 || value === 'Отмена' || value === 'Отклонено' || value === 'BLOCKED',
		'archi__status_new': value === 'Новая',
		'archi__status_pending': value === 'Отложено',
		'archi__status_forCall': value === 6 || value === 'Подтверждено',
		'archi__status_accept': value === 'На приеме',
	});

	return <div className={statusClassName}>{text}</div>;
};

export default StatusCell;