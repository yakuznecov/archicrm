// SelectTemplates в договоре клиента на вкладке шаблоны
import { Col, Row, Select } from 'antd';
import DocumentsList from './documents-list';
import { useSelectedTemplatesSet } from '@/hooks';

// Zustand store
import { useTemplatesStore } from '@/storeZustand';

const SelectTemplates = () => {
	// Шаблоны
	const [
		selectedTemplateSet, // Выбранный набор шаблонов
	] = useTemplatesStore((state) => [state.selectedTemplateSet]);
	// console.log('selectedTemplateSet', selectedTemplateSet);

	// Выбор наборов шаблонов
	const { templatesSetData, handleSelectedTemplateSet } =
		useSelectedTemplatesSet();

	return (
		<>
			<Row className='mb-3 align-items-end'>
				<Col span={6}>
					<label className='form-label archi-label'>
						Выбрать набор шаблонов
					</label>
					<Select
						style={{
							width: '100%',
						}}
						allowClear // добавляем кнопку очистки
						options={templatesSetData}
						value={selectedTemplateSet}
						onChange={handleSelectedTemplateSet}
					/>
				</Col>
			</Row>

			{/* Список документов */}
			<DocumentsList />
		</>
	);
};

export default SelectTemplates;
