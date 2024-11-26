// Аккордион с выпадающим списком активных договоров по типам
import { Collapse, ConfigProvider, Space } from 'antd';
import ActiveContractsTable from './ActiveContractsTable';

const customTheme = {
	components: {
		Collapse: {
			headerBg: 'rgba(93, 182, 216, 0.4)',
			algorithm: true,
		},
	},
};

const CollapseActiveContracts = ({ label, activeContractsValue = 0, items }) => {
	return (
		<ConfigProvider theme={customTheme}>
			<Collapse
				size="small"
				items={[
					{
						key: '1',
						label: (
							<Space>
								<span>{label}:</span>
								<strong>{activeContractsValue}</strong>
							</Space>
						),
						children: <ActiveContractsTable items={items} />,
					},
				]}
			/>
		</ConfigProvider>
	);
};

export default CollapseActiveContracts;
