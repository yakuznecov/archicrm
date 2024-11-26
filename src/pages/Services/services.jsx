// Услуги
import { MDBDataTable } from 'mdbreact';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

//Import Breadcrumb
import Breadcrumbs from '@/components/Common/Breadcrumb';
import './datatables.scss';

const Services = () => {
	const data = {
		columns: [
			{
				label: 'Имя',
				field: 'name',
				sort: 'asc',
				width: 150,
			},
			{
				label: 'Стоимость услуги',
				field: 'cost',
				sort: 'asc',
				width: 150,
			},
			{
				label: 'Комментарий',
				field: 'comment',
				sort: 'asc',
				width: 200,
			},
			{
				label: 'Департамент',
				field: 'department',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'Редактировать',
				field: 'edit',
				width: 100,
			},
			{
				label: 'Удалить',
				field: 'delete',
				width: 100,
			},
		],
		rows: [
			{
				name: 'Аппаратный педикюр',
				cost: '1990.00',
				comment: 'Длительность 45 мин',
				department: 'Санатера-Москва',
				edit: (
					<Button color='warning' outline className='waves-effect waves-light'>
						Изменить
					</Button>
				),
				delete: (
					<Button color='danger' outline className='waves-effect waves-light'>
						Удалить
					</Button>
				),
			},
			{
				name: 'Изготовление ортопедических стелек',
				cost: '1990.00',
				comment: 'Стельки',
				department: 'Санатера-Москва',
			},
			{
				name: 'Изготовление стелек',
				cost: '2990.00',
				comment: 'Изготовление ортопедических стелек',
				department: 'Санатера-Москва',
			},
			{
				name: 'Консультация подолога',
				cost: '990.00',
				comment: '15 мин',
				department: 'Санатера-Москва',
			},
			{
				name: 'Коррекция стелек',
				cost: '1500.00',
				comment: '1 стелька , 30-40 мин',
				department: 'Санатера-Москва',
			},
			{
				name: 'Коррекция стелек бесплатная',
				cost: '0.00',
				comment: 'бесплатная',
				department: 'Санатера-Москва',
			},
			{
				name: 'Маникюр',
				cost: '1990.00',
				comment: 'Маникюр с покрытием',
				department: 'Санатера-Москва',
			},
			{
				name: 'Процедура коррекции стопы',
				cost: '2990.00',
				comment: 'Процедура коррекции стопы от плоскостопия и шпоры',
				department: 'Санатера-Москва',
			},
		],
	};

	return (
		<div className='page-content'>
			<div className='container-fluid'>
				<Breadcrumbs title='Услуги' breadcrumbItem='Услуги' />

				<Row>
					<Col className='col-12'>
						<Card>
							<CardBody>
								<MDBDataTable
									info={false}
									entries={10}
									entriesLabel='Отображать записей'
									responsive
									striped
									bordered
									data={data}
									searchLabel='Поиск'
									paginationLabel={['Предыдущая', 'Следующая']}
									noRecordsFoundLabel='Нет данных'
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Services;
