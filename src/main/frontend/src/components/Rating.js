import React, {useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';



const Rating = () => {
    const location = useLocation();
    const [comment, setComment] = useState('')
    const [value, setValue] = React.useState(1);
    console.log(location);


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
        </div>
    );
};

export default Rating;