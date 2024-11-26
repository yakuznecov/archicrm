// выбор статуса в модальном окне контрагента
import { Radio, Flex, ConfigProvider } from 'antd';

const customTheme = {
	token: {
		colorPrimary: '#6063aa', // основной цвет темы
		colorPrimaryHover: '#ee7269', // цвет при наведении
		colorPrimaryActive: '#4eb47f', // цвет при активном состоянии
	},
};

const ContrAgentStatusRadio = ({ statusType, handleStatusChange }) => {
	return (
		<Flex align='center' gap={4}>
			<ConfigProvider theme={customTheme}>
				<Radio.Group
					buttonStyle='solid'
					onChange={handleStatusChange}
					value={statusType}
				>
					<Radio.Button value='Новый'>Новый</Radio.Button>
					<Radio.Button value='Обработано'>Обработано</Radio.Button>
				</Radio.Group>
			</ConfigProvider>
		</Flex>
	);
};

export default ContrAgentStatusRadio;
