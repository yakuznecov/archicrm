import React from 'react';
import pdfData from './contract-rus.pdf';
import { OnlineContract } from '@/components';

const Rus = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='РУСЬ'
			director='Рабаданова Расула Магомедрасуловича'
			url='https://archicrm.ru/online/dogovora/rus'
		/>
	);
};

export default Rus;
