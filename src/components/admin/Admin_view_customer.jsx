import React from 'react'
import { useState, useEffect } from 'react';
import authInstance from '../../services/auth';
import { Table } from 'antd';

function Admin_view_customer() {
    const [customerDetails, setCustomerDetails] = useState([]);
    useEffect( ()=>{       

          authInstance.getallusers()
          .then((e)=>{          
            const arr2 = [];
            for(var i=0; i<e.length; i++){
              if(e[i].status != 'Pending'){
                arr2.push(e[i])                                  
              }
            }   
            setCustomerDetails(arr2);          
                    
          })    
        .catch((error)=>{
          console.log(error.message)
        })

        },[])
    const column2 =  [
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
        }]
  return (
    <div>
         <div>
        <header 
        style={{textAlign:"center",
      padding:'7px',backgroundColor:"lightgrey"}}
        ><h1><b>Customer Details</b></h1></header>
        
       <Table 
       dataSource={customerDetails }
       columns={column2}
       scroll={{
        x: 2000,
        y: 400 ,
      }}>

       </Table>
      </div>       
    </div>
  )
}

export default Admin_view_customer