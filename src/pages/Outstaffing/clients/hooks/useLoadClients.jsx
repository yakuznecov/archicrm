// Логика загрузки клиентов аутстаффа
import { useEffect, useState } from 'react';
import { formatIsoTimeToString } from '@/helpers/Date/formatDate';
import { useToggle, useDepositsColumns } from '@/hooks';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useClientsOutstaffStore } from '@/storeZustand';

export const useLoadClients = () => {
	// Клиенты аутстафф
	const [loading, getClientsOutstaff, clientsOutstaffList] =
		useClientsOutstaffStore(
			useShallow((state) => [
				state.loading,
				state.getClientsOutstaff,
				state.clientsOutstaffList,
			])
		);

	useEffect(() => {
		getClientsOutstaff();
	}, []);

	return {
		loading,
		clientsOutstaffList,
	};
};
