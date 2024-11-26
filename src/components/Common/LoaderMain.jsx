import logoDark from '../../assets/images/logo-dark.png';

const LoaderMain = () => {
	return (
		<div className="loaderMain__wrapper">
			<span className="loaderMain">
				<span className="logo">
					<img src={logoDark} alt="" height="20" />
				</span>
				ARCHI
			</span>
		</div>
	);
};

export default LoaderMain;
