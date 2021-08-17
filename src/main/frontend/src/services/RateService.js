import axios from "axios";

const API_URL = 'http://localhost:8080/api/rate';

class RateService {

    createRate(phaseId, memberId, name, text, value){
        return axios
            .post(API_URL + "/createRate", {
                phaseId: phaseId,
                memberId: memberId,
                name: name,
                comment: text,
                rate: value
            })
    }

    getRates(id){
        return axios
            .get(API_URL + "/getRates/" + id);
    }

    doesExist(phaseId, memberId){
        return axios
            .post(API_URL + "/doesExist", {
                phaseId: phaseId,
                memberId: memberId,
            });
    }

}

export default new RateService();