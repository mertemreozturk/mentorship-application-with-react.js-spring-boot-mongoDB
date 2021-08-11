import React, {useEffect, useState} from 'react';
import { useLocation, useHistory, withRouter } from "react-router-dom";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import MailIcon from '@material-ui/icons/Mail';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import PeriodService from "../services/PeriodService";
import { Carousel } from 'primereact/carousel';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import DoneIcon from '@material-ui/icons/Done';
import InfoIcon from '@material-ui/icons/Info';

const Detail = () => {
    const location = useLocation();
    console.log(location.state.username)
    const [period, setPeriod] = useState()
    const [phases, setPhases] = useState([])
    const history = useHistory();

    useEffect( () => {
        PeriodService.getPeriod(location.state.mentorId, location.state.id).then(
            (res) => {setPeriod(res.data)}
        );
        PeriodService.getAllPhases(location.state.mentorId, location.state.id).then(
            (res) => {setPhases(res.data)}
        );
    }, []);

    const header = (
        <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
        </span>
    );

    const phaseTemplate = (phase) => {
        console.log(phase)
        //<span className={`product-badge status-${phase.inventoryStatus.toLowerCase()}`}>{phase.inventoryStatus}</span>
        return (
            <div className="phase-item">
                <div className="phase-item-content">
                    <div>
                        <h4 className="p-mb-1">{phase.phaseName}</h4>
                        <h6 className="p-mt-0 p-mb-3"><PlayArrowIcon/>{phase.startDate}</h6>
                        <h6 className="p-mt-0 p-mb-3"><DoneIcon/>{phase.endDate}</h6>
                        <h5 className="p-mt-0 p-mb-3"><InfoIcon/>{phase.isCompleted === null ? "Başlamadı" : "Tamamlanmadı"}</h5>

                        <div className="car-buttons p-mt-5">
                            <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const goToPlan = () => {
        console.log("hrehdcnkjfmls")
        history.push('/planning', location.state)
    }

    const begin = () => {
        console.log("for trigger")
    }

    return (
        <div>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Card title="Mentor" subTitle= {location.state.mentorName}  style={{ width: '22em' , marginLeft: '200px'}}  footer={footer} >
                    <p className="p-m-0" style={{lineHeight: '1.5'}}>
                        <MailIcon/> {location.state.mentorMail}
                    </p>
                    <p className="p-m-0" style={{lineHeight: '1.5'}}>
                        <LibraryBooksIcon/> {location.state.topic}
                    </p>
                </Card>
                <Card title="Mentee" subTitle={location.state.username} style={{ width: '22em', marginRight: '-200px' }}  footer={footer} >
                    <p className="p-m-0" style={{lineHeight: '1.5'}}>
                        <MailIcon/> {location.state.email}
                    </p>
                    <p className="p-m-0" style={{lineHeight: '1.5'}}>
                        <LibraryBooksIcon/> {location.state.subtopics.toString()}
                    </p>
                </Card>
            </div>
            {period.isBegin === null ?
                <Button onClick={() => goToPlan()} className="p-button-success p-button-rounded p-mr-2">Süreç Planla</Button> :
                <Button onClick={() => begin()} className="p-button-success p-button-rounded p-mr-2">Süreci Başlat</Button>}
            <div className="card">
                <Carousel value={phases} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="352px"
                          itemTemplate={phaseTemplate} header={<h5>Fazlar</h5>} style={{maxWidth: '400px', marginTop: '2em'}} />
            </div>
        </div>

    );
};

export default withRouter(Detail);