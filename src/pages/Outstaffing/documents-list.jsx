// Список шаблонов клиента
import React, { useState, useEffect, useRef } from 'react';
import { Flex, Switch } from 'antd';
import { Col, Row, Label, Input } from 'reactstrap';
import { useShallow } from 'zustand/react/shallow';
import {
	useClientsOutstaffStore,
	useContractsStore,
	useTemplatesStore,
} from '@/storeZustand';
import { patchClientOutstaff, patchContract } from '@/services';
import Accordion from '@/components/Common/Accordion';
import { Toaster } from 'react-hot-toast'; // notifications
import { errorToast, successToast } from '@/components';
import StarIcon from '@/components/Common/Icons/StarIcon';

const labelName = {
	Start: 'Дата начала патента',
	End: 'Дата окончания патента',
};

const DocumentsList = () => {
	const inputFields = useRef([]);
	// console.log('inputFields', inputFields);

	const [formData, setFormData] = useState([]);
	// console.log('formData', formData);

	useEffect(() => {
		inputFields.current = Array.from(
			document.querySelectorAll('.documents-input')
		);
		// ссылка на все найденные инпуты
	}, [formData]);

	// Договоры клиента
	const [contractById, contractId, contractClientId] = useContractsStore(
		useShallow((state) => [
			state.contractById,
			state.contractId,
			state.contractClientId, // выбранный клиент
		])
	);

	// Переключатель, одобрен ли клиент и его договор для личного кабинета
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(contractById.is_client_approved);
	}, [contractById]);

	const customerDocuments = contractById?.client?.document || []; // список документов клиента

	// Список всех шаблонов
	const [selectedTemplateSet, getTemplates, templatesSetList] =
		useTemplatesStore((state) => [
			state.selectedTemplateSet,
			state.getTemplates,
			state.templatesSetList,
		]);
	// console.log('selectedTemplateSet', selectedTemplateSet);

	// получить список шаблонов
	useEffect(() => {
		getTemplates();
	}, []);

	// фильтрация по id шаблонов в наборе
	const filteredTemplateSet = templatesSetList?.filter(
		(obj) => obj.id === selectedTemplateSet
	);

	// шаблоны документов в наборе
	const documentsTemplate = filteredTemplateSet?.[0]?.document_template || [];
	// console.log('documentsTemplate', documentsTemplate);

	// Создание formData когда новый клиент или обновление данных
	useEffect(() => {
		// если нет набора шаблонов, то форма пустая
		if (!selectedTemplateSet) {
			setFormData([]);
			return;
		}

		if (documentsTemplate && documentsTemplate.length > 0) {
			// формирование formData на основе пустых значений
			const templatesFormdata = documentsTemplate?.map(({ name, fields }) => {
				const filteredFields = fields?.reduce((acc, item) => {
					return { ...acc, [item.name]: '' };
				}, {});

				return { name, fields: filteredFields };
			});

			if (!customerDocuments || Object.keys(customerDocuments).length === 0) {
				setFormData(templatesFormdata); // необязательные поля попадают в шаблоны
			} else {
				const updatedCustomerDocuments = templatesFormdata.map((template) => {
					// проверка на существование документа в клиенте
					const existingDocumentIndex = customerDocuments.findIndex(
						(doc) => doc.name === template.name
					);

					if (existingDocumentIndex !== -1) {
						return customerDocuments[existingDocumentIndex];
					} else {
						return template;
					}
				});

				setFormData(updatedCustomerDocuments);
			}
		}
	}, [selectedTemplateSet]);

	// Загрузка документов клиента
	useEffect(() => {
		if (customerDocuments && customerDocuments.length > 0) {
			setFormData(customerDocuments);
		}
	}, [customerDocuments]);

	// Обновление formdata после ввода значений
	const handleInputChange = (template_name, name, value = '') => {
		setFormData((prevData) => {
			const existingIndex = prevData.findIndex(
				(item) => item.name === template_name
			);

			if (existingIndex !== -1) {
				const newData = [...prevData];
				newData[existingIndex] = {
					...newData[existingIndex],
					fields: {
						...newData[existingIndex].fields,
						[name]: value,
					},
				};
				return newData;
			} else {
				return [
					...prevData,
					{
						name: template_name,
					},
				];
			}
		});
	};

	const handleSubmit = async () => {
		// проверяем, пустое ли поле обязательное
		const hasEmptyFields = inputFields?.current?.some((input) => {
			const { name, value, required } = input;

			if (required && value === '') {
				let displayName = name;

				if (name === 'Start') {
					displayName = 'Дата начала патента';
				} else if (name === 'End') {
					displayName = 'Дата окончания патента';
				}

				errorToast(`Поле "${displayName}" не может быть пустым`);
				return true;
			}
		});

		if (!hasEmptyFields) {
			const updatedDocuments = {
				document: formData,
			};

			await patchClientOutstaff(contractClientId, updatedDocuments);
			await patchContract({
				id: contractId,
				updatedContract: { template_set: selectedTemplateSet },
			});
		}
	};

	// получить значение полей
	const getFieldValue = (template_name, name) => {
		const foundedTemplateName = formData?.find(
			(item) => item?.name === template_name
		);

		// если есть данный шаблон в formData, возвращаем его значение
		if (foundedTemplateName) {
			return foundedTemplateName?.fields?.[name];
		}
	};

	// получить значение полей даты, если в патенте поле name - Start или End
	const getLabelName = (name) => labelName[name] || name;

	const renderFields = (id, template_name, fields) => {
		return (
			<Accordion key={id} title={template_name} hasOpen={true}>
				<Row>
					{fields?.map(
						({ id, name, type, required, min_length, max_length }) => (
							<Col key={id} sm={6} className='mb-3'>
								{type === 'Строка' && (
									<>
										<Label className='form-label archi-label me-1'>
											{name}
										</Label>
										{required && <StarIcon />}
										<Input
											name={name}
											type='text'
											className='documents-input'
											value={getFieldValue(template_name, name) || ''}
											minLength={min_length}
											maxLength={max_length}
											onChange={(e) => {
												handleInputChange(template_name, name, e.target.value);
											}}
											required={required}
										/>
									</>
								)}

								{type === 'Число' && (
									<>
										<Label className='form-label archi-label me-1'>
											{name}
										</Label>
										{required && <StarIcon />}
										<Input
											name={name}
											onWheel={(e) => e.target.blur()}
											type='number'
											className='documents-input'
											value={getFieldValue(template_name, name) || ''}
											onChange={(e) => {
												handleInputChange(template_name, name, e.target.value);
											}}
											required={required}
										/>
									</>
								)}

								{type === 'Дата' && (
									<>
										<Label className='form-label archi-label me-1'>
											{getLabelName(name)}
										</Label>
										{required && <StarIcon />}
										<Input
											name={name}
											type='date'
											className='documents-input'
											value={getFieldValue(template_name, name) || ''}
											min='1900-01-01'
											max='2100-01-01'
											onChange={(e) => {
												handleInputChange(template_name, name, e.target.value);
											}}
											required={required}
										/>
									</>
								)}
							</Col>
						)
					)}
				</Row>
			</Accordion>
		);
	};

	const onChangeApproved = (checked) => {
		patchContract({
			id: contractId,
			updatedContract: {
				is_client_approved: checked,
			},
		});

		successToast(`Клиент ${checked ? 'одобрен' : 'не одобрен'}`);
	};

	return (
		<>
			{documentsTemplate?.map(({ id, name: template_name, fields }) =>
				renderFields(id, template_name, fields)
			)}
			<Flex className='mb-3' align='center' justify='space-between' gap={8}>
				<Flex align='center' gap={8}>
					<Switch
						checked={isChecked}
						onChange={onChangeApproved}
						onClick={() => setIsChecked(!isChecked)}
					/>
					<label className='archi-label'>
						{isChecked ? 'Клиент одобрен' : 'Одобрить клиента (личный кабинет)'}
					</label>
				</Flex>
				<button
					type='button'
					className='archi__btn archi__btn-purple'
					onClick={handleSubmit}
				>
					Сохранить
				</button>
			</Flex>
			<Toaster position='top-right' reverseOrder={true} />
		</>
	);
};

export default DocumentsList;
