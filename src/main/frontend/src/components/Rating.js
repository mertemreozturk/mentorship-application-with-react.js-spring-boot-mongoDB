import React, {useState} from 'react';
import { FaStar } from "react-icons/fa";
import StarRatingComponent from 'react-star-rating-component';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",

    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        background: "orange",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};

const Rating = () => {
    const location = useLocation();
    const [comment, setComment] = useState('')
    const [point, setPoint] = useState(0)
    //const [val2, setVal2] = useState(null);
    console.log(location);

    const onStarClick = (nextValue, prevValue, name) => {
        //this.setState({rating: nextValue});
        setPoint(nextValue)
    }

    return (
        <div style={{marginLeft:90}}>
            <Row style={{marginLeft:100}}>
                <StarRatingComponent name="rate1" starCount={5} value={point} onStarClick={onStarClick()}/>
            </Row>
            <Row>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Yorum Yap" style={styles.textarea}/>
            </Row>
            <Row>
                <Button variant="outline-light" style={{width:150, margin:"auto"}} onClick={this.saveRate} >
                    Oy ver
                </Button>
            </Row>
        </div>
    );
};

export default Rating;