import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import tableIcons from "../../../../assets/js/MateralTableIcons";
import ExamControllerHeader from '../Header/ExamControllerHeader';
// import './ChairmanRequestedDashboard.css';

const ExamControllerRequestedDashboard = () => {
    let navigate = useNavigate();
    const [certificateData, setCertificateData] = useState([])
    const getData = async () => {
        axios.get('http://localhost:8000/api/provisional-applied-list-for-examController/')
            .then(res => {
                console.log('hukka')
                let newArr = []
                res.data.map((v, i) => (
                    newArr.push(res.data[i].student_details)
                ))
                setCertificateData(newArr)
            })
            .catch(err => {
                toast.error("something went wrong")
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const columns = [
        { title: "Name", field: "name", sorting: true, filtering: true, filterPlaceholder: "Filter by name" },
        { title: "Roll", field: "roll", filterPlaceholder: "Filter by roll", align: 'center' },
        { title: "Department", field: "department", filterPlaceholder: "Filter by department", align: 'center' },
        {
            title: "Hall", field: "hall", align: 'center', filterPlaceholder: "Filter by hall",
        },
        {
            title: "Passing Year", field: "passing_year", filterPlaceholder: "Filter by passingYear", align: 'center'
        },
        {
            title: "session", field: "session", filterPlaceholder: "Filter by session", align: 'center'
        },
    ];

    const userDetails = (data) => {
        console.log("in details", data.roll)
        navigate(`/exam-controller/student-details/${data.roll}`)
    }

    return (
        <React.Fragment>
            <div>
                <ExamControllerHeader />

                <MaterialTable title="Applicant list for Provisional Certificate" icons={tableIcons} columns={columns} data={certificateData}
                    options={{
                        sorting: true, search: true,
                        searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                        filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20], pageSize: 5,
                        paginationType: "normal", showFirstLastPageButtons: true, paginationPosition: "bottom", exportButton: false,
                        exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: false,
                        showSelectAllCheckbox: false, showTextRowsSelected: false, selectionProps: rowData => ({
                            disabled: rowData.passingYear == null,
                            // color:"primary"
                        }),
                        columnsButton: false,
                        rowStyle: {
                            fontSize: 16,
                        }
                        /*rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
                        headerStyle: { background: "#f44336", color: "#fff" }*/
                    }}
                    localization={{
                        header: {
                            actions: 'action',

                        }
                    }}
                    actions={[
                        {
                            icon: () => <VisibilityIcon />,
                            tooltip: "details",
                            onClick: (e, data) => userDetails(data),
                        },

                    ]}

                />

                <p style={{ height: '20px' }}></p>
            </div>
        </React.Fragment >
    )
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    // provisional: state.certificate.provisional,

})

export default connect(mapStateToProps, {})(ExamControllerRequestedDashboard)