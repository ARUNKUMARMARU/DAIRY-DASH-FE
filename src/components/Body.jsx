import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Profile from "./profile/Profile";
import Payment from "./payment/Payment";
import Chat from "./chat/Chat";
import Supply from './supply/Supply';
import NavBar from "./NavBar";
import Admin_view_customer from '../components/admin/Admin_view_customer';
import Admin_chat from "./admin/Admin_chat";

const Body = () => {
    const isLoggedIn = sessionStorage.getItem('token');
    const location = useLocation();
    const renderNavBar = !['/admin-view_customer', '/admin-chat'].includes(location.pathname);
  
    if (!isLoggedIn) {
      return <Navigate to="/signin" />;
    }
  
    return (
      <>
      {renderNavBar && <NavBar />}
      <Routes>
        <Route path="/admin-view_customer" element={<Admin_view_customer />} />
        <Route path="/admin-chat" element={<Admin_chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/create-supply" element={<Supply />} />
      </Routes>
    </>
        
    );
  };

  export default Body;