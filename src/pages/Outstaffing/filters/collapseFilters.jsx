// Аккордион с выпадающим списком фильтров на главной
import { Collapse, ConfigProvider } from 'antd';
import ContractsFilters from '../contracts/contractsFilters';

const CollapseFilters = () => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Collapse: {
						headerBg: 'rgba(93, 182, 216, 0.4)',
						algorithm: true,
					},
				},
			}}
		>
			<Collapse
				size="small"
				items={[
					{
						key: '1',
						label: 'Фильтры',
						children: <ContractsFilters />,
					},
				]}
			/>
		</ConfigProvider>

	)
}

export default CollapseFilters;