import axios from "axios";

const API_URL = 'http://localhost:8080/api/mentor';


class MentorService {
    createMentor(name, topic, subTopic, numberOfPhases, about) {
        return axios
            .post(API_URL + "/addMentor", {
                username: name,
                topic: topic,
                subTopic: subTopic,
                howManyPhases: numberOfPhases,
                about: about
            });
    }

    findMentor(text) {
        return axios
            .get(API_URL+"/searchMentor/"+text);
    }
}

export default new MentorService();