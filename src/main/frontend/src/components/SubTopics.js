import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function SubTopics({myArray, mainTopic}) {
    const classes = useStyles();
    const [chipData, setChipData] = React.useState([
    ]);

    function assign  () {
        for (let i = 0; i < myArray.val.length; i++){
            let newValue = {key : i, label : myArray.val[i]};
            chipData.push(newValue);
        }
    }


    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Paper component="ul" className={classes.root}>
            {assign()}
            {chipData.map((data) => {
                return (
                    <li key={data.key}>
                        <Chip
                            label={data.label}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    );
}