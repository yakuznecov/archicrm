import {
	Card,
	Col,
	Flex,
	Row,
	Space,
	Tag,
	Typography,
	Divider,
	Modal,
} from 'antd';
import ContrAgentsTable from './components/ContrAgentsTable';
import SearchBtn from './components/SearchBtn';
import { useLoadContrAgents } from './hooks/useLoadContrAgents';
import { useUpdateContrAgents } from './hooks/useUpdateContrAgents';
import ContrAgentForm from './components/ContrAgentForm';

const ContrAgents = () => {
	const { Text } = Typography;

	const {
		onSearch,
		filteredSearchData,
		isFetching,
		totalCount,
		contrAgentsByUserCount,
		contrAgentsBySPbCount,
		contrAgentsByMoscowCount,
		contrAgentsByUserSPbCount,
		contrAgentsByUserMoscowCount,
	} = useLoadContrAgents();

	const {
		columns,
		modal,
		fields,
		toggleModal,
		onFinish,
		loadingBtn,
		statusType,
		handleStatusChange,
		selectedExternalCompany,
		externalCompaniesList,
		handleExternalCompanyChange,
	} = useUpdateContrAgents();

	return (
		<>
			<div className='page-content'>
				<div className='container-fluid'>
					<Row>
						<Col span={24} className='mb-2'>
							<Flex align='center' justify='space-between' gap={8}>
								<SearchBtn onSearch={onSearch} />
								<Flex align='center' gap={8}>
									<Space>
										<Text strong>Кол-во контрагентов:</Text>
										<Tag color='volcano'>{totalCount}</Tag>
									</Space>
									<Divider dashed type='vertical' />
									<Space>
										<Text strong>Кол-во регистраций:</Text>
										<Tag color='orange'>{contrAgentsByUserCount}</Tag>
									</Space>
									<Divider dashed type='vertical' />
									<Space>
										<Text strong>Кол-во контр. Санкт-Петербург:</Text>
										<Tag color='purple'>{contrAgentsBySPbCount}</Tag>
									</Space>
									<Space>
										<Text strong>Регистрации Санкт-Петербург:</Text>
										<Tag color='purple'>{contrAgentsByUserSPbCount}</Tag>
									</Space>
									<Divider dashed type='vertical' />
									<Space>
										<Text strong>Кол-во контр. Москва:</Text>
										<Tag color='blue'>{contrAgentsByMoscowCount}</Tag>
									</Space>
									<Space>
										<Text strong>Регистрации Москва:</Text>
										<Tag color='blue'>{contrAgentsByUserMoscowCount}</Tag>
									</Space>
								</Flex>
							</Flex>
						</Col>
						<Col span={24}>
							<Card>
								<ContrAgentsTable
									data={filteredSearchData}
									loading={isFetching}
									columns={columns}
								/>
							</Card>
						</Col>
					</Row>

					<Modal
						title='Обновление контрагента'
						open={modal}
						onCancel={toggleModal}
						width={600}
						footer={null}
					>
						<ContrAgentForm
							onFinish={onFinish}
							loadingBtn={loadingBtn}
							fields={fields}
							selectedExternalCompany={selectedExternalCompany}
							externalCompaniesList={externalCompaniesList}
							handleExternalCompanyChange={handleExternalCompanyChange}
							statusType={statusType}
							handleStatusChange={handleStatusChange}
						/>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default ContrAgents;
