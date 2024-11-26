import React, { useState, useEffect } from 'react';
import { Drawer, Layout, Menu, Button } from 'antd';
import withRouter from '../Common/withRouter';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import ScrollTop from '@/components/Common/ScrollTop';
import { useCacheCleanup, useMenuItems } from '@/hooks';
import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import LoaderMain from '@/components/Common/LoaderMain';

// icons
import logoDark from '../../assets/images/logo-dark.png';

const LayoutMain = (props) => {
	useCacheCleanup(); // очистка кэша браузера, если версия приложения изменилась

	const [collapsed, setCollapsed] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const { Header, Content, Footer, Sider } = Layout;

	const [isLoading, setIsLoading] = useState(true);

	const { items, handleMenuClick } = useMenuItems();

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	return (
		<React.Fragment>
			{isLoading && <LoaderMain />}
			<Layout>
				<Sider
					breakpoint='md'
					collapsedWidth='0'
					theme='light'
					collapsed={collapsed}
					onCollapse={setCollapsed}
					width={185}
					style={{
						overflow: 'auto',
						height: '100vh',
						position: 'fixed',
						left: 0,
						top: 0,
						bottom: 0,
					}}
				>
					<div className='d-flex align-items-center justify-content-center mb-3'>
						<img src={logoDark} alt='' height='50' />
					</div>
					<Menu
						mode='vertical'
						onClick={handleMenuClick}
						items={items}
						style={{ border: 'none' }}
						overflowedIndicator={true}
					/>
				</Sider>

				<Layout
					style={{
						marginLeft: collapsed ? 0 : 185,
						transition: 'margin-left 0.3s',
					}}
				>
					<Header
						style={{
							padding: '0 12px',
							background: '#fff',
							height: 'initial',
							lineHeight: 'initial',
						}}
					>
						<Button
							type='text'
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={toggleCollapsed}
							style={{ marginRight: 16 }}
						/>
						<HeaderContent />
					</Header>
					<Content
						style={{
							margin: '8px 4px 0',
							overflow: 'hidden',
						}}
					>
						<div className='main-content'>{props.children}</div>
					</Content>
					{/* <Footer
						style={{
							textAlign: 'center',
						}}
					>
						<FooterContent />
					</Footer> */}
				</Layout>
			</Layout>
			<ScrollTop />
		</React.Fragment>
	);
};

export default withRouter(LayoutMain);
