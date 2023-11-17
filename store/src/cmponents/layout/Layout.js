import React, { useState } from 'react';
import "./layout.css"
import { Avatar, Dropdown} from 'antd';
import {
	BookOutlined,
	BoxPlotOutlined,
	FormOutlined,
	LoginOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import {
	useNavigate
} from 'react-router-dom'
const url = 'https://z-p3-scontent.fpnh18-1.fna.fbcdn.net/v/t39.30808-6/337988116_1280319915890485_582086342740823201_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEVnHdzXaHsQQnfmaumK3199S3-rGqtPt71Lf6saq0-3tW6rz2xL1ruUU1ie2ohBjaC2maOHKX2BL9vrd18GHko&_nc_ohc=lgFmT_dcLZQAX-lGiux&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh18-1.fna&oh=00_AfBqwrMnfFMGXPiYVcVbj9FdSp6h4HDrhqCIlD0juqS9Sw&oe=6559013F';
const { Header, Sider, Content } = Layout;
const Layoutone = (props) => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const menu = [
		{
			key: '/',
			icon: <BookOutlined />,
			label: 'Dashboard',
		},
		{
			key: '/customer',
			icon: <VideoCameraOutlined/>,
			label: 'Customer',
		},
		{
			key: '/product',
			icon: <BoxPlotOutlined/>,
			label: 'Product',
		},
		{
			key: '/user',
			icon: <UserOutlined/>,
			label: 'User',
		},
		{
			key: '/register',
			icon: <FormOutlined/>,
			label: 'Register',
		},
		{
			key: '/login',
			icon: <LoginOutlined/>,
			label: 'Login',
		},
	]
	const navigator = useNavigate()
	const changemenu = (menu) =>{
		navigator(menu.key)
	}
	const items = [
		{
		  key: '1',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="https://web.facebook.com/Sna.Mr.XD/">
			  Profile
			</a>
		  ),
		},
		{
		  key: '2',
		  label: (
			<a target="_blank" rel="noopener noreferrer" href="/register">
			  Chamge Password
			</a>
		  ),
		},
		{
			key: '3',
			label: (
			  <a target="_blank" rel="noopener noreferrer" href="/login">
				Logout
			  </a>
			),
		  },
	]
	return (
		<Layout>
			<Sider style={{"background-color": "rgb(255,214,221)"}} trigger={null} collapsible collapsed={collapsed}>
				<div style={{"background-color": "white",}} className="demo-logo-vertical">
				<Avatar size={58} src={url} />
				</div>
				<Menu
				style={{"background-color": "rgb(255,214,221)","color":"black"}}
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['/']}
					items={menu}
					onClick={changemenu}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						height:110,
						"background-color": "white",
					}}
				>
				 <div style={{
					display:"flex",
					flexDirection:"row",
					alignItems:"center",
					justifyContent:"space-between"
				 }}
				 >
				 <Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined style={{fontSize: '20px',}} /> : <MenuFoldOutlined style={{fontSize: '20px',}}/>}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '20px',
							width: 64,
							height: 64,
						}}
					/>
					<div style={{
						marginRight:20
					}}>
						<h1 style={{
							"font-family": "Georgia, 'Times New Roman', Times, serif",
							"font-size": 40,
						}} >Veasna <span style={{"color":"blue"}} >Managing</span> <span style={{"color":"red"}} >System</span></h1>
					</div>
					<Dropdown menu={{items}}>
					<button style={{
						"margin-right":30,
						"border-radius":10,
						"border": "2px solid rgb(180, 179, 179)",
						"background-color":"white",
						"padding": "0px 10px"
						}}><h2 ><UserOutlined /> Veasna</h2></button>
					</Dropdown>
				 </div>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 765,
						"background-color": "pink",
					}}
				>
					<p style={{"color":"Black", "font-weight":"500"}}>Content: <span style={{"color":"red", "font-weight":"500"}} >Mr.Veasna</span> </p>
					{props.children}
				</Content>
			</Layout>
		</Layout>
	);
};
export default Layoutone;