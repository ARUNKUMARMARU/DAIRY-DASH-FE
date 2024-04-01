import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import authInstance from '../../services/auth';
import Modal from 'antd/es/modal/Modal';
import { Button, Form, message } from 'antd';

function Profile() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [address,setAddress] = useState('');
  const [pincode,setPincode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    authInstance.getprofile()
      .then((e) => {
       
        setData(e);
     setName(e.name);
     setEmail(e.email);
     setAddress(e.address);
    setMobilenumber(e.mobilenumber);
    setPincode(e.pincode);
   

      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        
      });
  }, [isModal]);

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">Error: {error.message}</div>;

  const handleModal = ()=>{
    setIsModal(!isModal)
  }

  const handleName = (e)=>{
    setName(e.target.value)
  };
  const handleEmail =(e)=>{
    setEmail(e.target.value)
  };
  const handleMobileNumber = (e)=>{
    setMobilenumber(e.target.value)
  };
  const handleAddress = (e)=>{
    setAddress(e.target.value)
  };
  const handlePincode = (e)=>{
    setPincode(e.target.value)
  };

  const handleUpdate =async ()=>{
  if( name && email && mobilenumber && address && pincode){
    setAddress('');
    setEmail('');
    setMobilenumber('');
    setPincode('');
    setName('');

    const profile = {
      name,
      email,      
      mobilenumber,
      address,
      pincode
    }
    
   const res = await authInstance.updateprofile(profile)
   const alert1 = confirm("Profile Updated Successfully")
   console.log(alert1)
   if(alert1){
    setIsModal(!isModal)

   }
  }else{
    alert("Kindly Fill All Fields")
  }
   
  }
  const handleCancel = ()=>{
    setIsModal(!isModal)
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="name">Name :</label>
        <input className="profile-input" value={data.name} type="text" />
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="email">Email :</label>
        <input className="profile-input" type="email" value={data.email} />
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="mobilenumber">Mobile Number :</label>
        <input className="profile-input" type="text" value={data.mobilenumber} />
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="address">Address :</label>
        <input className="profile-input" type="textarea" value={data.address} />
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="pincode">Pincode :</label>
        <input className="profile-input" type="text" value={data.pincode} />
      </div>

   
   <div className="profile-header1">  
   <button className="profile-header2"
   onClick={handleModal}
   >Update Profile</button></div>

   <Modal
   open={isModal}
   footer={[
    <Button
    type="primary" 
    onClick={handleUpdate}>Update</Button>
   ]}
   onCancel={handleCancel}>

<Form >
<div className="profile-input-container">
        <label className="profile-label" htmlFor="name">Name :</label>
        <input className="profile-input" 
        value={name} 
        type="text" 
        onChange={(e)=>handleName(e)}/>
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="email">Email :</label>
        <input className="profile-input" 
        type="email" 
        value={email} 
        onChange={(e)=>handleEmail(e)}/>
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="mobilenumber">Mobile Number :</label>
        <input className="profile-input" 
        type="text" value={mobilenumber} 
        onChange={(e)=>handleMobileNumber(e)}/>
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="address">Address :</label>
        <input className="profile-input" 
        type="textarea" 
        value={address} 
        onChange={(e)=>handleAddress(e)}/>
      </div>
      <div className="profile-input-container">
        <label className="profile-label" htmlFor="pincode">Pincode :</label>
        <input className="profile-input" 
        type="text" 
        value={pincode} 
        onChange={(e)=>handlePincode(e)}/>
      </div>
</Form>
    
   </Modal>
    </div>
  );
}

export default Profile;
