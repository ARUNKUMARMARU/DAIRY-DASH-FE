import React, { useEffect, useState } from 'react';
import { Col, Row, Button } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import authInstance from '../../services/auth';

function Payment() {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const priceData = await authInstance.getprice();
        setPrice(priceData);

        const profileData = await authInstance.getprofile();
        setQuantity(profileData.totalQuantity);

        setAmount(priceData * profileData.totalQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePayment = async () => {
    try {
     
      const stripe = await loadStripe('pk_test_51OzXnMCUbbaYImFXzjFwWb9Hare79aD6VIUaV6nKAa6yOXVQME2gyJyOUZGpF0mx2DWyGIO4uEPX8baNpoR29DJt007mrZBkwo');
      const response = await axios.post('http://localhost:3003/api/payment', {
        amount: price,
        quantity: quantity
      }, {headers:{Authorization:"bearer "+sessionStorage.getItem('token')}});

      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className='body'>
      <header className='chatheader'>
        <h1>Payment Details</h1>
      </header>
      <div>
        <Row>
          <Col span={12}>
            <h3>Current Price Of Milk : ₹ {price} / litre</h3>
            <h3>Your Total Quantity for Today: {quantity} litres</h3>
            <h3>Your Total Amount is ₹ {amount}</h3>
          </Col>
          <Col span={12}>
            <Button type='primary' onClick={handlePayment}>
              Pay Now
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Payment;


// import React, { useEffect, useState } from 'react'
// import { Col, Row, InputNumber,Button } from 'antd';
// import authInstance from '../../services/auth';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';


// function Payment() {
//   const [price,setPrice] = useState(0);
//   const [quantity,setQuantity] = useState(0);
//   const [amount, setAmount] = useState(0);

//   useEffect(()=>{
//    authInstance.getprice()
//     .then((e)=>{
//       setPrice(e)
//     });
//     authInstance.getprofile()
//     .then((e)=>{         
//       setQuantity(e.totalQuantity)     
//     })
//     setAmount(price*quantity);
//   })

//   const handlePayment = async () => {
//     const stripe = await loadStripe("pk_test_51OzXnMCUbbaYImFXzjFwWb9Hare79aD6VIUaV6nKAa6yOXVQME2gyJyOUZGpF0mx2DWyGIO4uEPX8baNpoR29DJt007mrZBkwo");

//     const details =  {
//       amount : amount,
//       quantity : quantity
//     }

//     const headers = {
//       "Content-Type": "application/json"
//     };

//     try {

//       // const response = await axios.post("https://stripe-83m5.onrender.com/api/create-checkout-session/", details);

//       const response = await axios.post("https://localhost:3001/api/payment");


//       const session = response.data

//       const result = stripe.redirectToCheckout({
//         sessionId: session.id
//       });

//       if (result.error) {
//         console.log(result.error);
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };
  
  
//   return (
//     <div className='body'>
//        <header className='chatheader'><h1>Payment Details</h1></header>
//        <div>
//        <Row>
//       <Col span={12}><h3>Current Price Of Milk : ₹ {price} / litre
//         </h3> 
//         <h3>Your Total Quantity for Today: {quantity} litres
//         </h3> 
//         <h3>Your Total Amount is ₹ {amount}</h3>
//         </Col>

//       <Col span={12}>
//         <Button
//         type="primary"
//         onClick={handlePayment}>Pay Now</Button>
//       </Col>
//     </Row>
        
//        </div>
//     </div>
//   )
// }

// export default Payment