import React, { useEffect, useState } from 'react'
import './Chat.css';
import { SendOutlined } from '@ant-design/icons';
import Modal from 'antd/es/modal/Modal';
import { Button } from 'antd';
import { io } from 'socket.io-client';


function Chat() {
  const [isModal,setIsModal] = useState(false)
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState([]);

  const socket = io("https://dairy-dash-back-end-2.onrender.com", {
    path: "/milk",
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
    transports: ['websocket'],

});

  useEffect(()=>{
    socket.on('connected', ()=>{
      console.log(`Connected to Server ${socket.id}`)
    });
  
    socket.on('send_message', (message)=>{
      console.log('Received Message :', message);
      // setChatMessage((prevMessage)=>[...prevMessage,message])
      setChatMessage([...chatMessage, {text:message, type:'receive'}])
     
    });
  
   return ()=>{
    socket.disconnect();
   };
  });


    const handleClick = ()=>{
      setIsModal(true);
    };
    
    const handleClose = () => {
      setIsModal(false);
    };

    const handleChat = ()=>{
if(message.trim() !==''){
  // setChatMessage((prevMessage)=>[...prevMessage, message]);
  setChatMessage([...chatMessage,{text:message, type:'sent'}])
  socket.emit('send_message', message);
  setMessage('');

}
    }

       
  return (
    <div className='body'>
      
        <header className='chatheader'><h1>Contact Us</h1></header>
        <div style={{paddingTop:"20px"}}>
         <button onClick={handleClick} 
         style={{ backgroundColor : 'green',
            color: 'white',    
             padding: '20px 30px',
             border: 'none',
            borderRadius : '10px',
            cursor: 'pointer',
            fontSize: '20px',
           fontWeight :'bold',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            position: 'absolute',  right:'20%'
            
             }}>
 
      Chat with us
    </button>
         </div>
        <div style={{paddingTop:"70px"}}>
          <h3 
          style={{backgroundColor:"pink",
          fontSize:"25px",
          padding:"20px",
          textAlign:"center"}}>
          Head Office Contact
          </h3>
          <ul className='ul'>
            <li className='li'> No:22/11,</li>
            <li className='li'>Ramamoorthi Nagar,</li>
            <li className='li'>Tiruvannamalai,</li>
            <li className='li'>Tamil Nadu – 606 601.</li>
            <li className='li'>LM: Next to Avulurpet Road Railway Gate Bharath Petrol Bunk.</li>         
          </ul>
        </div>

        <div>
          <h3 
          style={{backgroundColor:"pink",
          fontSize:"25px",
          padding:"20px",
          textAlign:"center"}}>
          Office Contact Details
          </h3>
          <ul className='ul'>
            <li className='li'> Call          : 99999 99999</li>
            <li className='li'>Mail           : akoffice@akweb.org.in, akmilksupply@gmail.com </li>
            <li className='li'>Website    : www.akmilksupply.org.in.</li>
            <li className='li'>Facebook : www.facebook.com/akmilksupply</li>
            <li className='li'>Twitter      : www.Twitter.com/akmilksupply</li>         
            <li className='li'>Timing      : Mon-Fri : 10:30 am to 5:30 pm, Saturday & Sunday: Holiday…</li>  
          </ul>
        </div>


        <div>
          <Modal
          open={isModal}
          title="Live Chat"
          footer={null}
          width={'30%'}
          style={{height: '50%' }}
          onCancel={handleClose}>
           
             <div style={{display:"flex",
            flexDirection:"column",
             height:"500px"}}>
           
            {
            chatMessage.map((message,i)=>{
            return <div className={message.type}>
             
            
           {message.text} 
             
            </div>
            })}
            
             </div> <hr />
             <div className="inputContainer">
  <input
    type="text"
    className="inputText"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />
  <Button className="button" onClick={handleChat}>
    <SendOutlined style={{ fontSize: '40px' }} />
  </Button>
</div>

          </Modal>
        </div>

         
    </div>
  );
}

export default Chat