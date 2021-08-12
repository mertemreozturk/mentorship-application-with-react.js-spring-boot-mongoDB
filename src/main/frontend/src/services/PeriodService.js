import axios from "axios";

const API_URL = 'http://localhost:8080/api/period';

class PeriodService {

    addPhase(mentorId, menteeId, phases){
        return axios
            .put(API_URL + "/createPhases", {
                mentorId: mentorId,
                menteeId: menteeId,
                phase: phases
            });
    }

    getPeriod(mentorId, menteeId){
        return axios
            .post(API_URL + "/getPeriod", {
                mentorId: mentorId,
                menteeId: menteeId,
            });
    }

    getAllPhases(mentorId, menteeId) {
        return axios
            .post(API_URL + "/getAllPhases", {
                mentorId: mentorId,
                menteeId: menteeId
            });
    }

    triggerPhase(mentorId, menteeId){
        return axios
            .put(API_URL + "/triggerPhase", {
                mentorId: mentorId,
                menteeId: menteeId
            })
    }

}

export default new PeriodService();