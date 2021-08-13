import React, {useState} from 'react';
import {Carousel} from "primereact/carousel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import InfoIcon from "@material-ui/icons/Info";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import CommentIcon from "@material-ui/icons/Comment";
import RateService from "../services/RateService";

const Phases = (phaseList) => {
    console.log(phaseList)
    const [showPhase, setShowPhase] = useState(false)
    const [showRatingArea, setShowRatingArea] = useState(false)

    const phaseTemplate = (phase) => {
        console.log(phase)
        //<span className={`product-badge status-${phase.inventoryStatus.toLowerCase()}`}>{phase.inventoryStatus}</span>
        return (
            <div className="phase-item" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="phase-item-content">
                    <div>
                        <h4 className="p-mb-1">{phase.phaseName}</h4>
                        <h6 className="p-mt-0 p-mb-3"><PlayArrowIcon/>{phase.startDate === null ? "Faz başlamadı" : phase.startDate}</h6>
                        <h6 className="p-mt-0 p-mb-3"><DoneIcon/>{phase.endDate}</h6>
                        <h5 className="p-mt-0 p-mb-3"><InfoIcon/>{phase.isCompleted === null ? "Başlamadı" : "Tamamlanmadı"}</h5>

                        <div className="car-buttons p-mt-5">
                            <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" onClick={() => ratePhase(phase)}/>
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>
                {
                    showPhase ?
                        <Card style={{width: '30em',marginLeft: '100'}}>
                            <h4 className="p-mt-0 p-mb-3" ><CommentIcon/>Yorumlar</h4>
                            {/*<tbody>
                            {
                                comments.map(
                                    comment =>
                                        <h3>{comment.comment}</h3>
                                )
                            }
                            </tbody>*/}
                        </Card> : null
                }
            </div>
        );
    }

    const phaseComment = (id) =>{
        console.log("infoforphase")
        setShowPhase(!showPhase)
        RateService.doesExist(id, location.state.id).then(
            (res) => {setShowRatingArea(res.data)}
        )
    }

    return (
        <div>
            <div className="card">
                <Carousel value={phaseList} numVisible={1} numScroll={1} orientation="vertical" verticalViewPortHeight="352px"
                          itemTemplate={phaseTemplate} header={<h5>Fazlar</h5>} style={{maxWidth: '400px', marginTop: '2em'}} />
            </div>
        </div>
    );
};

export default Phases;