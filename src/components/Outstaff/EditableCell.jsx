import React, { useState, useEffect, useRef } from 'react';
import { Form, Input } from 'antd';
import { EditableContext } from './EditableRow';

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = React.useContext(EditableContext);

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const save = async () => {
		const { id } = record; // id объекта в массиве зарплат

		try {
			const values = await form.validateFields(); // изменяемое значение
			// console.log('values', values);

			toggleEdit();

			// Преобразуем значение в число перед передачей в handleSave
			if (dataIndex === 'hourly_rate' || dataIndex === 'percent') {
				const value = values[dataIndex];

				if (value !== undefined) {
					values[dataIndex] = parseFloat(value);
				}
			}

			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} обязательно.` }]}>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div className="editable-cell-value-wrap" style={{ paddingInlineEnd: 24 }} onClick={toggleEdit}>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
