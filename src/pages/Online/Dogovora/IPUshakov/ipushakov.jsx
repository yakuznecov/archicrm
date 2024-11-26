import React from 'react';
import pdfData from './contract-ushakov.pdf';
import { OnlineContractUshakov } from '@/components';

const Ushakov = () => {
	return (
		<OnlineContractUshakov
			pdfData={pdfData}
			url='https://archicrm.ru/online/dogovora/ipushakov'
		/>
	);
};

export default Ushakov;
