import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import {
    getLiveLotsListAction, participateInLotAction, clearParticipateInLotStatusCleanAction, getCategoriesAction
} from '../Redux/Actions/Actions'
import UseCountdown from "./UseCountdown";
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";

import {getActiveLots, getUpcomingLots} from "../Api/lotsapi" 
import 'firebase/firestore';
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import ShowCurrentTIme from "./ShowCurrentTime";
import ShowCurrentTime from "./ShowCurrentTime";
import FixComponents from "./FixComponents";
function LiveLotsComponent(props) {
    const [liveAuctioList, setLiveLotsList] = useState(null);
    const [upCommingLotsList, setUpCommingLotsList] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredLiveAuctioList, setFilteredLiveAuctioList] = useState(null);
    const [filteredUpcommingAuctioList, setFilteredUpcommingAuctioList] = useState(null);
    const [pleseWait, setPleseWait] = useState(true);
    const [activeLots,setActiveLots]=useState({});
    const [upcomingLots,setUpcomingLots]=useState({});

    // const firebaseConfig = {
    //     apiKey: "AIzaSyCTMa2MX27L40POGDkoA-J_rOFL2bT7jz4",
    //     authDomain: "steel24-a898f.firebaseapp.com",
    //     databaseURL: "https://steel24-a898f-default-rtdb.firebaseio.com",
    //     projectId: "steel24-a898f",
    //     storageBucket: "steel24-a898f.appspot.com",
    //     messagingSenderId: "924896686955",
    //     appId: "1:924896686955:web:e7b4c62ab4e416a61f522e",
    //     measurementId: "G-ZPC54XMY2V"
    // };

    // initializeApp(firebaseConfig)
    // const db = getDatabase()
    // const data = ref(db, 'TodaysLots/') // CHANGE 'chars' TO YOUR DATABASE NAME

    useEffect(() => {
         props.getCategoriesAction();
    },[])

    useEffect(() => {
        if (selectedCategory) {

            if (liveAuctioList) {
                setFilteredLiveAuctioList(Object.values(liveAuctioList).filter((lot, index) => {
                    if (lot.categoryId === selectedCategory) {
                        return lot
                    }
                }))
            }
            if (upCommingLotsList) {
                setFilteredUpcommingAuctioList(Object.values(upCommingLotsList).filter((lot, index) => {
                    if (lot.categoryId === selectedCategory) {
                        return lot
                    }
                }))
            }
        }
        else {
            setFilteredLiveAuctioList(liveAuctioList);
            setFilteredUpcommingAuctioList(upCommingLotsList);
        }
    }, [selectedCategory])

    useEffect(() => {
        if (props?.loginUserDetailsReducer?.loginUserDetails) {
            setCustomerDetails(props.loginUserDetailsReducer.loginUserDetails)
        }
    }, [props?.loginUserDetailsReducer])

    useEffect(() => {
        if (customerDetails?.id) {
            getActiveLots().then((res)=>{
                if(res.status==200 && res.data?.success === true)
                {
                    setActiveLots(res.data)
                }
            })
            getUpcomingLots().then((res)=>{
                if(res.status==200 && res.data?.success === true)
                {
                    setUpcomingLots(res.data)
                }
            })
            // onValue(data, (snapshot) => {
            //     if (snapshot.val()) {
            //         if (snapshot.val().liveList !== liveAuctioList) {
            //             setPleseWait(false);
            //             setLiveLotsList(snapshot.val().liveList);
            //             setFilteredLiveAuctioList(snapshot.val().liveList);
            //             setUpCommingLotsList(snapshot.val().upcoming);
            //             setFilteredUpcommingAuctioList(snapshot.val().upcoming);
            //         }
            //     }
            //     else {
            //         setPleseWait(false);
            //         setLiveLotsList(null)
            //         setFilteredLiveAuctioList(null)
            //         setUpCommingLotsList(null)
            //         setFilteredUpcommingAuctioList(null)
            //     }
            // })
        }
    }, [customerDetails]);

    useEffect(() => {
        if (props.getLiveLotsListReducer?.liveLotsList) {
            // if (props.getLiveLotsListReducer?.liveLotsList.liveList.length) {
            //     setLiveLotsList(props.getLiveLotsListReducer?.liveLotsList.liveList)
            // }
            // if (props.getLiveLotsListReducer?.liveLotsList.upcoming.length) {
            //     setUpCommingLotsList(props.getLiveLotsListReducer?.liveLotsList.upcoming)
            // }
        }
        else if (props.getLiveLotsListReducer.Error) {
            // setErrorMessage(props.getLiveLotsListReducer.Error.Error.message);
        }
    }, [props.getLiveLotsListReducer, props.participateInLotReducer])

    useEffect(() => {
        if (props.participateInLotReducer?.Error) {
            setPleseWait(false)

            setErrorMessage(props.participateInLotReducer?.Error.message);
            props.clearParticipateInLotStatusCleanAction();
        }
        if (props.participateInLotReducer?.participateInLot) {
            setPleseWait(false)

            // props.getLiveLotsListAction(customerDetails.id);
        }
    }, [props.participateInLotReducer])

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage);
            // setErrorMessage(false)
        }
    }, [errorMessage])

    const participateInLot = (lotId) => {
        if (customerDetails?.id && customerDetails?.isApproved) {
            setPleseWait(true)

            props.participateInLotAction({ "customerId": customerDetails.id, "lotid": lotId })
        }
        else if (!customerDetails?.isApproved) {
            alert('Account status is not active please eequest to activate account.')
        }
    }

    // console.log(filteredLiveAuctioList)

    const liveLotComponent = (lot) => {
        return (<div key={lot.id}>
            <div className="card border-light  my-1" >
                <div className="card-header bg-translucent-light px-4">{lot?.title || lot.id}</div>
                <div className="card-body px-1 py-1">
                    <div className="nav-wrapper py-0">
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                            <li className="nav-item p-0 m-0 bg-primary text-white border">
                                Lot No : {lot?.id || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-translucent-info text-dark border row " >
                                <div className="nav-item m-0 border-right p-0 twoInOne1">Qty : {lot?.Quantity || '- -'}</div>
                                <div className="nav-item m-0 border-right p-0 twoInOne1">@ Rs. {lot?.Price || '- -'}</div>
                            </li>
                            <li className="nav-item p-0 m-0 bg-pink text-dark  border">
                                Started : {lot?.StartDate || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-pink text-dark border">
                                End : {lot?.EndDate || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 border">
                                <UseCountdown startDate={lot?.StartDate} endDate={lot?.EndDate} />

                            </li>
                        </ul>
                    </div>
                    <div className="nav-wrapper my-2 py-0 text-dark ">
                        <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">

                            <li className="nav-item p-0 m-0 bg-info border">
                                Categorie : {lot?.categoriesTitle || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-info border">
                                Material At : {lot?.materialLocation || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-info border">
                                Made In : {lot?.Plant || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-info border">
                                Status : {lot?.lot_status || '- -'}
                            </li>
                            <li className="nav-item p-0 m-0 bg-translucent-light border row" >
                                <div className="nav-item m-0 border-right p-0 twoInOne2"><span>Started Rs : </span> <span>{lot.Price || '- -'}</span></div>
                                <div className="nav-item m-0 border-right p-0 twoInOne2"><span>Participate Fee : </span> <span>{lot.participate_fee}</span></div>
                            </li>
                            {/* <li className="nav-item p-0 m-0 border">
                              
                            </li> */}
                        </ul>
                    </div>
                    {lot?.lot_status === 'pose'
                        ?
                        <button className="btn  btn-primary w-100 ">Posed </button>
                        : lot?.ParticipateUsers && lot?.ParticipateUsers.includes(customerDetails.id) ?
                            <Link to={'/livelotdetails/' + lot.id} className="btn  btn-primary w-100">Bid Now </Link>
                            : <button className="btn  btn-primary w-100 " onClick={() => { window.confirm("Do you want to participate in lot with " + lot.participate_fee + " deposit?") && participateInLot(lot.id) }}  >Participate In Lot </button>}
                </div>
            </div >
            <hr className="my-3" />
        </div>
        );
    }

    const upCommingLotComponent = (lot) => {
        return (
            <div key={lot.id}>
                <div className="card border-light  my-1" >
                    <div className="card-header">{lot.title}
                    </div>
                    <div className="card-body px-1 py-1">
                        <div className="nav-wrapper py-0">
                            <ul className="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                                <li className="nav-item p-0 m-0 bg-primary text-white border">
                                    Lot No : {lot?.id || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-translucent-info text-dark border row" >
                                    <div className="nav-item m-0 border-right p-0 twoInOne1">Qty : {lot?.Quantity || '- -'}</div>
                                    <div className="nav-item m-0 border-right p-0 twoInOne1">@ Rs. {lot?.Price || '- -'}/ mt</div>
                                </li>
                                <li className="nav-item p-0 m-0 bg-pink text-dark  border">
                                    Started At : {lot?.StartDate || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-pink text-dark  border " >
                                    End At : {lot?.EndDate || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-pink text-dark  border " >
                                    <UseCountdown startDate={lot?.StartDate} endDate={lot?.EndDate} />
                                </li>
                            </ul>
                        </div>
                        <div className="nav-wrapper  my-2 py-0">
                            <ul className="nav nav-pills nav-fill flex-column flex-md-row text-dark" id="tabs-icons-text" role="tablist">
                                <li className="nav-item p-0 m-0 bg-info border">
                                    Categorie : {lot?.categoriesTitle || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-info border">
                                    material At : {lot?.materialLocation || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-info border">
                                    Made In : {lot?.Plant || '- -'}
                                </li>
                                <li className="nav-item p-0 m-0 bg-pink text-dark border">Status : {lot?.lot_status || '- -'}</li>
                                <li className="nav-item p-0 m-0 bg-primary text-white border">Participate Fee : {lot.participate_fee || '- -'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-3" />
            </div>)
    }
    console.log(pleseWait)

    return (
        <div className="">
            <>
                <HomeComponent />
                <div className="container-fluid mb-7">
                    <div className=" border-light card shadow">
                        <div className="p-0 m-2">
                            <div className="alert bg-primary d-flex justify-content-between align-items-center p-2 m-2">
                                <h5 className="m-0 text-white ">Live / Upcoming</h5>
                                <span className=" " style={{ textAline: 'end', }}>
                                    {<ShowCurrentTime />}</span>
                            </div>
                            <div className="alert bg-default d-flex justify-content-around m-2 p-2 row show">
                                {props.getCategoriesReducer.categoriList
                                    &&
                                    props.getCategoriesReducer.categoriList.map(categori =>
                                        <button className={"btn btn-sm m-0 text-white px-4 m-1 " + (categori.id === selectedCategory ? 'bg-gradient-danger' : 'bg-gradient-gray')} onClick={() => { setSelectedCategory(categori.id) }}>{categori.title}</button>
                                    )
                                }
                                {/* <button className={"btn btn-sm m-0 text-white px-4 bg-gradient-gray m-1"} onClick={() => {
                                    setSelectedCategory(null)
                                }}>Clear</button> */}
                            </div>
                            <div className="card font-weight-bold">
                                <div className="card-header bg-light h6 d-flex justify-content-between ">
                                    <span className="card-title m-0">Live Lots  </span>
                                    {/* <button type="button" className="btn btn-sm btn-success btn-tooltip" data-animation="true">
                                        Download To Excel
                                    </button> */}
                                </div>
                                {
                                            <>
                                                <div className="card-body p-0">
                                                    {activeLots ?
                                                         activeLots?.activeLots?.map((lot) => liveLotComponent(lot))
                                                        :
                                                        <FixComponents comp='NoData' />
                                                    }
                                                </div>
                                                <div className="my-2">
                                                    <div className="card-header bg-light h6 d-flex justify-content-between ">
                                                        <span className="card-title m-0">Up Comming Lots</span>
                                                    </div>
                                                    {upcomingLots ? upcomingLots?. upcomingLots?.map((lot) =>
                                                        upCommingLotComponent(lot)
                                                    )
                                                        :
                                                        <FixComponents comp='NoData' />
                                                    }
                                                </div>
                                            </>


                                       

                                }
                            </div>
                        </div>
                    </div>
                </div>
                <FooterComponent />
            </>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        getLiveLotsListReducer: state.getLiveLotsListReducer,
        loginUserDetailsReducer: state.loginUserDetailsReducer,
        participateInLotReducer: state.participateInLotReducer,
        getCategoriesReducer: state.getCategoriesReducer,
    }
}

const mapDispatchtoProps = {
    getLiveLotsListAction: (id) => getLiveLotsListAction(id),
    participateInLotAction: (details) => participateInLotAction(details),
    clearParticipateInLotStatusCleanAction: () => clearParticipateInLotStatusCleanAction(),
    getCategoriesAction: () => getCategoriesAction(),
}
export default connect(mapStateToProps, mapDispatchtoProps)(LiveLotsComponent)