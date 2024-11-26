// Шаблоны клиента
import SelectDocuments from './selectDocuments';
import SelectTemplates from './selectTemplates';

const ClientTemplates = () => {
	return (
		<div>
			{/* Выбор шаблонов */}
			<SelectTemplates />

			{/* Список документов для загрузки */}
			<SelectDocuments />
		</div>
	)
}

export default ClientTemplates;