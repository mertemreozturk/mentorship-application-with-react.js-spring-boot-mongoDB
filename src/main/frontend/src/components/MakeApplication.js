import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
//import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import TopicService from "../services/TopicService";
import Button from '@material-ui/core/Button';

const MakeApplication = () => {
    const [error, setError] = useState(null);
    const [selectedMainTopic, setSelectedMainTopic] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [show, setShow] = useState(false);
    const [mainTopics, setMainTopics] = useState(null);
    const [topics, setTopics] = useState([]);

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

    return (
        <div>
            <div className="card">
                <h5>Ana konular</h5>
                <Dropdown value={selectedMainTopic} options={mainTopics} onChange={(e) => setSelectedMainTopic(e.value)} placeholder="Ana konu seç" />
            </div>
            <Button variant="contained" color="primary" onClick={changeShow}>seç</Button>
            <div className="card">
                {show ?
                    <MultiSelect value={selectedTopic} options={topics} onChange={(e) => setSelectedTopic(e.value)} placeholder="Alt konu seç" display="chip" />
                    : null
                }
            </div>
        </div>

    );
}

export default MakeApplication;