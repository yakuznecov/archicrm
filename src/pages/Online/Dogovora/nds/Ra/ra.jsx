import React from 'react';
import pdfData from './contract-ra.pdf';
import { OnlineContract } from '@/components';

const Ra = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='Ра'
			director='Рабаданова Расула Магомедрасуловича'
			url='https://archicrm.ru/online/dogovora/ra'
		/>
	);
};

export default Ra;
