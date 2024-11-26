// предупреждение при валидации данных

import style from './ErrorFeedback.module.scss';

const ErrorFeedback = ({ errorText }) => {
	return <div className={style.wrapper}>{errorText}</div>;
};

export default ErrorFeedback;
