import React from 'react';
import pdfData from './contract-arenda.pdf';
import { OnlineRentContract } from '@/components';

const Arenda = () => {
	return <OnlineRentContract pdfData={pdfData} />;
};

export default Arenda;
