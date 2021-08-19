import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { useLocation, useHistory, withRouter } from "react-router-dom";
import { Editor } from 'primereact/editor';
import {Button} from "primereact/button";
import RateService from "../services/RateService";

const Rate = () => {
    const location = useLocation();
    const [value, setValue] = React.useState(1);
    const [text, setText] = useState('')
    const history = useHistory()
    console.log(location.state[0])
    console.log(location.state[1])
    const submit = () => {

        RateService.createRate(location.state[0].id, location.state[1], location.state[2],
            text, value).then();
        history.goBack();
    }

    return (
        <div style={{marginLeft:90}}>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <h5>Oy Verme Ekranı</h5>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
            <Editor style={{ height: '320px' }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
            <Button onClick={() => submit()} className="p-button-success p-button-rounded p-mr-2">Fazı Değerlendir</Button>
        </div>
    );
};

export default Rate;