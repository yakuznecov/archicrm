const DescriptionArea = ({ value, onChange }) => {
	return (
		<textarea
			name="description"
			className="input-large form-control"
			id="description"
			rows="2"
			value={value}
			onChange={onChange}
			placeholder="Укажите причину изменений"
		/>
	);
};

export default DescriptionArea;
