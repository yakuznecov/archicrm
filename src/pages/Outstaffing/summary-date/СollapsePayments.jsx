// Аккордион с выпадающим списком оплат по компаниям
import { Collapse, ConfigProvider } from 'antd';

const CollapsePayments = ({ items }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Collapse: {
						headerBg: 'rgba(78, 180, 127, 0.2)',
						algorithm: true,
					},
				},
			}}
		>
			<Collapse size="small" items={items} accordion bordered={true} />
		</ConfigProvider>
	);
};

export default CollapsePayments;
