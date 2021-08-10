import React from 'react';
import { useLocation } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import MailIcon from '@material-ui/icons/Mail';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';

const Detail = () => {
    const location = useLocation();
    console.log(location.state.username)

    const header = (
        <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
        </span>
    );

    return (
        <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Card title="Mentor" subTitle= {location.state.mentorName}  style={{ width: '22em' , marginLeft: '200px'}}  footer={footer} header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>
                   <MailIcon/> {location.state.mentorMail}
                </p>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>
                    <LibraryBooksIcon/> {location.state.topic}
                </p>
            </Card>
            <Card title="Mentee" subTitle={location.state.username} style={{ width: '22em', marginRight: '-200px' }}  footer={footer} header={header}>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>
                    <MailIcon/> {location.state.email}
                </p>
                <p className="p-m-0" style={{lineHeight: '1.5'}}>
                    <LibraryBooksIcon/> {location.state.subtopics.toString()}
                </p>
            </Card>
        </div>
    );
};

export default Detail;