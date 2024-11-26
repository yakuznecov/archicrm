// Записи к специалистам
import { create } from 'zustand';
import { getBookings, getBookingById, getBookingsCurrent } from '@/services';

export const useBookingsStore = create((set) => ({
	bookings: [],
	singleBooking: {},
	loading: false,
	isEditBooking: false,
	getBookings: async ({ department_id, start_date, end_date }) => {
		set({ loading: true });
		const bookings = await getBookings({ department_id, start_date, end_date });
		set({ bookings, loading: false });
	},
	getBookingById: async (id) => {
		const singleBooking = await getBookingById(id);
		set({ singleBooking });
	},
	setIsEditBooking: (isEditBooking) => {
		set({ isEditBooking });
	},
	clearSingleBooking: () => {
		set({ singleBooking: {} });
	},
	// Записи к конкретным специалистам
	getBookingsCurrent: async (data) => {
		set({ loading: true });
		const bookingsCurrent = await getBookingsCurrent(data);
		set({ bookingsCurrent, loading: false });
	}
}))