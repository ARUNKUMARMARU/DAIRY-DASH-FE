import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './Dashboard.css';
const { Header, Content, Footer } = Layout;

const HomePage = () => {
  return (
    <Layout className="layout">
     
      <Content style={{ padding: '0 50px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
        </Breadcrumb> */}

        <header><h1>Home</h1></header>

        <div className="site-layout-content">
          <h1>Welcome to Our Fresh Milk Supply Service</h1>
          <p>
            We deliver fresh milk directly from our farms to your doorstep. 
            Enjoy the natural goodness of pure, unprocessed milk every day.
          </p>

          <p>
            <Link to="/create-supply">
              <button className="create-supply-button">Let's Create Supply</button>
            </Link>
          </p>   
          
          <p>
            <Link to="/profile">
              <button className="learn-more-button">Edit Profile</button>
            </Link>
          </p>

          <p>
            <Link to="/payment">
              <button className="learn-more-button">Make Payment</button>
            </Link>
          </p>

          <p>
            <Link to="/contact-us">
              <button className="learn-more-button">Contact Us</button>
            </Link>
          </p>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Fresh Milk Supply Service ©2024 Created by Ak Milk Supply</Footer>
    </Layout>
  );
};

export default HomePage;
