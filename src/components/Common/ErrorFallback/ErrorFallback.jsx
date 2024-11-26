import React from 'react';
import style from './ErrorFallback.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	return (
		<div className={style.wrapper}>
			<div className={style.box}>
				<h1 className={style.title}>Что-то случилось... 😵</h1>
				<p className={style.text}>{error.message}</p>
				<button className={style.button} onClick={resetErrorBoundary}>
					Попробуйте снова
				</button>
			</div>
		</div>
	);
};

export default ErrorFallback;
