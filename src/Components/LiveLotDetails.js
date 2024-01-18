import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import { getLotsDetailsAction, newBidOnLotAction } from '../Redux/Actions/Actions'
import UseCountdown from "./UseCountdown";
import FooterComponent from "./FooterComponent";
import NevbarComponents from "./NevbarComponents";


import 'firebase/firestore';

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import FixComponents from "./FixComponents";
import Constants from "../Redux/Constants";


function LiveLotDetails(props) {
    let { id } = useParams()

    const [lotDetails, setLotDetails] = useState(null);
    const [showTAndC, setShowTAndC] = useState(false);
    const [autoBidVal, setAutoBidVal] = useState(null);
    const [nextBidValue, setNextBidValue] = useState(null);
    const [previousBidValue, setPreviousBidValue] = useState(null);
    const [materialList, setMaterialList] = useState(null);
    const [lotTerms, setLotTerms] = useState(null);
    const [customerDetails, setCustomerDetails] = useState(null);
    const [lastBid, setLastBid] = useState(null);
    const [autoBidStatus, setSutoBidStatus] = useState(null);
    const [showDetailsModeul, setShowDetailsModeul] = useState(false);
    const [zoomefect, setZoomefect] = useState(1);
    const [showImageModeul, setShowImageModeul] = useState(false);

    const navigate = useNavigate();

    const bidUserName = useRef(null);

    const firebaseConfig = {
        apiKey: "AIzaSyCTMa2MX27L40POGDkoA-J_rOFL2bT7jz4",
        authDomain: "steel24-a898f.firebaseapp.com",
        databaseURL: "https://steel24-a898f-default-rtdb.firebaseio.com",
        projectId: "steel24-a898f",
        storageBucket: "steel24-a898f.appspot.com",
        messagingSenderId: "924896686955",
        appId: "1:924896686955:web:e7b4c62ab4e416a61f522e",
        measurementId: "G-ZPC54XMY2V"
    };

    initializeApp(firebaseConfig);
    const db = getDatabase();

    useEffect(() => {
        if (id) {
            const data = ref(db, 'TodaysLots/liveList/' + id) // CHANGE 'chars' TO YOUR DATABASE NAME
            onValue(data, (snapshot) => {
                if (snapshot.val()) {
                    let lotdetails = snapshot.val();
                    setLotDetails(lotdetails);
                    if (lotdetails?.lastBid?.amount) {
                        setZoomefect(true);
                        setNextBidValue(Number(lotdetails.lastBid.amount) + 100)
                        setLastBid(lotdetails.lastBid)
                        setPreviousBidValue(Number(lotdetails.lastBid.amount))
                    } else {
                        setNextBidValue(Number(lotdetails.Price) + 100)
                        setLastBid(lotdetails.Price)
                        setPreviousBidValue(Number(lotdetails.Price))
                    }
                }
                else {
                    navigate('/live')
                }
            })
            props.getLotsDetailsAction(id);
        }
    }, [])

    useEffect(() => {
        if (props.loginUserDetailsReducer?.loginUserDetails) {
            setCustomerDetails(props.loginUserDetailsReducer.loginUserDetails)
        }
    }, [props?.loginUserDetailsReducer])

    useEffect(() => {
        if (props.lotDeatils) {
            if (props.lotDeatils?.lotDetails) {
                setLotDetails(props.lotDeatils?.lotDetails[0])
                if (props.lotDeatils?.lotDetails[0]?.lastBidAmount) {
                    setNextBidValue(Number(props.lotDeatils.lotDetails[0]?.lastBidAmount) + 100)
                } else {
                    setNextBidValue(Number(props.lotDeatils.lotDetails[0]?.Price) + 100)
                }
                setPreviousBidValue(Number(props.lotDeatils.lotDetails[0]?.lastBidAmount))

               
                if (props.lotDeatils.materialList.length) {
                    setMaterialList(props.lotDeatils.materialList)
                }
                if (props.lotDeatils.lotTerms) {
                    setLotTerms(props.lotDeatils.lotTerms)
                }
            }
        }
    }, [props.lotDeatils])


    const bidNow = (bidAmount = nextBidValue) => {
        if (lotDetails.lot_status === 'live' || lotDetails.lot_status === 'Restart') {
            if (bidAmount > previousBidValue) {
                props.newBidOnLotAction({ 'amount': bidAmount, 'lotId': lotDetails.id, 'customerId': customerDetails.id })
            } else {
                alert('Bid Amount is less then last bid.');
            }
        } else {
            alert('Lot Is Not Live.');
        }
    }

    useEffect(() => {
        // if (props.newBidOnLotReducer?.bidDetails) {
        //     if (props.newBidOnLotReducer.bidDetails?.data?.LattestBid?.customerId === customerDetails.id) {
        // props.newBidOnLotReducer.bidDetails.data.LattestBid.customerId
        // console.log(customerDetails)
        //     }
        // }
    }, [props.newBidOnLotReducer])


    // useEffect(() => {
    //     if (lotDetails) {
    //         const data = ref(db, 'liveLots/' + lotDetails.id) // CHANGE 'chars' TO YOUR DATABASE NAME
    //         onValue(data, (snapshot) => {
    //             setLastBid(snapshot.val())
    //         })
    //     }
    // }, [lotDetails])

    useEffect(() => {
        if (lastBid) {
            if (lotDetails.lot_status === 'live' || lotDetails.lot_status === 'Restart') {

                if (autoBidStatus && autoBidVal >= lastBid.amount && lastBid.customerId != customerDetails.id) {
                    setTimeout(() => { bidNow(Number(lastBid.amount) + 100) }, 500)
                    setNextBidValue(Number(lastBid.amount) + 100)
                }
            }
            else {
                alert('Lot Is Not Live.');
            }
        }
    }, [lastBid, autoBidStatus])

    useEffect(() => {

        setTimeout(() => setZoomefect(false), 1000)
    }, [zoomefect])

    return (
        <div className="">
            <NevbarComponents />
            <HeaderComponent />
            {console.log(lotDetails)}
            {lotDetails && customerDetails ?
                <div className="border-light card  shadow p-0 m-2 mb-7"  >
                    <div className="card-header d-flex justify-content-center bg-translucent-primary p-2" role="alert">
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Lot :{lotDetails ? lotDetails.title : '- -'}</button>
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Live Lot No :{lotDetails ? lotDetails.id : '- -'}</button>
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Qty :{lotDetails ? lotDetails.Quantity : '- -'}</button>
                        <button type="button" className="btn btn-sm bg-yellow btn-tooltip">Lot Status :{lotDetails ? lotDetails.lot_status : '- -'} </button>
                    </div>
                    <div className="row card-body p-0">
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div className="border-bottom d-flex justify-content-center p-2">
                                <div className=" bg-pink text-dark border px-2">Seller :  {lotDetails ? lotDetails.Seller : '- -'} </div>
                            </div>

                            <div className="border-bottom d-flex justify-content-center card-body p-1">
                                <div className=" bg-info text-dark border px-2">Made At : {lotDetails ? lotDetails.Plant : '- -'}</div>
                                <div className=" bg-info text-dark border px-2">Material At : {lotDetails ? lotDetails.materialLocation : '- -'}</div>
                            </div>

                            <div className="col-12 border-bottom d-flex justify-content-center p-1">
                                <div className=" bg-primary text-white border px-2 text-center">Started At :
                                    {lotDetails.lot_status === 'ReStarted' ?
                                        <span className="dropup">{lotDetails ? lotDetails.ReStartDate : '- -'}</span>
                                        : <span className="dropup">{lotDetails ? lotDetails.StartDate : '- -'}</span>}
                                </div>
                                <div className=" bg-primary text-white border px-2 text-center">End At  :
                                    {lotDetails.lot_status === 'ReStarted' ?
                                        <span className="dropup"> {lotDetails ? lotDetails.ReEndDate : '- -'}</span>
                                        : <span className="dropup"> {lotDetails ? lotDetails.EndDate : '- -'}</span>
                                    }</div>
                            </div>

                            <div className="col-12 border-bottom d-flex justify-content-center p-1">
                                <div className=" bg-light border px-2">Bid And Win </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 " >
                            <div className={(zoomefect ? "active" : '') + " border-bottom d-flex justify-content-center p-2 bidUserName "} ref={bidUserName}  >
                                <div className=" border px-2 text-darker bg-cyan"># {lotDetails?.id}</div>
                                <div className=" border px-2 text-darker bg-cyan " > ₹ {
                                    lastBid?.amount ? lastBid.amount :
                                        lotDetails.lastBidAmount ? lotDetails?.lastBidAmount : lotDetails?.Price} </div>
                                {lastBid?.customerId === customerDetails.id ?
                                    <button type="button" className="btn btn-sm btn-tooltip text-darker bg-warning"> Your Bid.</button>
                                    :
                                    <button type="button" className="btn btn-sm btn-tooltip text-darker bg-cyan"> Bid Of : Other Customer</button>
                                }
                            </div>

                            <div className="border-bottom d-flex justify-content-center card-body p-1" style={{ listStyleType: 'none' }}>
                                {lotDetails.lot_status === 'ReStarted' ?
                                    <UseCountdown startDate={lotDetails?.ReStartDate} endDate={lotDetails?.ReEndDate} />
                                    : <UseCountdown startDate={lotDetails?.StartDate} endDate={lotDetails?.EndDate} />
                                }
                            </div>

                            <div className="col-12 border-bottom d-flex justify-content-center p-1">
                                <button onClick={() => bidNow(nextBidValue)} type="button" className="bg-yellow btn btn-tooltip ">Bid for {nextBidValue}</button>
                            </div>
                            <div className="col-12 border-bottom d-flex justify-content-center p-1">
                                <div className="form-group m-0">
                                    <input type='number' className="form-control form-control-alternative form-control-sm" value={autoBidVal}
                                        onChange={(event) => { setAutoBidVal(event.target.value) }}
                                        disabled={autoBidStatus ? 'disabled' : ''} />
                                </div>
                                {autoBidStatus ?
                                    <button type="button" className="btn btn-sm bg-primary btn-tooltip bg-translucent-info"
                                        onClick={() => setSutoBidStatus(false)}>Stop Auto Bid </button>
                                    :
                                    <button type="button" className="btn btn-sm bg-primary btn-tooltip bg-translucent-info"
                                        onClick={() => setSutoBidStatus(true)}>Set Auto Bid</button>
                                }
                            </div>
                        </div>
                    </div>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className="p-1">
                                    <button type="button" className="btn btn-sm bg-lighter btn-tooltip" onClick={() => setShowTAndC(!showTAndC)}> Terms & Condition</button>
                                </th>
                                <th className="p-1">
                                    Terms & Condition : Please read the following details carefully.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {showTAndC &&
                                <>
                                    {lotTerms ?
                                        <>
                                            <tr className="p-1">
                                                <td className="w-25"> Payment Terms  </td>
                                                <td className="w-75">{lotTerms.Payment_Terms}</td>
                                            </tr>

                                            <tr className="p-1">
                                                <td className="w-25"> Price Basis  </td>
                                                <td className="w-75">{lotTerms.Price_Bases}</td>
                                            </tr>

                                            <tr className="p-1">
                                                <td className="w-25"> Texes and  Duties   </td>
                                                <td className="w-75">{lotTerms.Texes_and_Duties}</td>
                                            </tr>

                                            <tr className="p-1">
                                                <td className="w-25"> Commercial Terms    </td>
                                                <td className="w-75">{lotTerms.Commercial_Terms}</td>
                                            </tr>

                                            <tr className="p-1">
                                                <td className="w-25"> Test Certificate    </td>
                                                <td className="w-75">{lotTerms.Test_Certificate}</td>
                                            </tr>
                                        </>
                                        :
                                        <FixComponents comp='NoData' />
                                    }
                                </>}
                        </tbody>
                    </table>

                    {materialList ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th> Product</th>
                                    <th> Thickness</th>
                                    <th> Width</th>
                                    <th> Length</th>
                                    <th> Weight</th>
                                    <th> Grade</th>
                                    <th> Remark</th>
                                    <th> images</th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialList.map(material =>
                                    <tr>
                                        <td> {material['Product']}</td>
                                        <td> {material['Thickness']}</td>
                                        <td> {material['Width']}</td>
                                        <td> {material['Length']}</td>
                                        <td> {material['Weight']}</td>
                                        <td> {material['Grade']}</td>
                                        <td> {material['Remark']}</td>
                                        <td >
                                            <button type="submit" class="btn btn-primary btn-sm mr-3" onClick={() => setShowImageModeul(material)}>Image</button>

                                        </td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                        :
                        <FixComponents comp='NoData' />
                    }
                </div> :
                <FixComponents />
            }
            <div className={"modal fade " + (showImageModeul && 'show')} id="auction_Details" tabIndex="1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className="modal-body p-0">

                            <div className="card shadow border-0 mb-0">
                                <div className="card-header bg-blue text-default d-flex justify-content-between">
                                    <h6 className="text-white">{showImageModeul['Product']}</h6>

                                    <button className="btn btn-sm text-darker" onClick={() => setShowImageModeul(false)}>X</button>
                                </div>
                                <div className="card-body d-flex justify-content-around">
                                    <img src={Constants.SERVERURL + 'files/' + showImageModeul['images']} className="m-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        loginUserDetailsReducer: state.loginUserDetailsReducer,
        lotDeatils: state.getLotDetailsReducer.lotDeatils,
        newBidOnLotReducer: state.newBidOnLotReducer,
    }
}

const mapDispatchtoProps = {
    getLotsDetailsAction: (id) => getLotsDetailsAction(id),
    newBidOnLotAction: (details) => newBidOnLotAction(details),
}

export default connect(mapStateToProps, mapDispatchtoProps)(LiveLotDetails)