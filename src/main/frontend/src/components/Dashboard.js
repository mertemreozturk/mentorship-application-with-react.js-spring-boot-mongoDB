import React, {useEffect, useState} from 'react';
import AuthService from "../services/AuthService";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import PrimarySearchAppBar from "./PrimarySearchAppBar";

const Dashboard = () => {
    const currentUser = AuthService.getCurrentUser();
    const [showAdminPanel, setShowAdminPanel] = useState(currentUser.roles.includes("ROLE_MANAGERS"));


    return (
        <div>
            <PrimarySearchAppBar name = {currentUser.username}/>
            {showAdminPanel ? <AdminPanel/> : <UserPanel/> }
        </div>
    );
};

export default Dashboard;