import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MentorService from "../services/MentorService";

const SearchMentor = () => {

    const [mentors, setMentors] = useState([])

    const getDataFromAPI = () => {
        console.log("Options Fetched from API")

        MentorService.findMentor().then((res) => {
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                mentors.push(res.data[i].username)
            }
            setMentors(mentors)
        })
    }

    return (
        <div style={{ marginLeft: '40%', marginTop: '60px' }}>
            <h3>Greetings from GeeksforGeeks!</h3>
            <Autocomplete
                style={{ width: 500 }}
                freeSolo
                autoComplete
                autoHighlight
                options={mentors}
                renderInput={(params) => (
                    <TextField {...params}
                               onChange={getDataFromAPI}
                               variant="outlined"
                               label="Search Box"
                    />
                )}
            />
        </div>
    );
}

export default SearchMentor;