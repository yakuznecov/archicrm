// Аккордион с выпадающим списком депозитов
import { Collapse, ConfigProvider } from 'antd';

const CollapseDeposits = ({ items }) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Collapse: {
						headerBg: 'rgba(93, 182, 216, 0.2)',
						algorithm: true,
					},
				},
			}}
		>
			<Collapse size="small" items={items} accordion bordered={true} />
		</ConfigProvider>
	);
};

export default CollapseDeposits;
