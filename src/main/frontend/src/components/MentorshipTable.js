import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
//import 'primeflex/primeflex.css';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import MentorService from "../services/MentorService";
import AuthService from "../services/AuthService";
import MenteeService from "../services/MenteeService";

const MentorshipTable = ({title, desc, user, who}) => {

    const currentUser = AuthService.getCurrentUser();
    const [mentors, setMentors] = useState();
    const [mentees, setMentees] = useState();
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');


    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }


    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }

    useEffect(() => {
        console.log("sorun?")
        MentorService.getMentees(currentUser.username).then(
            (res) => {setMentees(res.data)
                console.log(res.data)}
        );
        console.log(mentees);
        MenteeService.getMentors(currentUser.username).then(
            (res) => {setMentors(res.data)}
        );
        console.log(mentors);
    }, [user]);


    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Önceki</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Sonraki</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="p-ml-1" value={currentPage} tooltip={pageInputTooltip}
                                     onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };

    const mentorshipInfo = (mentor) => {
        console.log(mentor)
    }


    const actionBodyTemplate = (rowData) => {
        //icon="pi pi-pencil"
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => mentorshipInfo(rowData)} />
            </React.Fragment>
        );
    }

    return (
        <div>
            <div className="card">
                <h5>{title}</h5>
                <DataTable value={who === "mentor" ? mentees : mentors} paginator paginatorTemplate={template1} first={first1} rows={rows1} onPage={onCustomPage1}>
                    <Column field={ who === "mentor" ? "username" : "mentorName"} header={desc}></Column>
                    <Column field= "topic" header="Konu"></Column>
                    <Column field="company" header="Durum"></Column>
                    <Column field="id" header="Detay"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default MentorshipTable