import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import { getLotsDetailsAction, newBidOnLotAction } from '../Redux/Actions/Actions'
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import FixComponents from "./FixComponents";

function LotDetails(props) {
    let { id } = useParams()

    const [lotDetails, setLotDetails] = useState(null);
    const [showTAndC, setShowTAndC] = useState(false);
    const [materialList, setMaterialList] = useState(null);
    const [showDetailsModeul, setShowDetailsModeul] = useState(false);
    const [materialHeadersList, setMaterialHeadersList] = useState(null);
    const [lotTerms, setLotTerms] = useState(null);

    useEffect(() => {
        if (id) {
            props.getLotsDetailsAction(id);
        }
    }, [])

    useEffect(() => {
        if (props.lotDeatils) {

            setLotDetails(props.lotDeatils.lotDetails[0])
            if (props.lotDeatils.materialList.length) {
                setMaterialHeadersList(Object.keys(props.lotDeatils.materialList[0].data))
                setMaterialList(props.lotDeatils.materialList)
            }
            if (props.lotDeatils.lotTerms) {
                setLotTerms(props.lotDeatils.lotTerms)
            }

        }
    }, [props.lotDeatils])


    return (
        <div className="">
            <HomeComponent />
            {lotDetails ?
                <div className="border-light card  shadow  p-0 m-2  " >
                    <div className="card-header d-flex justify-content-center bg-translucent-primary p-2" role="alert">
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Lot :{lotDetails ? lotDetails.title : '- -'}</button>
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Live Lot No :{lotDetails ? lotDetails.id : '- -'}</button>
                        <button type="button" className="btn btn-sm bg-lighter btn-tooltip">Qty :{lotDetails ? lotDetails.Quantity : '- -'}</button>

                    </div>
                    <div className="row card-body p-0">
                        <div className=" col-12 ">
                            <div className="border-bottom d-flex justify-content-center p-2">
                                <div className=" bg-pink text-dark border px-2">Seller :  {lotDetails ? lotDetails.Seller : '- -'} </div>
                                <div className=" bg-pink text-dark border px-2">Cotted By : {lotDetails ? lotDetails.Seller : '- -'}</div>
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


                        </div>

                    </div>

                    <table className="table"><header>
                        <th className="p-1">
                            <button type="button" className="btn btn-sm bg-lighter btn-tooltip" onClick={() => setShowTAndC(!showTAndC)}> Hide T&C</button>
                        </th>
                        <th className="p-1">
                            Terms & Condition : Please read the following details carefully.
                        </th>
                    </header>
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
                                            <td className="w-25"> Texes and  Duties  </td>
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
                    </table>

                    {materialList ?
                        <table className="table">
                            <thead>
                                {materialHeadersList && materialHeadersList.map(header =>
                                    <th>{header}</th>
                                )}
                                <th>Image</th>
                            </thead>
                            <tbody>
                                {materialList && materialList.map((material) =>
                                    <tr className="p-1">
                                        {Object.keys(material.data).map(value => <td className="" >
                                            {value}
                                        </td>
                                        )}

                                        {material.image ?
                                            <td className="" onClick={() => {
                                                setShowDetailsModeul(material)
                                            }}> Images </td>
                                            : <td className="" > No Images  </td>
                                        }
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        : <div className="alert alert-default bg-warning fade show" role="alert">
                            <span className="alert-inner--text"><strong>Materials Not Available.</strong></span>
                        </div>}
                </div> :
                <FixComponents />
            }
            {showDetailsModeul &&
                showDetailsModeul &&
                <div className={"modal fade " + (showDetailsModeul && 'show')} id="auction_Details" tabIndex="1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content">
                            <div className="modal-body p-0">

                                <div className="card shadow border-0 mb-0">
                                    <div className="card-header bg-blue text-default d-flex justify-content-between">
                                        {showDetailsModeul.data.Title || showDetailsModeul.data.title}
                                        <button className="btn btn-sm text-darker" onClick={() => setShowDetailsModeul(false)}>X</button>
                                    </div>
                                    <div className="card-body d-flex justify-content-around">
                                        <img src={showDetailsModeul.image} className="m-1 w-25" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <FooterComponent />
        </div >
    )

}


const mapStateToProps = (state) => {
    return {
        loginUserDetailsReducer: state.loginUserDetailsReducer,
        lotDeatils: state.getLotDetailsReducer.lotDeatils,
    }
}

const mapDispatchtoProps = {
    getLotsDetailsAction: (id) => getLotsDetailsAction(id),
}

export default connect(mapStateToProps, mapDispatchtoProps)(LotDetails)