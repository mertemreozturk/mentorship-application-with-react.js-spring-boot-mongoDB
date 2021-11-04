import React, {useEffect, useState} from 'react';
import MentorTablePage from "./MentorTablePage";


const Applies = () => {
    const [error, setError] = useState(null)
    const [applies, setApplies] = useState('')

    useEffect( async () => {
        await fetch("http://localhost:8080/api/mentor/allApplies")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setApplies(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, []);

    return (
        <div>
            <MentorTablePage data = {applies}/>
        </div>
    );
};

export default Applies;