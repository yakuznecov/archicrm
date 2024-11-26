// Login

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Alert, Form, Card, Input, Button, Flex } from 'antd';

// Zustand store
import { useAuthStore } from '@/storeZustand';
import { useShallow } from 'zustand/react/shallow';

// import images
import logo from '@/assets/images/logo/logo.png';
import User from '@/assets/images/login/user.svg';
import EyeIcon from '@/assets/images/login/eye.svg';

const Login = () => {
	const navigate = useNavigate();

	const [loadingBtn, setLoadingBtn] = useState(false);

	// Auth store
	const [login, error, setUserCredentials] = useAuthStore(
		useShallow((state) => [state.login, state.error, state.setUserCredentials])
	);

	const [show, setShow] = useState(false);

	const onFinish = async (values) => {
		setLoadingBtn(true);
		login({ user: values, history: navigate });
		setUserCredentials(values.username, values.password);

		setTimeout(() => {
			setLoadingBtn(false);
		}, 2000);
	};

	useEffect(() => {
		document.body.className = 'authentication-bg';
		// remove classname when component will unmount
		return function cleanup() {
			document.body.className = '';
		};
	});

	return (
		<div className='login__page'>
			<Flex align='center' justify='center' vertical flex={1}>
				<Card className='login__wrapper'>
					<div className='text-center mt-2'>
						<Link to='/' className='mb-5 d-block auth-logo'>
							<img src={logo} alt='' height='63' />
						</Link>
					</div>
					<div className='login__form'>
						<h1 className='login__title mb-3'>Вход</h1>
						<Form onFinish={onFinish} autoComplete='off'>
							{error ? (
								<Alert message={error} type='error' banner className='mb-2' />
							) : null}

							<div className='login__input_box mb-2'>
								<Form.Item
									name='username'
									rules={[
										{
											required: true,
											message: 'Пожалуйста, введите логин!',
										},
									]}
								>
									<Input placeholder='Логин' />
								</Form.Item>
								<span className='login__icon'>
									<img src={User} alt='' />
								</span>
							</div>

							<div className='login__input_box mb-4'>
								<Form.Item
									name='password'
									rules={[
										{
											required: true,
											message: 'Пожалуйста, введите пароль!',
										},
									]}
								>
									<Input
										placeholder='Пароль'
										type={show ? 'text' : 'password'}
									/>
								</Form.Item>
								<span className='login__icon' onClick={() => setShow(!show)}>
									<img src={EyeIcon} alt='' />
								</span>
							</div>

							<div className='mb-4'>
								<Button
									size='large'
									type='primary'
									htmlType='submit'
									className='w-100'
									loading={loadingBtn}
								>
									Войти
								</Button>
							</div>

							<div className='login__divider mb-3'></div>
						</Form>
					</div>
				</Card>
				<div className='mt-5 text-center'>
					<p>© {new Date().getFullYear()} Archi.</p>
				</div>
			</Flex>
		</div>
	);
};

export default Login;
