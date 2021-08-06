import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
//import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import TopicService from "../services/TopicService";
import Button from '@material-ui/core/Button';
import AuthService from "../services/AuthService";
import { InputTextarea } from 'primereact/inputtextarea';
import MentorService from "../services/MentorService";

const MakeApplication = () => {
    const currentUser = AuthService.getCurrentUser();
    const [error, setError] = useState(null);
    const [selectedMainTopic, setSelectedMainTopic] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [show, setShow] = useState(false);
    const [mainTopics, setMainTopics] = useState(null);
    const [topics, setTopics] = useState([]);
    const [about, setAbout] = useState('');
    const [numberOfPhases, setNumberOfPhases] = useState('');

    const phases = [1, 2 , 3, 4, 5];

    /*const topics = [
         'New York' ,
         'Rome' ,
         'London',
         'Istanbul' ,
         'Paris'
    ];*/

    useEffect( async () => {
        await fetch("http://localhost:8080/api/topic/getAllTopics")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setMainTopics(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, []);

    const changeShow = () => {
        setShow(true);
        TopicService.getSubTopics(selectedMainTopic).then(
            (res) => {setTopics(res.data)}
        );
        console.log(topics);
    }

    const submit = () => {
        console.log(numberOfPhases);
        MentorService.createMentor(currentUser.username, selectedMainTopic, selectedTopic, numberOfPhases, about).then();
        window.location.reload();
    }

    return (
        <div>
            <div className="card">
                <h5>Ana konular</h5>
                <Dropdown value={selectedMainTopic} options={mainTopics} onChange={(e) => setSelectedMainTopic(e.value)} placeholder="Ana konu seç" />
            </div>
            <Button variant="contained" color="primary" onClick={changeShow}>Seç</Button>
            <div className="card">
                <h5>Alt Konular</h5>
                {show ?
                    <MultiSelect value={selectedTopic} options={topics} onChange={(e) => setSelectedTopic(e.value)} placeholder="Alt konu seç" display="chip" />
                    : null
                }
                <InputTextarea value={about} onChange={(e) => setAbout(e.target.value)} rows={5} cols={30} />
                <h5>Bu program için kaç faz olmalı?</h5>
                <Dropdown value={numberOfPhases} options={phases} onChange={(e) => setNumberOfPhases(e.value)} placeholder="Ana konu seç" />
                <Button variant="contained" color="primary" onClick={submit}>Başvur</Button>
            </div>
        </div>

    );
}

export default MakeApplication;