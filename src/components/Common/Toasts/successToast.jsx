import toast from 'react-hot-toast';

const successToast = (text) => {
	toast.success(text, {
		style: {
			border: '3px solid #4eb47f',
			padding: '16px',
			color: '#424242',
		},
	});
};

export default successToast;
