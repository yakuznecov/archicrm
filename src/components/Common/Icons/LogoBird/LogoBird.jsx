import logoBirdIcon from '@/assets/images/logo/logo_bird.png';
import style from './LogoBird.module.scss';

const LogoBird = () => {
	return <img className={style.logo} src={logoBirdIcon} alt='logoBirdIcon' />;
};

export default LogoBird;
