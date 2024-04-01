// import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, Select, TimePicker, InputNumber, DatePicker } from 'antd';
// import moment from 'moment';
// import './Supply.css';
// import authInstance from '../../services/auth';


// const { Option } = Select;

// const Supply = () => {
//   const [supplyType, setSupplyType] = useState('daily');
//   const [time, setTime] = useState(moment());
//   const [moreTimings, setMoreTimings] = useState([]);
//   const [quantity, setQuantity] = useState(0);
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [startingDate, setStartingDate] = useState();
//   const [lastDate, setLastDate] = useState(moment());
//   const [supply, setSupply] = useState({})
 

//   useEffect(()=>{
//     authInstance.getprofile()
//     .then((e)=>{
      
//       setSupply(e);
//     })
//   },[])


//   const handleSupplyTypeChange = value => {
//     setSupplyType(value);
//   };

//   const handleTimeChange = (e) =>{   
//     setTime(e);
//   }
  
//   const handleQuantityChange = value => {
//     setQuantity(value);
    
//   };

//   const handleMoreTimings = () => {
//     let a = moment(time)
//     setMoreTimings([...moreTimings, { time:a, quantity: quantity }]);
//     setTotalQuantity(totalQuantity+quantity)
   
//   };

//   const handleInitianDateChange = e => {    
//     console.log(e.target) 
//     let a = e.target.value.split('T')[0]
//   setStartingDate(a);
//   };
//   const handleLastDateChange = e => {
//     let a  = e.target.value.split('T')[0]
//     setLastDate(a);
//   };

//   const handleSubmit = async () => {
//      const profile = {
//       supplyType : supplyType,
//       supplies : moreTimings,
//       totalQuantity : totalQuantity,
//       startingDate : startingDate,
//       lastDate :  supplyType === 'dateRange' ? lastDate : ""
//      }    
    
//      const res = await authInstance.updateprofile(profile);
     
//      alert(res.data.message);
    
   
//   };

//   return ( 

   
    
//     <div>

// <div>
// <header><h1>Your Supply Detailss</h1></header>  
//   <p><b>Status</b> : {supply.status}</p>
//   <Input
//   variant="filled"
//   addonBefore={'Supply Type '}
//   value={supply.supplyType}/>

//   <Input
//   variant="filled"
//   addonBefore={'Startig Date '}
//   value={supply.startingDate}/>

//  <h3>Supply Time & Quantity</h3>
//   {
//     supply?.supplies?.map((data,i)=>{
//       return <div key={i}><p>Time : {moment(data.time).format("hh:mm A")}  -  Quantity : {data.quantity} liters</p>
//       <p></p>
//       </div>
//     })
//   }
  
// </div> <hr />

//        <header><h1>Edit Supply Details</h1></header>
//       <Form layout="vertical" onFinish={handleSubmit}>

// <Form.Item label="Supply Type">
//   <Select defaultValue="daily" onChange={handleSupplyTypeChange}>

//     <Option value="daily">Daily</Option>
//     <Option value="dateRange">Date Range</Option>
//     <Option value="oneDay">One Day</Option>

//   </Select>
// </Form.Item>

// {supplyType === 'dateRange' && (
// <>
// <Form.Item label="Select Starting Date"
// style={{ display: 'inline-block', marginRight: '10px' }}>

// <input type="date"
// onChange={handleInitianDateChange} 
// value={startingDate} 
//  />
// </Form.Item>

// <Form.Item label="Select Last Date"
// style={{ display: 'inline-block', marginRight: '10px' }}>
// <DatePicker 
//   onChange={(e)=>handleLastDateChange(e)} 
//   value={lastDate} 
//   format="YYYY-MM-DD" 
// />

// {/* <input type="date"
// onChange={(e)=>handleLastDateChange(e)} 
// value={lastDate} 
//  /> */}
// </Form.Item> <br />

