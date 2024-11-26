// Dashboard
import { useEffect } from 'react';
import { Container, Row } from 'reactstrap';

//Import Components
import MiniWidget from './mini-widget';
import Accordion from '@/components/Common/Accordion';
import BookingsTable from '@/components/BookingsTable/BookingsTable';
import BookingsCurrentTable from '@/components/BookingsCurrentTable/BookingsCurrentTable';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useUserStore,
	useDashboardStore,
	useBookingsStore,
	useDepartmentsStore,
} from '@/storeZustand';

const Dashboard = () => {
	const [selectedDepartment] = useDepartmentsStore(
		useShallow((state) => [state.selectedDepartment])
	);

	// Записи к специалистам
	const [bookings] = useBookingsStore(useShallow((state) => [state.bookings]));

	// Загрузка данных текущего пользователя
	const [
		isSuperAdmin,
		isCallCenter,
		isPersonalkin,
		isSuperAdminOut,
		isSanatera,
	] = useUserStore(
		useShallow((state) => [
			state.isSuperAdmin,
			state.isCallCenter,
			state.isPersonalkin,
			state.isSuperAdminOut,
			state.isSanatera,
		])
	);

	// Панель статистики на главной
	const [getDashboard] = useDashboardStore(
		useShallow((state) => [state.getDashboard])
	);

	// Запрос финансовой статистики
	useEffect(() => {
		// получить массив id записей
		const idsBookings =
			bookings?.length > 0 && bookings.map((booking) => booking.id);
		if (!idsBookings) return;

		const bookingsData = {
			booking_list: idsBookings,
			department_id: selectedDepartment,
		};

		getDashboard(bookingsData);
	}, [bookings, selectedDepartment]);

	return (
		<div className='page-content'>
			<Container fluid>
				{(isSanatera || isCallCenter || isSuperAdmin) && (
					<>
						<Row>{(isSanatera || isSuperAdmin) && <MiniWidget />}</Row>

						<Row className='mb-4'>
							<Accordion title='Список записей на выбранную дату'>
								<BookingsTable />
							</Accordion>
						</Row>

						<h5 className='mb-3'>Специалисты</h5>

						<Row>
							<BookingsCurrentTable />
						</Row>
					</>
				)}
			</Container>
		</div>
	);
};

export default Dashboard;
