// worker data

const WorkerCell = ({ value }) => {
	const { surname, name, second_name } = value;
	const workerData = `${surname || ''} ${name || ''} ${second_name || ''}`;

	return <>{workerData}</>;
};

export default WorkerCell;