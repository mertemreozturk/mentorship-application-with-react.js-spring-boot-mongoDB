import axios from "axios";

const API_URL = 'http://localhost:8080/api/rate';

class RateService {

    doesExist(phaseId, memberId){
        return axios
            .post(API_URL + "/doesExist", {
                phaseId: phaseId,
                memberId: memberId,
            });
    }


}

export default new RateService();