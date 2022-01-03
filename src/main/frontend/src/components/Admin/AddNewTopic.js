import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SubTopics from "../SubTopics";
import TopicService from "../../services/TopicService";
import AddIcon from '@material-ui/icons/Add';
import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    step_label_root: {
        fontSize: '28px',
    }
}));

function getSteps() {
    return ['Yeni Bir Konu Belirle!', 'Bir veya Birden Fazla Alt Konu Belirle', 'Seçtiğiniz Alt Konular'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return
        case 1:
            return <SubTopics/>
        case 2:
            return 'son asama';
        default:
            return 'Unknown step';
    }
}

function callSub(arr, topic){
    return <SubTopics myArray = {arr} mainTopic={topic}/>
}

export default function AddNewTopic() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [text, setText] = useState('')
    const [values, setValues] = useState({ val: []});

    const handleFinish = () => {
        TopicService.createTopic(text, values.val).then();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleTopic = () => {
        return (
            <div>
                <form className='add-form' >
                        <InputText className='input-form'
                            placeholder='Ana Konu'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                </form>
            </div>
        );
    };

    function dynamicInput() {

        function createInputs() {
            return values.val.map((el, i) =>
                <div key={i}>
                    <InputText value={el||''} onChange={handleChange.bind(i)} />
                    <IconButton
                        onClick={removeClick.bind(i)}
                    >
                        <RemoveIcon />
                    </IconButton>
                </div>
            );
        }

        function handleChange(event) {
            let vals = [...values.val];
            vals[this] = event.target.value;
            setValues({ val: vals });
        }

        const addClick = () => {
            setValues({ val: [...values.val, '']});
        }

        const removeClick = () => {
            let vals = [...values.val];
            vals.splice(this,1);
            setValues({ val: vals });
        }

        return (
            <form>
                {createInputs()}
                <IconButton
                    onClick={addClick}
                >
                    <AddIcon />
                </IconButton>
            </form>
        );

    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel classes={{ label: classes.step_label_root }}>{label}</StepLabel>
                        <StepContent>
                            <Typography>{
                                index === 0 ? handleTopic() : index === 1 ? dynamicInput() : callSub(values, text)
                            }</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Geri
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={activeStep === steps.length - 1 ? handleFinish: handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Oluştur' : 'İleri'}

                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Başarıyla oluşturuldu - yeni bir konu oluştur</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}