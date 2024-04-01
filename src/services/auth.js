import instance from "./instance";

const authInstance = {

    signin : async (user)=>{
        const res = await instance.authInstance.post('/signin', user);
       
        return res.data
        
    },

    signup : async (user)=>{
      try{
          
        const res = await instance.authInstance.post('/signup', user);
                
        return res.data
      }catch(error){
        console.log(error)
      }
        
    },

    getprofile : async ()=>{
      try{
        const res = await instance.protectedInstance.get('/getuser');
       
        return res.data.user;

      }catch(error){
        return error.message
      }
    },

    updateprofile : async (profile)=>{
      try{
        
        const res = await instance.protectedInstance.put('/updateuser', profile);
      
        return res;

      }catch(error){
        return error.message
      }
    },

    savedStatus : async (update)=>{
      try{
        
        const res = await instance.protectedInstance.patch('/updatestatus', update);
      
        return res.data;

      }catch(error){
        return error.message
      }
    },

    updateprice : async (price)=>{
      try{
        
        const res = await instance.protectedInstance.put('/updateprice', price);
        
        return res.data.message;

      }catch(error){
        return error.message
      }
    },

    getprice : async ()=>{
      try{
        
        const res = await instance.protectedInstance.get('/getprice');
       
        return res.data.price;

      }catch(error){
        return error.message
      }
    },

    getallusers : async ()=>{
      try{
        const res = await instance.protectedInstance.get('/getallusers');
      
        return res.data.users;

      }catch(error){
        return error.message
      }
    },

    paymenthistries : async ()=>{
      try{
        
        const res = await instance.protectedInstance.get('/paymenthistries');
       
        return res.data;

      }catch(error){
        return error.message
      }
    },
}

export default authInstance;