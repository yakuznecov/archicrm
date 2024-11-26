import React from 'react';
import pdfData from './contract-resurs.pdf';
import { OnlineContract } from '@/components';

const Resurs = () => {
	return (
		<OnlineContract
			pdfData={pdfData}
			companyName='РЕСУРС'
			director='Леон Полины Валерьевны'
			url='https://archicrm.ru/online/dogovora/resurs'
		/>
	);
};

export default Resurs;
