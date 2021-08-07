import React, {useEffect, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import MentorService from "../services/MentorService";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    const [mentors, setMentors] = useState([])
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        console.log(search);
        /*setMentors([])
        MentorService.findMentor(search).then((res) => {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
                arr.push(res.data[i])
            }
            setMentors(arr)
        })*/
        console.log(mentors)
    }

    useEffect(() => {
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


    return (

        <div style={{ marginTop: '60px' }}>
            <TextField
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    id="outlined-basic"
                    label="mentor ara"
                    variant="outlined"
                    type="search"
                    value={ search }
                    onChange={handleSearchChange}
            />

            <tbody>
            {
                mentors.map(
                    mentor =>
                        <h3>{mentor.username}</h3>
                )
            }
            </tbody>
        </div>
    );
}

export default SearchMentor;