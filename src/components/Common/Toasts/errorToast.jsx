import toast from 'react-hot-toast';

const errorToast = (text) => {
	toast.error(text, {
		style: {
			border: '3px solid #ee7269',
			padding: '16px',
			color: '#424242',
		},
	});
};

export default errorToast;
