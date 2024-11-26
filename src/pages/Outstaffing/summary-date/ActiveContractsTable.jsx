// таблица с активными договорами по типам
import { Typography, Flex } from 'antd';

const ActiveContractsTable = ({ items }) => {
	const { Text } = Typography;

	return (
		<div>
			{items?.map((template, index) => {
				const [key, value] = Object.entries(template)[0];

				return (
					<Flex key={index} gap={3}>
						<Text strong>{key}:</Text>
						<Text strong type="danger">
							{' '}
							{value}
						</Text>
					</Flex>
				);
			})}
		</div>
	);
};

export default ActiveContractsTable;
