import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import {Calendar} from "primereact/calendar";
import {useHistory, useLocation} from "react-router-dom";
import PeriodService from "../../services/PeriodService";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

const Planning = () => {
    const classes = useStyles()
    const location = useLocation();
    const history = useHistory();
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), phaseName: '', endDate: '' },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("InputFields", inputFields);
        console.log(location)
        PeriodService.addPhase(location.state.mentorId, location.state.id, inputFields).then();
        history.goBack();
    };

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if(id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(),  phaseName: '', endDate: '' }])
    }

    const handleRemoveFields = id => {
        const values  = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <Container>
            <h1>Süreç Planlama</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                { inputFields.map(inputField => (
                    <div key={inputField.id}>
                        <TextField
                            name="phaseName"
                            label="Faz Adı"
                            variant="filled"
                            value={inputField.phaseName}
                            onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <Calendar id="icon"
                                  name="endDate"
                                  value={inputField.endDate}
                                  onChange={event => handleChangeInput(inputField.id, event)} showIcon />
                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleAddFields}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                )) }
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >Planla</Button>
            </form>
        </Container>
    );
};

export default Planning;