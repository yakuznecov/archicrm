import {
	formatDate,
	getTimeFromDate,
	formatDateTime,
} from '@/helpers/Date/formatDate';

const getValueOrDefault = (cell) => cell.value || '';

const Id = getValueOrDefault;
const Name = getValueOrDefault;
const Surname = getValueOrDefault;
const SecondName = getValueOrDefault;
const Amount = getValueOrDefault;
const Client = getValueOrDefault;
const Phone = getValueOrDefault;
const Worker = getValueOrDefault;
const Service = getValueOrDefault;
const Notice = getValueOrDefault;
const Time = getValueOrDefault;
const Cost = getValueOrDefault;
const Payment = getValueOrDefault;
const Sms = getValueOrDefault;
const Comment = getValueOrDefault;
const Description = getValueOrDefault;
const Category = getValueOrDefault;
const Material = getValueOrDefault;
const Size = getValueOrDefault;
const City = getValueOrDefault;
const From = getValueOrDefault;
const Email = getValueOrDefault;
const Department = getValueOrDefault;
const MonthCell = getValueOrDefault;

// format date
const formatDateCell = (cell) => {
	return cell.value ? formatDate(cell.value) : '';
};

// format date and time, for example: 2022-01-01 - 12:00
const formatDateTimeCell = (cell) => {
	return cell.value ? formatDateTime(cell.value) : '';
};

const DateCell = formatDateCell;
const DateBooking = formatDateCell;
const DateBirth = formatDateCell;

// format time booking
const formatTimeCell = (cell) => {
	return cell.value ? getTimeFromDate(cell.value) : '';
};

const TimeBooking = formatTimeCell;

export {
	Id,
	Name,
	Surname,
	SecondName,
	Client,
	Phone,
	Worker,
	Amount,
	Service,
	Notice,
	DateCell,
	DateBooking,
	DateBirth,
	Time,
	TimeBooking,
	Cost,
	Payment,
	Sms,
	Comment,
	Description,
	Category,
	Material,
	Size,
	City,
	From,
	Email,
	Department,
	MonthCell,
	formatDateTimeCell,
};
