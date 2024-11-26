import { DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ru_RU';

export default function CommonDatePicker({ onChange, picker, placeholder }) {
	return (
		<ConfigProvider locale={locale}>
			<DatePicker
				onChange={onChange}
				picker={picker}
				placeholder={placeholder}
				format='MM-YYYY'
			/>
		</ConfigProvider>
	);
}
