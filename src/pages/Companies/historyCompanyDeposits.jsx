// История внесения депозитов компании
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDepositsColumns } from '@/hooks';
import Loader from '@/components/Common/Loader';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useContrAgentDepositsStore } from '@/storeZustand';

const HistoryCompanyDeposits = () => {
	// колонки в таблице депозитов
	const columns = useDepositsColumns();

	// Депозиты компаний
	const [
		loading,
		contrAgentId, // id компании
		singleContrAgentDeposit,
		getSingleContrAgentDeposits, // получить депозиты выбранного контрагента
	] = useContrAgentDepositsStore(
		useShallow((state) => [
			state.loading,
			state.contrAgentId,
			state.singleContrAgentDeposit,
			state.getSingleContrAgentDeposits,
		])
	);

	useEffect(() => {
		getSingleContrAgentDeposits(contrAgentId);
	}, []);

	return (
		<>
			{loading && <Loader />}
			{!loading &&
				singleContrAgentDeposit &&
				singleContrAgentDeposit?.length > 0 && (
					<Table
						columns={columns}
						dataSource={singleContrAgentDeposit}
						size='small'
						rowKey='id'
					/>
				)}
		</>
	);
};

export default HistoryCompanyDeposits;
