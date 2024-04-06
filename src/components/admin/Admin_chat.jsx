import React, { useEffect, useState } from 'react'
import { SendOutlined } from '@ant-design/icons';
import Modal from 'antd/es/modal/Modal';
import { Button } from 'antd';
import { io } from 'socket.io-client';


function Chat() {
  const [isModal,setIsModal] = useState(false)
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState([]);

  const socket = io("https://dairy-dash-back-end-3.onrender.com", {
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
      console.log(`Connected to Server ${socket.id}`, message);
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
      
        <header className='chatheader'><h1>Customer Live Chat</h1></header>
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
 
      Check Messages
    </button>
         </div>
        
        <div>
          <Modal
          open={isModal}
          title="Live Chat"
          footer={null}
          width={'30%'}
          style={{height: '50%' }}
          onCancel={handleClose}>
            <div>
             <div style={{display:"flex",
            flexDirection:"column",
             height:"500px"}}>
           
            {
            chatMessage.map((message,i)=>{
            return <div className={message.type}>
             
            
           {message.text} 
             
            </div>
            })}
            
             </div>
              <div className='inputContainer'>
                <hr />
              <input type="text"
              className='inputText'
              value={message}
              onChange={(e)=>setMessage(e.target.value)}/>
              
              <Button  className='button'
              onClick={handleChat}>
              <SendOutlined style={{fontSize:'40px'}}/>
              </Button>
              
              </div>
            </div>
          </Modal>
        </div>

         
    </div>
  );
}

export default Chat