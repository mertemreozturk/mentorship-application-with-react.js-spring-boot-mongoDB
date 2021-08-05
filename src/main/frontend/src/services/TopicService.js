import axios from "axios";

const API_URL = 'http://localhost:8080/api/topic';
class TopicService{
    createTopic(main, sub) {
        return axios
            .post(API_URL + "/addTopic", {
                description: main,
                subtopics: sub
            });
    }

    getAllTopics(){
        return axios
            .get(API_URL+"/getAllTopics");
    }

    getSubTopics(main){
        return axios.post(API_URL+"/getSubtopics",{
            description: main
        })
    }
}

export default new TopicService();