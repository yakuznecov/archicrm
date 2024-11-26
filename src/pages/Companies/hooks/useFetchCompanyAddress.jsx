// логика выбора типа адреса компании
import { useEffect, useMemo } from 'react';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useCompanyAddress } from '@/storeZustand';

const useFetchCompanyAddress = () => {
	// Все адреса компаний
	const [companyAddress, getCompanyAddress] = useCompanyAddress(
		useShallow((state) => [state.companyAddress, state.getCompanyAddress])
	);

	// получить список адресов компаний
	useEffect(() => {
		getCompanyAddress();
	}, []);

	// Список адресов компаний для селекта
	const companyAddressList = useMemo(() => {
		return (
			companyAddress?.map((item) => ({
				value: item.id,
				label: `${item.type} || ${item.name}`,
			})) ?? []
		);
	}, [companyAddress]);
	// console.log('companyAddressList', companyAddressList);

	return { companyAddressList };
};

export default useFetchCompanyAddress;
