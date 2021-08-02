import React, {useState} from 'react';
import SubTopics from "./SubTopics";

const MainTopic = () => {
    const [text, setText] = useState('')
    return (
        <div>
            <form className='add-form' >
                <div className='form-control'>
                    <input
                        type='text'
                        placeholder='Ana Konu'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
            </form>
            <SubTopics mainTopic = {text}/>
        </div>
    );
};

export default MainTopic;