import { useState } from 'react';

const useDangerAlert = () => {
	// const customerError = useSelector((state) => state.customers.error);

	const [dangerAlert, setDangerAlert] = useState(false); // alert phone customer

	// danger alert if customer phone is in the database
	// useEffect(() => {
	// 	if (customerError && Object.keys(customerError).length > 0) {
	// 		setDangerAlert(true);
	// 	} else {
	// 		setDangerAlert(false);
	// 	}
	// }, [customerError]);

	// alert phone customer open or close
	const toggleDangerAlert = () => {
		setDangerAlert((prevState) => !prevState);
	};

	return {
		dangerAlert,
		toggleDangerAlert
	};
};

export default useDangerAlert;