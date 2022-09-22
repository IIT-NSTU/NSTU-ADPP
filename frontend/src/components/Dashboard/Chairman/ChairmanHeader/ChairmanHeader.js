import React, { useEffect, useState } from 'react';

import axios from "axios";
import { toast } from 'react-toastify';
import './ChairmanHeader.css';

const ChairmanHeader = () => {
    const [allTimeApplied, setAllTimeApplied] = useState(null)
    const [allTimeAccepted, setAllTimeAccepted] = useState(null)
    const [allTimePending, setAllTimePending] = useState(null)
    const [allTimeRejected, setAllTimeRejected] = useState(null)
    const getData = async () => {
        axios.get('http://localhost:8000/api/student-provisional-applied-list/')
            .then(res => {
                setAllTimeApplied(res.data.length)
                axios.get("http://localhost:8000/api/provisional-applied-list-for-chairman/")
                    .then(res => {
                        setAllTimePending(res.data.length)
                        axios.get("http://localhost:8000/api/provisional-accepted-list-by-chairman/")
                            .then(res => {
                                setAllTimeAccepted(res.data.length)
                                axios.get("http://localhost:8000/api/provisional-rejected-list-by-chairman/")
                                    .then(res => {
                                        setAllTimeRejected(res.data.length)
                                    })
                            })

                    })
            })
            .catch(err => {
                toast.error("something went wrong")
            })
    }
    useEffect(() => {
        getData()
    }, [])


    return (

        <React.Fragment>
            <div class="chairman__header__container">
                <div class="c-dashboardInfo">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Pending Request<svg class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            {/* <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                            </path> */}
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allTimePending ? allTimePending : '0'}</span>
                    </div>
                </div>
                <div class="c-dashboardInfo ">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Request Accepted<svg class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            {/* <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                            </path> */}
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allTimeAccepted ? allTimeAccepted : '0'}</span>

                        {/* <span class="hind-font caption-12 c-dashboardInfo__subInfo">Last month: €30</span> */}
                    </div>
                </div>
                <div class="c-dashboardInfo">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Request Rejected<svg class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            {/* <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                            </path> */}
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allTimeRejected ? allTimeRejected : '0'}</span>
                    </div>
                </div>
                <div class="c-dashboardInfo">
                    <div class="wrap">
                        <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Overall Request<svg class="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            {/* <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                            </path> */}
                        </svg></h4><span class="hind-font caption-12 c-dashboardInfo__count">{allTimeApplied ? allTimeApplied : '0'}</span>
                    </div>
                </div>
            </div>

        </React.Fragment >

    )
}

export default ChairmanHeader