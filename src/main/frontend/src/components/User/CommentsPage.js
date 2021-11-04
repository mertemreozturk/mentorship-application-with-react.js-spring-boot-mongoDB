import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Rating from '@material-ui/lab/Rating';
import {useLocation, useHistory} from "react-router-dom";
import RateService from "../services/RateService";

const CommentsPage = () => {
    const [assessment, setAssessments] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect( () => {
        RateService.getRates(location.state).then(
            (res) => {setAssessments(res.data)}
        )
        console.log(assessment)
    }, []);

    const ratingBodyTemplate = (rowData) => {
        return <Rating name="simple-controlled" value={rowData.rate} readOnly />;
    }

    const header = (
        <div className="table-header">
            Yorumlar
        </div>
    );

    const returnBack = () => {
        history.goBack();
    }

    const dateConverter = (rowData) => {
        return <h6>{rowData.date.substring(0, 10)+" "+rowData.date.substring(11, 16)}</h6>;
    }

    const textFormat = (rowData) => {
        return <h6>{rowData.comment.substring(3,rowData.comment.length-4)}</h6>
    }

    return (
        <div className="datatable-templating-demo">
            <div className="card">
                <DataTable value={assessment} header={header}>
                    <Column field="name" header="İsim"></Column>
                    <Column field="comment" header="Yorum" body={textFormat}></Column>
                    <Column field="rate" header="Puan" body={ratingBodyTemplate}></Column>
                    <Column field="date" header="Tarih" body={dateConverter} ></Column>
                </DataTable>
            </div>
            <Button onClick={() =>returnBack()} label="Geri Dön" icon="pi pi-backward" className="p-button-icon-left p-button-rounded p-mr-2"/>
        </div>
    );
}

export default CommentsPage;