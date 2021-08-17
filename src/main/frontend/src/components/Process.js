import React, {useEffect, useState} from 'react';
import MentorshipTable from "./MentorshipTable";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import MentorService from "../services/MentorService";
import MentorTablePage from "./MentorTablePage";


const Process = () => {
    const [mentors, setMentors] = useState(null)
    const [mentees, setMentees] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const currentUser = AuthService.getCurrentUser();

    //const user = UserService.getUserInfo(currentUser.username);
    // <MentorshipTable title={"menteelik"} desc = {"Mentor Adı"}/>

    /*useEffect(  () =>{
        UserService.getUserInfo(currentUser.username).then(
            (res) => {setUserInfo(res.data)}
        );
        console.log(userInfo.id)
        MentorService.getMentors(currentUser.username).then(
            (res) => {setMentors(res.data)
            console.log(res.data)}
        );
        console.log(mentors);
    }, [currentUser.username]);*/

    return (
        //<MentorshipTable title={"menteelik"} where= "process" desc = {"Mentor Adı"} user={userInfo}/>
        <div>
            <MentorshipTable title={"mentorluk"} desc = "Mentee Adı" user={userInfo} who={"mentor"}/>
            <MentorshipTable title={"menteelik"} desc = {"Mentor Adı"} user={userInfo}/>
        </div>
    );
};

export default Process;