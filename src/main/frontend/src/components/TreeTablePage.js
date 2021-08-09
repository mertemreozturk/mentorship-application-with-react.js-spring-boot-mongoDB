import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import MenteeService from "../services/MenteeService";
import AuthService from "../services/AuthService";
import Button from "@material-ui/core/Button";
import MentorService from "../services/MentorService";

const TreeTablePage  = ({data, where}) => {
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
                                    (<button variant="contained" color= "green"
                                        onClick={() => acceptMentor(data[i].topic, data[i].subtopics, data[i].id)}>
                                    Mentor seç </button>)
                                    : ( <view>
                                            <view>
                                                <button variant="contained" color= "green"
                                                    onClick={() => acceptApply(data[i].id)}>
                                                    Kabul et
                                                </button>
                                            </view>
                                            <view>
                                                <button variant="contained" color= "green"
                                                    onClick={() => rejectApply(data[i].id)}>
                                                    Reddet
                                                </button>
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
    }

    const rejectApply = (mentorId) => {
        MentorService.rejectApply(mentorId).then();
    }

    return (
        <div>
            <div className="card">
                <TreeTable value={nodes} paginator rows={10}>
                    <Column field="name" header="Name" expander></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="topic" header="Uzmanlık"></Column>
                </TreeTable>
            </div>
        </div>
    );
}

export default TreeTablePage