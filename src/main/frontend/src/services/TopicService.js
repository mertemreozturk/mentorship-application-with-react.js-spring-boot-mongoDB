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
}

export default new TopicService;