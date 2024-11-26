// Загрузка файлов
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Image, Flex, Card, Table, Button, Modal, Spin, Col, Row } from 'antd';
import { postFile } from '@/helpers/api_helper';
import { successToast, errorToast } from '@/components';
import { DownloadOutlined } from '@ant-design/icons';
import { formatDate } from '@/helpers/Date/formatDate';
import { getUploadFileById } from '@/services';
import Dropzone from "react-dropzone";

import {
	// Row,
	// Col,
	Form,
	Spinner
} from "reactstrap";

// Zustand store
import { useShallow } from 'zustand/react/shallow';
import { useOutStaff, useContractsStore } from '@/storeZustand';

const UploadDocuments = () => {

	const [selectedFiles, setselectedFiles] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [path, setPath] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Договор клиента
	const [
		getUploadFiles, // загрузка файлов по id договора
		uploadFilesList, // список загруженных файлов
		loading
	] = useOutStaff(useShallow((state) => [
		state.getUploadFiles,
		state.uploadFilesList,
		state.loading
	]))
	// console.log('uploadedPath', uploadedPath);

	const handleClick = async (id) => {
		try {
			const newPath = await getUploadFileById(id);
			setPath(newPath);

			if (newPath) {
				showModal(); // модалка
			}
		} catch (error) {
			console.error('Ошибка загрузки файла:', error);
		}
	};

	// Договор клиента
	const [contractId] = useContractsStore(useShallow((state) => [
		state.contractId
	]));

	// Загрузка файлов по id договора
	useEffect(() => {
		if (contractId) {
			getUploadFiles(contractId);
		}
	}, [contractId])

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	function handleAcceptedFiles(files) {
		if (!files || files.length === 0) {
			return;
		}

		const updatedFiles = files.map(file => Object.assign(file, {
			preview: URL.createObjectURL(file),
			formattedSize: formatBytes(file.size),
		}));
		setselectedFiles(prevFiles => [...prevFiles, ...updatedFiles]);
	}

	function formatBytes(bytes, decimals = 2) {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	}

	// Загрузка файлов
	async function uploadFiles() {
		if (selectedFiles.length === 0) {
			errorToast('Выберите документы для загрузки');
			return;
		}

		if (!contractId) {
			errorToast('Выберите договор');
			return;
		}

		setIsUploading(true);

		for (const file of selectedFiles) {
			try {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('contract', contractId);
				formData.append('hash', null);

				const response = await postFile('/outstaff/upload/', formData);
				successToast(`Файл ${file.name} успешно загружен`);
				setselectedFiles([]);

			} catch (error) {
				errorToast(`Произошла ошибка при загрузке ${file.name}`);
			} finally {
				setIsUploading(false);
			}
		}

		await getUploadFiles(contractId);
	}

	const columns = [
		{
			title: 'Название',
			dataIndex: 'file',
			key: 'name',
			render: (url) => (
				<div className='cellWidth'>
					<a className='text_ellipsis'>{url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))}</a>
				</div>
			),
		},
		{
			title: 'Дата загрузки',
			dataIndex: 'date_created',
			key: 'date_created',
			render: (date) => formatDate(date),
		},
		{
			title: 'Действие',
			key: 'action',
			classNames: 'cellWidth',
			render: ({ id }) => (
				<Button key={id} type="primary" onClick={() => handleClick(id)}>
					Получить превью
				</Button>
			)
		},
	];

	return (
		<>
			<Card className="mb-2">
				<Form>
					<Dropzone
						onDrop={acceptedFiles => {
							handleAcceptedFiles(acceptedFiles);
						}}
					>
						{({ getRootProps, getInputProps }) => (
							<div className="dropzone">
								<div
									className="dz-message needsclick"
									{...getRootProps()}
								>
									<input {...getInputProps()} />
									<div className="mb-3">
										<i className="display-4 text-muted uil uil-cloud-upload" />
									</div>
									<h4>Перетащите файлы сюда или нажмите, чтобы загрузить.</h4>
								</div>
							</div>
						)}
					</Dropzone>
					<div className="dropzone-previews mt-3" id="file-previews">
						{selectedFiles && selectedFiles?.map((f, i) => {
							return (
								<Card
									className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
									key={i + "-file"}
								>
									<div className="p-2">
										<Row className="align-items-center">
											<Col span={6}>
												<img
													data-dz-thumbnail=""
													height="80"
													className="avatar-sm rounded bg-light"
													alt={f.name}
													src={f.preview}
												/>
											</Col>
											<Col span={18}>
												<Link
													to="#"
													className="text-muted font-weight-bold"
												>
													{f.name}
												</Link>
												<p className="mb-0">
													<strong>{f.formattedSize}</strong>
												</p>
											</Col>
										</Row>
									</div>
								</Card>
							);
						})}
					</div>
				</Form>

				<div className="text-center mt-4">
					<button
						type="button"
						className="archi__btn archi__btn-purple"
						onClick={uploadFiles}
						style={{ width: "170px" }}
						disabled={isUploading}
					>
						{isUploading ? <Spinner color="light" size="sm" /> : "Отправить файлы"}
					</button>
				</div>
			</Card>

			<Card title="Загруженные файлы">
				{loading && (
					<Flex align="center" justify="center">
						<Spin size='large' />
					</Flex>
				)}
				{!loading && <Table columns={columns} dataSource={uploadFilesList} />}
			</Card>

			<Modal
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				width={240}
				afterClose={() => setPath('')}
			>
				<Button
					type="primary"
					icon={<DownloadOutlined />}
					size="large"
					onClick={handleCancel}
					className="mb-3"
				>
					<a
						href={path}
						target='_blank'
						rel='noreferrer'
						download
					>
						Скачать файл
					</a>
				</Button>
				<Flex align="center" justify="center">
					<Image.PreviewGroup>
						<Image
							width={175}
							height={175}
							src={path}
						/>
					</Image.PreviewGroup>
				</Flex>
			</Modal>
		</>
	);
};

export default UploadDocuments;