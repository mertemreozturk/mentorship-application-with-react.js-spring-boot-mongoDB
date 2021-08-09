import axios from "axios";

const API_URL = 'http://localhost:8080/api/mentor';


class MentorService {
    createMentor(name, topic, subTopic, numberOfPhases, about) {
        return axios
            .post(API_URL + "/addMentor", {
                username: name,
                topic: topic,
                subtopics: subTopic,
                howManyPhases: numberOfPhases,
                about: about
            });
    }

    getMentees(name) {
        return axios
            .post(API_URL + "/getMentees/", {
                username: name
            });
    }

    findMentor(text) {
        return axios
            .get(API_URL+"/searchMentor/"+text);
    }

    findByTopicAndSubtopic(main, sub){
        return axios
            .post(API_URL +"/findMentorByTopics",{
                description: main,
                subtopics: sub
            })
    }

    acceptApply(id){
        return axios
            .put(API_URL +"/accept/" + id);
    }

    rejectApply(id){
        return axios
            .delete(API_URL + "/reject/" + id);
    }
}

export default new MentorService();