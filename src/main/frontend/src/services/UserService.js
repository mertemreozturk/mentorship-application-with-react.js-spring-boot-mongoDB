import axios from "axios";

const API_URL = 'http://localhost:8080/api/user';

class UserService{
    getUserInfo(name) {
        return axios
            .post(API_URL + "/getUserInfo", {
                username: name
            });
    }
}

export default new UserService();