// <div style={{ display: 'flex', alignItems: 'center' }}>
// <Form.Item label="Select Timings" style={{ marginRight: '10px', marginBottom: 0 }}>
// <TimePicker 
// onChange={(e)=>handleTimeChange(e)} 
// value={time} 
// format="h:mm A" 
// />
// {/* <TimePicker use12Hours format="h:mm a"  /> */}
// </Form.Item>
// <Form.Item label="Quantity in liters" style={{ marginRight: '10px', marginBottom: 0 }}>
// <InputNumber 
// min={1} 
// onChange={handleQuantityChange} 
// value={quantity} 
// />


// </Form.Item>
// <Form.Item label='Add' style={{ marginBottom: 0 }}>
// <Button type="primary"
// onClick={handleMoreTimings}>Add</Button>
// </Form.Item>
// </div> <br />
// </>
// )}


// {(supplyType === 'daily') && (
  
//   <>

// <Form.Item label="Select Starting Date"
// style={{ display: 'inline-block', marginRight: '10px' }}>

// {/* <input type="date"
// onChange={(e)=>handleInitianDateChange(e)} 
// value={startingDate} 
//  /> */}

// <DatePicker 
//   onChange={(e)=>handleInitianDateChange(e)} 
//   value={startingDate} 
//   format="YYYY-MM-DD" 
// />      
// </Form.Item>

// <div style={{ display: 'flex', alignItems: 'center' }}>
// <Form.Item label="Select Timings" style={{ marginRight: '10px', marginBottom: 0 }}>
// <TimePicker 
// onChange={handleTimeChange} 
// value={time} 
// minDate={new Date()}
// format="h:mm A" 
// />
// </Form.Item>

// <Form.Item label="Quantity in liters" style={{ marginRight: '10px', marginBottom: 0 }}>
// <InputNumber 
// min={1} 
// onChange={handleQuantityChange} 
// value={quantity} 
// />    
// </Form.Item>

// <Form.Item label='Add' style={{ marginBottom: 0 }}>
// <Button type="primary"
// onClick={handleMoreTimings}>Add</Button>
// </Form.Item>
// </div> <br />

//   </>


// )}
// {supplyType === 'oneDay' && (

//   <>
  
//   <Form.Item label="Select Date"
// style={{ display: 'inline-block', marginRight: '10px' }}>

// <input type="date"
// onChange={(e)=>handleInitianDateChange(e)} 
// value={startingDate} 
//  />   
// </Form.Item>

// <div style={{ display: 'flex', alignItems: 'center' }}>
// <Form.Item label="Select Timings" style={{ marginRight: '10px', marginBottom: 0 }}>
// <TimePicker 
// onChange={handleTimeChange} 
// value={time} 
// format="h:mm A" 
// />
// </Form.Item>

// <Form.Item label="Quantity in liters" style={{ marginRight: '10px', marginBottom: 0 }}>
// <InputNumber 
// min={1} 
// onChange={handleQuantityChange} 
// value={quantity} 
// />    
// </Form.Item>

// <Form.Item label='Add' style={{ marginBottom: 0 }}>
// <Button type="primary"
// onClick={handleMoreTimings}>Add</Button>
// </Form.Item>
// </div> <br />
  
//   </>

// )}

// <ol>
// {
//   moreTimings.map((timing,index)=>{
           
//        return <li key={index+1}>{moment(timing.time).format('h:mm A')} - {timing.quantity} liters</li>
//   })
// }
// </ol>
// <p>Total Quantity : {totalQuantity} liters</p> 
// <Form.Item>
//   <Button type="primary" htmlType="submit">Create Supply</Button>
// </Form.Item>
// </Form> 


//     </div>
        
//   ); 
// };

// export default Supply;


import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, TimePicker, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import './Supply.css';
import authInstance from '../../services/auth';
import { io } from 'socket.io-client';

const { Option } = Select;

