import React, {useEffect, useState} from 'react';
import { useLocation, useHistory, withRouter, useParams} from "react-router-dom";
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
import RateService from "../services/RateService";

const Detail = () => {
    const location = useLocation();
    const [period, setPeriod] = useState()
    const [phases, setPhases] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [userRates, setUserRates] = useState([])
    const history = useHistory();
    const { myId, myNick } = useParams();

    useEffect( () => {
        PeriodService.getPeriod(location.state.mentorId, location.state.id).then(
            (res) => {setPeriod(res.data)}
        );
        console.log(period)
        PeriodService.getAllPhases(location.state.mentorId, location.state.id).then(
            (res) => {setPhases(res.data)}
        );
        RateService.rates(myId).then(
            (res) => {setUserRates(res.data)}
        )

        console.log(userRates)
    }, []);

    const header = (
        <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );


    const phaseTemplate = (phase) => {
        //<span className={`product-badge status-${phase.inventoryStatus.toLowerCase()}`}>{phase.inventoryStatus}</span>
        return (
            <div className="phase-item" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="phase-item-content">
                    <div>
                        <h4 className="p-mb-1">{phase.phaseName}</h4>
                        <h6 className="p-mt-0 p-mb-3"><PlayArrowIcon/>{phase.startDate === null ? "Faz başlamadı" : phase.startDate.substring(0, 10) +" "+ phase.startDate.substring(11, 19)}</h6>
                        <h6 className="p-mt-0 p-mb-3"><DoneIcon/>{phase.endDate.substring(0, 10)} {phase.endDate.substring(11, 19)}</h6>
                        <h5 className="p-mt-0 p-mb-3"><InfoIcon/>{phase.isCompleted === null ? "Başlamadı" : phase.isCompleted}</h5>
                        {
                            (phase.isCompleted === 'Devam Ediyor' && controlphs(phase.id) )?
                                <Button onClick={() => ratePhase(phase)} className="p-button-success p-button-rounded p-mr-2">Fazı Tamamla</Button> :
                                (phase.isCompleted === 'Faz Tamamlandı' && !userRates.includes(phase.id) ) ?
                                        <Button onClick={() => onlyRate(phase)} className="p-button-success p-button-rounded p-mr-2">Fazı Değerlendir</Button> : null
                        }

                        <div className="car-buttons p-mt-5" style={{marginTop:10}}>
                            <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" onClick={() => getComments(phase.id)}/>
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>


            </div>
        );
    }

    function controlphs (id) {
        PeriodService.controlPhase(id, location.state.mentorId, location.state.id).then(
            (res) => setIsCompleted(res.data)
        );
        return isCompleted;
    }

    const goToPlan = () => {
        history.push('/planning', location.state)
    }

    const begin = () => {
        console.log("for trigger")
        PeriodService.triggerPhase(location.state.mentorId, location.state.id).then();
        window.location.reload()
    }

    function phaseComment  (id) {
        RateService.doesExist(id, location.state.id).then(
            (res) => {
                //setShowRatingArea(res.data)
                return res.data;
            }
        )
        //return showRatingArea;
    }

    const ratePhase = (phase) => {
        PeriodService.triggerPhase(location.state.mentorId, location.state.id).then();
        history.push('/rate',[phase, myId, myNick])
    }

    const onlyRate = (phase) => {
        history.push('/rate',[phase, myId, myNick])
    }

    const getComments = (id) => {
        /*RateService.getRates(id).then(
            (res) => {setComments(res.data)}
        );
        console.log(comments)*/

        history.push('/comments', id)
        //setShowRatingArea(!showRatingArea)
    }

    //console.log(period)
    //console.log(showRatingArea)
    return (
        //period.startDate.substring(0, 10) {period.startDate.substring(0, 10)}
        <div>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p className="p-m-0" style={{lineHeight: '1.5'}}>
                       Başlangıç Tarihi <DateRangeIcon/>
                    </p>
                        <Card title="Mentor"  style={{ width: '22em' , marginLeft: '200px'}}  >
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <PersonIcon/> {location.state.mentorName}
                            </p>
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <MailIcon/> {location.state.mentorMail}
                            </p>
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <LibraryBooksIcon/> {location.state.topic}
                            </p>
                        </Card>
                        <Card title="Mentee" style={{ width: '22em', marginRight: '-200px'}}  >
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <PersonIcon/> {location.state.username}
                            </p>
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <MailIcon/> {location.state.email}
                            </p>
                            <p className="p-m-0" style={{lineHeight: '1.5'}}>
                                <LibraryBooksIcon/> {location.state.subtopics.toString()}
                            </p>
                        </Card>

            </div>
            {phases.length === 0 ?
                <Button onClick={() => goToPlan()} className="p-button-success p-button-rounded p-mr-2">Süreç Planla</Button> :
                (period.isBegin === "Başlamadı" ? <Button onClick={() => begin()} className="p-button-success p-button-rounded p-mr-2">Süreci Başlat</Button> :
                        null)
            }
            <div className="card">
                <Carousel value={phases} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="240px"
                          itemTemplate={phaseTemplate} header={<h5>Fazlar</h5>} style={{maxWidth: '170px', marginTop: '2em'}} />
            </div>
        </div>
    );
};

export default withRouter(Detail);