import React, {useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import MentorService from "../services/MentorService";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Dropdown} from "primereact/dropdown";
import TopicService from "../services/TopicService";
import {MultiSelect} from "primereact/multiselect";
import Button from "@material-ui/core/Button";
import MentorTablePage from "./MentorTablePage"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        },
        textfield:{
            width: '100%',
        }

    },
}));


const SearchMentor = () => {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [mentors, setMentors] = useState([])
    const [search, setSearch] = useState("");
    const [selectedMainTopic, setSelectedMainTopic] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [show, setShow] = useState(false);
    const [mainTopics, setMainTopics] = useState(null);
    const [topics, setTopics] = useState([]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log(search);
        console.log(mentors)
    }

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

    useEffect( () => {
        console.log(search);
        setMentors([])
        MentorService.findMentor(search).then((res) => {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
                arr.push(res.data[i])
            }
            setMentors(arr)
        })
    }, [ search]);

    const changeShow = () => {
        setShow(true);
        TopicService.getSubTopics(selectedMainTopic).then(
            (res) => {setTopics(res.data)}
        );
        console.log(topics);
    }

    const submit = () => {
        setMentors([])
        MentorService.findByTopicAndSubtopic(selectedMainTopic, selectedTopic).then(
            (res) => {setMentors(res.data)}
        );
    }

    return (

        <div style={{ marginTop: '60px' }}>
            <div className="card">
                <h5>Belirli konulara göre ara</h5>
                <Dropdown value={selectedMainTopic} options={mainTopics} onChange={(e) => setSelectedMainTopic(e.value)} placeholder="Ana konu seç" />
            </div>
            <Button variant="contained" color="primary" onClick={changeShow}>Seç</Button>
            <div className="card">
                <h5>Alt Konular</h5>
                {show ?
                    <MultiSelect value={selectedTopic} options={topics} onChange={(e) => setSelectedTopic(e.value)} placeholder="Alt konu seç" display="chip" />
                    : null
                }
             </div>
            <Button variant="contained" color="primary" onClick={submit}>Mentor ara</Button>
            <div className="card">
                <h5>İstediğiniz bir kelimeye göre arama yapın</h5>
                <TextField
                    style={{marginTop:30}}
                    inputProps={{min: 0, style: { textAlign: 'center'}}}
                    id="outlined-basic"
                    label="mentor ara"
                    variant="outlined"
                    type="search"
                    value={ search }
                    onChange={handleSearchChange}
                />
            </div>

            <MentorTablePage data={mentors} where="search"/>
        </div>
    );
}

export default SearchMentor;