const Supply = () => {
  const [supplyType, setSupplyType] = useState('daily');
  const [time, setTime] = useState(moment());
  const [moreTimings, setMoreTimings] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [startingDate, setStartingDate] = useState();
  const [lastDate, setLastDate] = useState(moment());
  const [supply, setSupply] = useState({});
  const [checkStatus, setCheckStatus] = useState("");
  

  const socket = io("http://localhost:3001", {
    path: "/",
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
    transports: ['websocket'],

});

  useEffect(() => {
    authInstance.getprofile()
      .then((e) => {
        setSupply(e);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
      socket.on('notification', (message)=>{       
        setCheckStatus(message);
      })
  }, [checkStatus]);

  const handleSupplyTypeChange = value => {
    setSupplyType(value);
  };

  const handleTimeChange = time => {
    setTime(time);
  };

  const handleQuantityChange = value => {
    setQuantity(value);
  };

  const handleMoreTimings = () => {
        let a = moment(time)
         setMoreTimings([...moreTimings, { time:a, quantity: quantity }]);
        setTotalQuantity(totalQuantity+quantity)
       
      };

  const handleInitianDateChange = date => {
    setStartingDate(date.format('YYYY-MM-DD'));
  };

  const handleLastDateChange = date => {
    setLastDate(date);
  };

  const handleSubmit = async () => {
    const profile = {
      supplyType: supplyType,
      supplies: moreTimings,
      totalQuantity: totalQuantity,
      startingDate: startingDate,
      lastDate: supplyType === 'dateRange' ? lastDate.format('YYYY-MM-DD') : ""
    };

    try {
      const res = await authInstance.updateprofile(profile);
      alert(res.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div>
        <header><h1>Your Supply Details</h1></header>
        <p><b>Status</b> : {supply.status}</p>
        <Input
          variant="filled"
          addonBefore={'Supply Type '}
          value={supply.supplyType}
        />
        <Input
          variant="filled"
          addonBefore={'Starting Date '}
          value={supply.startingDate}
        />
        <h3>Supply Time & Quantity</h3>
        {supply?.supplies?.map((data, i) => (
          <div key={i}>
            <p>Time : {moment(data.time).format("hh:mm A")}  -  Quantity : {data.quantity} liters</p>
          </div>
        ))}
      </div>
      <hr />

      <header><h1>Edit Supply Details</h1></header>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Supply Type">
          <Select defaultValue="daily" onChange={handleSupplyTypeChange}>
            <Option value="daily">Daily</Option>
            <Option value="dateRange">Date Range</Option>
            <Option value="oneDay">One Day</Option>
          </Select>
        </Form.Item>

        {supplyType === 'dateRange' && (
          <>
            <Form.Item label="Select Starting Date">
              <DatePicker onChange={handleInitianDateChange} value={startingDate ? moment(startingDate) : null} format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item label="Select Last Date">
              <DatePicker onChange={handleLastDateChange} value={lastDate} format="YYYY-MM-DD" />
            </Form.Item>
          </>
        )}

        {(supplyType === 'daily' || supplyType === 'oneDay') && (
          <Form.Item label="Select Date">
            <DatePicker onChange={handleInitianDateChange} value={startingDate ? moment(startingDate) : null} format="YYYY-MM-DD" />
          </Form.Item>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item label="Select Time" style={{ marginRight: '10px', marginBottom: 0 }}>
            <TimePicker onChange={handleTimeChange} value={time} format="h:mm A" />
          </Form.Item>
          <Form.Item label="Quantity in liters" style={{ marginRight: '10px', marginBottom: 0 }}>
            <InputNumber min={1} onChange={handleQuantityChange} value={quantity} />
          </Form.Item>
          <Form.Item label='Add' style={{ marginBottom: 0 }}>
            <Button type="primary" onClick={handleMoreTimings}>Add</Button>
          </Form.Item>
        </div>

        <ol>
          {moreTimings.map((timing, index) => (
            <li key={index + 1}>{moment(timing.time).format('h:mm A')} - {timing.quantity} liters</li>
          ))}
        </ol>
        <p>Total Quantity : {totalQuantity} liters</p>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create Supply</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Supply;
