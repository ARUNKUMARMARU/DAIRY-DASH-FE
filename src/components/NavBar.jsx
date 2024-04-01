import React from 'react'
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigat = useNavigate();
  const location = useLocation();
  
  const handleLogout = ()=>{
    sessionStorage.removeItem('token');
   
   navigat('/signin')
   
  }
  
  return (
    
        <Header style={{position:"sticky", top:"0", zIndex:4}}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/dashboard" ><Link to="/dashboard">Home</Link></Menu.Item>
          <Menu.Item key="/create-supply"><Link to="/create-supply">Create Supply</Link></Menu.Item>
          <Menu.Item key="/profile"><Link to="/profile">Profile</Link></Menu.Item>
          <Menu.Item key="/payment"><Link to="/payment">Payment</Link></Menu.Item>
          <Menu.Item key="/chat"><Link to="/chat">Contact Us</Link></Menu.Item>
          <Menu.Item key="6"
          style={{position:"absolute",
          right:"30px",
         }}>                
                <button style={{ backgroundColor:"black",
                color:"white",
              fontSize:"20px"}}
                onClick={handleLogout}                
                ><LogoutOutlined /> Logout</button>       
            
        </Menu.Item>
          
        </Menu>
      </Header>
    
  )
}

export default NavBar;