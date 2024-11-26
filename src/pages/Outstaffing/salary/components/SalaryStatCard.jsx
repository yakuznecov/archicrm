// Статистика выдачи зарплаты и остатки
import { Card, Flex, Typography } from 'antd';

export default function SalaryStatCard() {
	const { Title, Text } = Typography;

	return (
		<Flex justify='flex-end' style={{ margin: '0 0 80px 0' }}>
			<Card title='Расходы на зп' className='mb-1'>
				<Flex align='center' justify='space-between' className='mb-1' gap={5}>
					<Title level={5} strong style={{ margin: 0 }}>
						Осталось:
					</Title>
					<Text type='danger' strong>
						25000 ₽
					</Text>
				</Flex>
				<Flex align='center' justify='space-between' className='mb-1' gap={5}>
					<Title level={5} strong style={{ margin: 0 }}>
						Выдано:
					</Title>
					<Text type='danger' strong>
						135000 ₽
					</Text>
				</Flex>
				<Flex align='center' justify='space-between' gap={5}>
					<Title level={5} strong style={{ margin: 0 }}>
						Итого:
					</Title>
					<Text type='danger' strong>
						555000 ₽
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
}
