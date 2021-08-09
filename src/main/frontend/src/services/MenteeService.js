import axios from "axios";

const API_URL = 'http://localhost:8080/api/mentee';


class MenteeService {
    addMentee(menteeName, topic, sub, mentorId){
        return axios
            .post(API_URL+"/addMentee",{
                username: menteeName,
                topic: topic,
                subtopics: sub,
                mentorId: mentorId
            })
    }

}

export default new MenteeService();