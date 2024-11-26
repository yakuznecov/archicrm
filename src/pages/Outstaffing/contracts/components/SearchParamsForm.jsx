// форма с параметрами поиска
import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { useSearchContractsParams } from '@/hooks';

export const SearchParamsForm = () => {
	// Поиск договоров по параметрам
	const { onFinish, clearForms, form, isCityChecked, handleCheckboxChange } =
		useSearchContractsParams();

	return (
		<Form onFinish={onFinish} autoComplete='off' form={form}>
			<div className='d-flex align-items-center gap-3'>
				<div style={{ width: '200px' }}>
					<Form.Item
						name='last_name'
						label='Фамилия'
						style={{ marginBottom: 0 }}
					>
						<Input />
					</Form.Item>
				</div>
				<div style={{ width: '160px' }}>
					<Form.Item name='first_name' label='Имя' style={{ marginBottom: 0 }}>
						<Input />
					</Form.Item>
				</div>
				<div style={{ width: '140px' }}>
					<Form.Item
						name='contract_number'
						label='№ дог'
						style={{ marginBottom: 0 }}
					>
						<Input />
					</Form.Item>
				</div>
				<div>
					<Checkbox checked={isCityChecked} onChange={handleCheckboxChange}>
						Город
					</Checkbox>
				</div>
				<Button
					type='primary'
					danger
					shape='circle'
					icon={<ClearOutlined />}
					onClick={clearForms}
				/>

				<div style={{ width: '95px' }}>
					<Form.Item noStyle>
						<Button type='primary' htmlType='submit' icon={<SearchOutlined />}>
							Поиск
						</Button>
					</Form.Item>
				</div>
			</div>
		</Form>
	);
};
