import { Form, Input, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
const dateFormat = 'DD-MM-YYYY';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
	dayjs.locale('ru'); // Настройка локали для dayjs

	let inputNode;
	const recordData = record && dataIndex ? record[dataIndex] : null;

	if (inputType === 'number') {
		inputNode = <InputNumber defaultValue={recordData} />;
	} else if (inputType === 'date') {
		const dateValue = recordData ? dayjs(recordData) : null;
		inputNode = <DatePicker showTime defaultValue={dateValue} format={dateFormat} />;
	} else {
		inputNode = <Input defaultValue={recordData} />;
	}

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item name={dataIndex} style={{ margin: 0 }}>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

export default EditableCell;
