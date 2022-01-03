import React, {useEffect, useState} from 'react';
import MentorshipTable from "./MentorshipTable";


const Process = () => {

    const [userInfo, setUserInfo] = useState(null)

    return (
        <div>
            <MentorshipTable title={"Mentorluk Süreçlerim"} desc = "Mentee Adı" user={userInfo} who={"mentor"}/>
            <MentorshipTable title={"Menteelik Süreçlerim"} desc = {"Mentor Adı"} user={userInfo}/>
        </div>
    );
};

export default Process;