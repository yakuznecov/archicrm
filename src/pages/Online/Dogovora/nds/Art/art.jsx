import React from 'react';
import pdfData from './contract-art.pdf';
import { OnlineContract } from '@/components';

const Art = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='АРТ'
			director='Рабаданова Расула Магомедрасуловича'
			url='https://archicrm.ru/online/dogovora/art'
		/>
	);
};

export default Art;
