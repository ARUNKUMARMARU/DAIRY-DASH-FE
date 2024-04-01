import React, { useEffect, useState } from 'react'
import authInstance from '../../services/auth';
import { Table, Select, InputNumber, Space, Button, message, Menu } from 'antd';
import { io } from 'socket.io-client';

function Admin() {    
   
    const [pendingCustomerDetails, setPendingCustomerDetails] = useState([]);   
    const[price,setPrice] = useState(0);
    const[payment,setPayment] = useState([]);
    const[status,setStatus] = useState('');
    const[currPrice,setCurrPrice] = useState(0);
    const [success, setSuccess] = useState(false);
    

    const socket = io("http://localhost:3003", {
    path: "/milk",
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
    transports: ['websocket'],

});
    
    useEffect( ()=>{       
          authInstance.getallusers()
          .then((e)=>{          
            const arr = [];            
            for(var i=0; i<e.length; i++){
              if(e[i].status == 'Pending'){
                  arr.push(e[i])                  
              }
            }            
                
            setPendingCustomerDetails(arr);
           
          });
          
          authInstance.getprofile()
          .then((e)=>{            
            setCurrPrice(e.price)
            setPrice(e.price);
          })
        
        .catch((error)=>{
          console.log(error.message)
        });

        authInstance.paymenthistries()
        .then((e)=>{   
             
          setPayment(e.details);
        })
       

        },[success])       

        const handleStatus = (e)=>{
          setStatus(e);
        }
        const saveStatus = async (customerId)=>{
          try {

            const update = { 
              customerId: customerId, 
              status: status }
              
            await authInstance.savedStatus(update);
            socket.emit('notification', status);
            message.success('Status saved successfully');
          } catch (error) {
            console.error('Error saving status:', error.message);
            message.error('Failed to save status');
          }

        }
        const handleChangePrice = (e)=>{
          
          setPrice(e)
        }
        const updatePrice = async ()=>{
         
        const res = await  authInstance.updateprice({price : price});
       setSuccess(!success);
       const confirm1 = alert(res)
       if(confirm1){
        setSuccess(!success)
       }
        }

        const items = [
          {
            label: (
              <a href="/admin"
               
               style={{color:'white',}}>
                Home
              </a>
            ),
            key: 'admin',
          },
          {
            label: (
              <a href="/admin-view_customer"
               
               style={{color:'white',}}>
                View Customers
              </a>
            ),
            key: 'admin-view_customer',
          },

          {
            label: (
              <a href="/admin-chat" 
              style={{color:'white',}} >
               Live Chat
              </a>
            ),
            key: 'admin-chat',
          }
        ]

        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width : 150,
            fixed : 'left',
          },
          {
            title: 'Mobile Number',
            dataIndex: 'mobilenumber',
            key: 'mobilenumber',
            width : 150,
            fixed : 'left',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width : 150,
          },         
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width : 300,
          },
          {
            title: 'Pin Code',
            dataIndex: 'pincode',
            key: 'pincode',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title : "Supply Type",
            dataIndex : "supplyType",
            key : "supplyType",
            
          },
          {
            title : 'Supplies Details',
           dataIndex : 'supplies1',
           keyv : 'supplies',          
            
          },
          {
            title :'Starting Date',
            dataIndex :'startingDate',
            key :'startingDate',
          },
          {
            title :'Last Date',
            dataIndex :'lastDate',
            key :'lastDate'
          },
          {
            title: 'Status',
            key: 'operation',
            fixed: 'right',
            width : 150,
            render: () => 
              <Select
              
              onChange={(e)=>handleStatus(e)}
              
                style={{
                  width: 100,
                }}             
              
                options={[
                  {
                    value: 'Accepted',
                    label: 'Accepted',
                  },
                  {
                    value: 'Rejected',
                    label: 'Rejected',
                  },
                  
                ]}
              />
              },
              {
                title :'Submit',               
                key :'submit',
                fixed: 'right',
                render : (record)=>
                <Button
                type='primary'
                onClick={()=>saveStatus(record._id)}>Submit</Button>
              }       
        ]
        const columns2 = [
          {
            title: 'NAME',
            dataIndex: 'customerName'            
          },
          {
            title: 'MOBILE NUMBER',           
            dataIndex: 'mobileNumber',
            
          },
          {
            title: 'PAID AMOUNT',
            dataIndex: 'amount',
          },
          {
            title: 'QUANTITY',
            dataIndex: 'quantity',
          },
          {
            title: 'DATE',
            dataIndex: 'paymentDate',
          },
        ];
        console.log(payment[2])
  return (
    <div>

      <div>
        <Menu
        mode="horizontal" 
        items={items}      
        style={{backgroundColor:'black',
        width:'100%',
        position:'fixed',
        top:0,
        zIndex: 9999}}>

        </Menu>
      </div>

<div>
        <h3>Update Price</h3>

        <h4>Current Price : {`₹ ${currPrice} / liter`}</h4>
        <Space>
          
    <InputNumber
          
      //parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      value={price}
      onChange={(e)=>handleChangePrice(e)}
    /> <span 
    style={{fontSize:'20px'}}> / liter</span>
     <Button
     type='primary'
     onClick={updatePrice}>Update</Button>    
    </Space>
      </div> <br />

      <hr />

      <div>
        <h3>New Supplies</h3>
        <Table 
       dataSource={pendingCustomerDetails }
       columns={columns}
       scroll={{
        x: 2000,
        y: 300 
      }}>

       </Table>

      </div> <hr />

      <div>
        <h2 style={{textAlign:"center"}}><u>Payment Histries</u></h2>

        <Table
    columns={columns2}
    dataSource={payment}
    bordered  
    
  />
      </div>

     
    </div>
  )
}

export default Admin