import React, {useEffect, useState} from 'react';
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import TopicService from "../services/TopicService";

const DeleteTopic = () => {
    const [error, setError] = useState(null);
    const [selectedMainTopic, setSelectedMainTopic] = useState(null);
    const [mainTopics, setMainTopics] = useState(null);

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

    const deleteThis = () => {
        TopicService.deleteTopic(selectedMainTopic).then();
        window.location.reload()
    }

    return (
        <div>
            <div className="card">
                <h5>Bir Konu Seç</h5>
                <Dropdown value={selectedMainTopic} options={mainTopics} onChange={(e) => setSelectedMainTopic(e.value)} placeholder="Ana konu seç" />
            </div>
            <Button label="Sil" icon="pi pi-trash" className="p-button-danger p-button-rounded p-mr-5"
                    onClick={() => deleteThis()}/>
        </div>

    );
};

export default DeleteTopic;