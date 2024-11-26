import { Avatar } from 'antd';
import style from './LogoFrame.module.scss';
import LogoBird from '../Icons/LogoBird/LogoBird';

const LogoFrame = () => {
	return (
		<div className={style.wrapper}>
			<div className={style.frame}>
				<span className={style.text_top}>
					В рамках деятельности Союза поддержки и развития предпринимательства
					(ОГРН 1247800091505)
				</span>
				<span className={style.text_bottom}>
					Федеральный закон от 12.01.1996 г. № 7-ФЗ и Федеральный закон от
					12.01.96 N 10-ФЗ
				</span>
			</div>
			<LogoBird />
		</div>
	);
};

export default LogoFrame;
