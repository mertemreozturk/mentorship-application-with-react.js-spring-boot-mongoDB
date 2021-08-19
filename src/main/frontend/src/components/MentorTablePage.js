import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import MenteeService from "../services/MenteeService";
import AuthService from "../services/AuthService";
import { Button } from 'primereact/button';
import MentorService from "../services/MentorService";

const MentorTablePage  = ({data, where}) => {
    const [nodes, setNodes] = useState([]);
    const currentUser = AuthService.getCurrentUser();

    useEffect( () => {
        console.log("table"+data)
        let files = [];
        for (let i = 0; i < data.length; i++) {
            let node = {
                key: i,
                data: {
                    name: data[i].username,
                    email: data[i].email,
                    topic: data[i].topic
                },
                children: [
                    {
                        key: i,
                        data: {
                            name:
                                where === "search" ?
                                    (<Button label="Mentor seç" icon="pi pi-check" className="p-button-success p-button-rounded p-mr-2"
                                        onClick={() => acceptMentor(data[i].topic, data[i].subtopics, data[i].id)}/>
                                    )
                                    : ( <view>
                                            <view>
                                                <Button label="Kabul et" icon="pi pi-check" className="p-button-success p-button-rounded p-mr-2"
                                                    onClick={() => acceptApply(data[i].id)}/>
                                            </view>
                                            <view>
                                                <Button label="Reddet" icon="pi pi-times" className="p-button-danger p-button-rounded p-mr-5"
                                                    onClick={() => rejectApply(data[i].id)}/>
                                            </view>
                                        </view>),
                            email: data[i].about,
                            topic: data[i].subtopics.toString()
                        }
                    }
                ]
            };

            files.push(node);
        }

        setNodes(files);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const acceptMentor =(topic, subtopics, mentorId) =>{
        console.log(currentUser.username+"burda"+ topic +subtopics +mentorId);
        MenteeService.addMentee(currentUser.username, topic, subtopics, mentorId).then();

    }

    const acceptApply = (mentorId) => {
        MentorService.acceptApply(mentorId).then();
        window.location.reload()
    }

    const rejectApply = (mentorId) => {
        MentorService.rejectApply(mentorId).then();
        window.location.reload()
    }

    return (
        <div>
            <div className="card">
                <TreeTable value={nodes} paginator rows={10}>
                    <Column field="name" header="İsim" expander></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="topic" header="Uzmanlık"></Column>
                </TreeTable>
            </div>
        </div>
    );
}

export default MentorTablePage