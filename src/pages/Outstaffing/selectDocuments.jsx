import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Divider } from 'antd';
import { post } from '@/helpers/api_helper';
import { errorToast } from '@/components';

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import {
	useNamesDocumentsStore,
	useContractsStore,
	useTemplatesStore,
} from '@/storeZustand';

const SelectDocuments = () => {
	const [selectedDocs, setSelectedDocs] = useState([]);

	// Названия документов
	const [namesDocuments, getNamesDocuments] = useNamesDocumentsStore(
		useShallow((state) => [state.namesDocuments, state.getNamesDocuments])
	);

	// Только справки и ходатайство
	const spravkiDocs = namesDocuments?.filter((item) => {
		return (
			item.name.toLowerCase().includes('справка') ||
			item.name.toLowerCase().includes('ходатайство')
		);
	});

	// Остальные документы
	const othersDocs = namesDocuments?.filter((item) => {
		return !(
			item.name.toLowerCase().includes('справка') ||
			item.name.toLowerCase().includes('ходатайство')
		);
	});

	// Шаблоны документов
	const [selectedTemplateSet] = useTemplatesStore(
		useShallow((state) => [state.selectedTemplateSet])
	);

	// Договоры клиента
	const [contractId] = useContractsStore(
		useShallow((state) => [state.contractId])
	);

	// Получение списка документов
	useEffect(() => {
		getNamesDocuments();
	}, []);

	// загрузка документов
	const downloadFiles = (files) => {
		const pathName = 'https://onshorkin.com/';

		if (files && Array.isArray(files)) {
			files.forEach((file, index) => {
				setTimeout(() => {
					const link = document.createElement('a');
					link.href = pathName + file.path;
					link.download = file.id;
					link.target = '_blank';
					link.style.display = 'none';
					document.body.appendChild(link);

					if (file.path.endsWith('.docx')) {
						// Если файл с расширением .docx, то скачиваем
						link.click();
					} else if (file.path.endsWith('.htm')) {
						// Если файл с расширением .htm, то открываем в новой вкладке
						link.target = '_blank';
						window.open(link.href, '_blank');
					}

					document.body.removeChild(link);
				}, index * 1000);
			});
		}
	};

	// загрузка файлов
	const postFiles = async (selectedDocs) => {
		try {
			if (selectedDocs?.length === 0) {
				errorToast('Выберите документы для загрузки.');
				return;
			}

			if (selectedTemplateSet === null) {
				errorToast('Выберите набор шаблонов.');
				return;
			}

			const data = {
				contract_id: contractId,
				document_id_list: selectedDocs, // id документов
				document_set_id: selectedTemplateSet, // выбранный набор шаблонов
			};

			const response = await post('/outstaff/file/', data);
			const filesList = response.path_list;

			// Загрузка файлов
			downloadFiles(filesList);
			setSelectedDocs([]);
		} catch (error) {
			const dataErrors = error?.response?.data?.errors;
			const contractIdError = !!error?.response?.data?.contract_id;

			if (dataErrors) {
				dataErrors.forEach((error) => {
					errorToast(error.detail);
				});
			}

			if (contractIdError) {
				errorToast('Заполните номер договора.');
			}

			errorToast(
				'Не удалось загрузить документы. Попробуйте сохранить любой символ в пустых полях'
			);
		}
	};

	const handleCheckboxChange = (id) => {
		const newSelectedItems = selectedDocs.includes(id)
			? selectedDocs.filter((itemId) => itemId !== id)
			: [...selectedDocs, id];

		setSelectedDocs(newSelectedItems);
	};

	const customOrder = [12, 13, 14, 15, 16, 17, 27, 25, 24, 26]; // Порядок документов в чекбоксах

	// Функция для обновления порядка документов в customOrder
	function updateCustomOrder() {
		othersDocs?.forEach((item) => {
			const id = item.id;
			if (!customOrder.includes(id)) {
				customOrder.push(id);
			}
		});
	}

	// Обновление порядка документов в customOrder
	updateCustomOrder();

	// сортировка документов согласно порядку в массиве выше
	const sortedDocuments = customOrder?.map((id) =>
		othersDocs?.find((item) => item.id === id)
	);

	return (
		<>
			<Row>
				{sortedDocuments &&
					sortedDocuments?.map((item, index) => (
						<Col lg={6} col={6} className='mb-1' key={index}>
							<label className='card-radio-label'>
								<input
									type='checkbox'
									name='document'
									id={`document-${item?.id}`}
									className='card-radio-input'
									checked={selectedDocs.includes(item?.id)}
									onChange={() => handleCheckboxChange(item.id)}
								/>
								<span className='card-radio text-center text-truncate'>
									{item?.name}
								</span>
							</label>
						</Col>
					))}
			</Row>
			<Divider>Справки</Divider>
			<Row>
				{spravkiDocs &&
					spravkiDocs?.map((item, index) => (
						<Col lg={6} col={6} className='mb-1' key={index}>
							<label className='card-radio-label'>
								<input
									type='checkbox'
									name='document'
									id={`document-${item?.id}`}
									className='card-radio-input'
									checked={selectedDocs.includes(item?.id)}
									onChange={() => handleCheckboxChange(item.id)}
								/>
								<span className='card-radio text-center text-truncate'>
									{item?.name}
								</span>
							</label>
						</Col>
					))}
			</Row>
			<h5 className='font-size-16 mb-1'>
				Выбрано:{' '}
				<span style={{ color: '#ee7269' }}>{selectedDocs?.length}</span>
			</h5>
			<Row>
				<Col>
					<div className='text-end'>
						<button
							type='text'
							className='archi__btn archi__btn-green'
							onClick={() => postFiles(selectedDocs)}
						>
							Скачать выбранные документы
						</button>
					</div>
				</Col>
			</Row>
		</>
	);
};

export default SelectDocuments;
