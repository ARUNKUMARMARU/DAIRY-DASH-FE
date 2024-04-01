import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Spin, message } from 'antd';
import authInstance  from '../../services/auth';
import './Signin.css'; 
import { useNavigate } from 'react-router-dom';


const SignIn = () => { 

  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [signupCompleate,setSignupCompleate] = useState(false);

  const navigate = useNavigate();

  const handleSignup = ()=>{
    setIsModal(!isModal)
    setIsLoading(false)
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobilenumber:'',
    address: '',
    pincode: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

const handleSubmit = async (e) => {  
    setIsLoading(!isLoading)
    const res = await authInstance.signup(formData)
   
    handleSignup();
   
};
const onCancel = ()=>{
  setIsModal(!isModal)
}

  const onFinish =async (values) => {  
    setIsLoading2(!isLoading2) 
    const user = {     
      email : values.email, 
      password : values.password,      
    }
   
    const res = await authInstance.signin(user)
   
    if(res.token){
      sessionStorage.setItem('token',res.token)
      if(!res.admin){
        navigate('/dashboard')        
      }else{
        navigate('/admin')
      }
      
    } else{     
    
    const mesg =  confirm('Invalid Email or Password..!')
    if(!mesg || mesg){
      setIsLoading2(false) 
    }
        
    }  
        

  };

  return (
    <div>
        <div className='signup'>
            <div className='text' >
                New Customer  <button 
            onClick={handleSignup}
            >SignUp?</button>

           <Modal
           open={isModal}
           title="Sign Up"     
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,
       isLoading?<Spin></Spin>: <Button key="submit" type="primary" onClick={handleSubmit} >Sign Up</Button>
      ]}
      closable={false}>

<Form onSubmit={handleSubmit}>
        <Form.Item label="Username">
          <Input
            type="text"
            name="name"
            autoComplete="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            type="email"
            name="email"
            autoComplete="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            name="password"
            value={formData.password}
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Item>
        <Form.Item label='Mobile Number'>
        <Input
            type="text"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />                  
        </Form.Item>
        <Form.Item label='Address'>
        <Input.TextArea            
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />                  
        </Form.Item>
        <Form.Item label='Pincode'>
        <Input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode"
            required
          />                  
        </Form.Item>
      </Form>
                       
           </Modal>
            </div>
            </div>
        <div className='img'>
        <div className="signin-container">
          
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
         <div className='header'>
         <header ><h1>SIGNIN</h1></header>
         <header ><h1><b></b></h1></header>
         </div>

        <Form.Item
          label="Email"
          name="email"
          autoComplete="email" 
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"          
          autoComplete="current-password"
          aria-required="true"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

           {isLoading2?<Spin></Spin>: <Form.Item>
           <Button 
          type="primary" 
          htmlType="submit"
         >
            Sign In
          </Button>
          </Form.Item>     }
        
      </Form>
     
    </div>
    </div>
    </div>
    
  );
};

export default SignIn;
