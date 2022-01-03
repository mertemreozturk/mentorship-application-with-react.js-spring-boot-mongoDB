import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import MenteeService from "../../../services/MenteeService";
import AuthService from "../../../services/AuthService";
import { Button } from 'primereact/button';
import MentorService from "../../../services/MentorService";

const MentorTablePage  = ({data, where}) => {
    const [nodes, setNodes] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    const [flag, setFlag] = useState(false)

    useEffect( () => {
        process(data);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const process = (arr) => {
        let files = [];
        for (let i = 0; i < arr.length; i++) {
            let node = {
                key: i,
                data: {
                    name: arr[i].username,
                    email: arr[i].email,
                    topic: arr[i].topic
                },
                children: [
                    {
                        key: i,
                        data: {
                            name:
                                where === "search" ?
                                    (<Button label="Mentor seç" icon="pi pi-check" className="p-button-success p-button-rounded p-mr-2"
                                             onClick={() => acceptMentor(arr[i].topic, arr[i].subtopics, arr[i].id)}/>
                                    )
                                    : ( <view>
                                        <view>
                                            <Button label="Kabul et" icon="pi pi-check" className="p-button-success p-button-rounded p-mr-2"
                                                    onClick={() => acceptApply(arr[i].id)}/>
                                        </view>
                                        <view>
                                            <Button label="Reddet" icon="pi pi-times" className="p-button-danger p-button-rounded p-mr-5"
                                                    onClick={() => rejectApply(arr[i].id)}/>
                                        </view>
                                    </view>),
                            email: arr[i].about,
                            topic: arr[i].subtopics.toString()
                        }
                    }
                ]
            };

            files.push(node);
        }

        setNodes(files);
    }

    const takeApply = () => {
        MentorService.getApplies().then(
            (response) =>{
                process(response.data);
            }
        )
    }

    const acceptMentor =(topic, subtopics, mentorId) =>{
        MenteeService.addMentee(currentUser.username, topic, subtopics, mentorId).then(
            (response) => {
            }
        );

    }

    const acceptApply = (mentorId) => {
        MentorService.acceptApply(mentorId).then(
            (response) => {
                takeApply();
            }
        );

    }

    const rejectApply = (mentorId) => {
        MentorService.rejectApply(mentorId).then(
            (response) => {
                takeApply();
            }
        );
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