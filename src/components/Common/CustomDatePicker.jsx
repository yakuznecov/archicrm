import React from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { setHours, setMinutes } from 'date-fns'; // обработка времени
// Русский язык для календаря
registerLocale('ru', ru);

export default function CustomDatePicker({
	selected,
	setDate,
	showTimeSelect = true,
	showOnlyDate,
}) {
	const handleDateChange = (date) => {
		setDate(date);
	};

	const minTime = setHours(setMinutes(new Date(), 0), 9); // 09:00
	const maxTime = setHours(setMinutes(new Date(), 0), 20); // 22:00

	return (
		<DatePicker
			selected={selected}
			onChange={handleDateChange}
			// minDate={new Date()}
			showTimeSelect={showTimeSelect}
			timeFormat='HH:mm'
			timeIntervals={30}
			// timeCaption="time"
			popperPlacement='bottom-start'
			popperProps={{ zIndex: 9999 }}
			dateFormat={showOnlyDate ? 'dd.MM.yyyy' : 'Pp'} // показать либо дату, либо еще время
			locale='ru'
			className='archi__datepicker_Timeinput'
			calendarClassName='archi__datepicker_time'
			minTime={minTime} // Время начала выбора
			maxTime={maxTime} // Время окончания выбора
			placeholderText={showOnlyDate ? 'Выберите дату' : 'Выберите время'}
		/>
	);
}
