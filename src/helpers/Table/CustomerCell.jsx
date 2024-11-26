// customer data

const CustomerCell = ({ value }) => {
	if (!value) {
		return '';
	}

	const { surname = '', name = '', second_name = '' } = value;
	const customerData = [surname, name, second_name].filter(Boolean).join(' ');

	return <>{customerData}</>;
};

export default CustomerCell;