import React from 'react';
import { Radio, Flex, ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import locale from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru'; // Импорт локали для dayjs
import useDateRange from './hooks/useDateRange';

const customTheme = {
	token: {
		colorPrimary: '#6063aa', // основной цвет темы
		colorPrimaryHover: '#ee7269', // цвет при наведении
		colorPrimaryActive: '#4eb47f', // цвет при активном состоянии
	},
};

const RangeDatePicker = () => {
	const { RangePicker } = DatePicker;

	const { startDate, endDate, rangeType, updateDateRange, handleRangePickerChange } = useDateRange();

	return (
		<Flex align="center" gap={4}>
			<ConfigProvider locale={locale}>
				<RangePicker onChange={updateDateRange} allowClear={false} value={[dayjs(startDate), dayjs(endDate)]} />
			</ConfigProvider>

			<ConfigProvider theme={customTheme}>
				<Radio.Group defaultValue="today" buttonStyle="solid" onChange={handleRangePickerChange} value={rangeType}>
					<Radio.Button value="today">Сегодня</Radio.Button>
					<Radio.Button value="yesterday">Вчера</Radio.Button>
					<Radio.Button value="week">Нед. (с пон.)</Radio.Button>
					<Radio.Button value="month">Мес. (с 1 чис.)</Radio.Button>
					<Radio.Button value="last_month">Прошлый мес.</Radio.Button>
					<Radio.Button value="year">Год</Radio.Button>
				</Radio.Group>
			</ConfigProvider>
		</Flex>
	);
};

export default RangeDatePicker;
