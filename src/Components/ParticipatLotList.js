import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getParticipatelotsAction } from '../Redux/Actions/Actions';
import FixComponents from "./FixComponents";

function ParticipatLotList(props) {

    const [customerDetails, setcustomerDetails] = useState(null);
    const [participateLots, setParticipateLots] = useState(null);

    useEffect(() => {
        if (props.loginUserDetailsReducer?.loginUserDetails) {
            setcustomerDetails(props.loginUserDetailsReducer.loginUserDetails);
        }
    }, [props?.loginUserDetailsReducer])

    useEffect(() => {
        if (customerDetails?.id) {
            props.getParticipatelotsAction(customerDetails.id);
        }
    }, [customerDetails])

    useEffect(() => {
        if (props.getCustimerParticipateLotsReducer?.customerParticipateLots) {
            setParticipateLots(props.getCustimerParticipateLotsReducer?.customerParticipateLots);
        }
    }, [props.getCustimerParticipateLotsReducer])

    return (
        <>
            <div className="border-light card  shadow  p-0 m-2 mb-7 " id="tabs-icons-text-2" role="tabpanel"
                aria-labelledby="tabs-icons-text-2-tab">
                <div className="p-0 m-2">
                    <div className="card ">

                        <div className="card-header bg-light h6 d-flex justify-content-between ">
                            <span className="card-title m-0">Profile Details</span>
                            {/* <button type="submit" className="btn btn-primary btn-sm mr-3">Save</button> */}
                        </div>

                        <div className="card-body text-center">
                            <div className="d-block font-weight-bold ">
                                <span>Bank Name</span>
                                <h4>Bank Name</h4>
                            </div>
                            <hr />

                            <div className="d-block font-weight-bold ">
                                <span>Compny Name</span>
                                <h4>Steel 24</h4>
                            </div>
                            <hr />
                            <div className="d-block font-weight-bold ">
                                <span>Bank Account Number</span>
                                <h4>123456789123</h4>
                            </div>
                            <hr />
                            <div className="d-block font-weight-bold ">
                                <span>Bank Account IFSC Code</span>
                                <h4>112233445566</h4>
                            </div>
                            <hr />

                        </div>

                    </div>
                </div>

            </div>
        </>)
}
const mapStateToProps = (state) => {
    return {
        loginUserDetailsReducer: state.loginUserDetailsReducer,
        getCustimerParticipateLotsReducer: state.getCustimerParticipateLotsReducer,
    }
}

const mapDispatchtoProps = {
    getParticipatelotsAction: (id) => getParticipatelotsAction(id),
}

export default connect(mapStateToProps, mapDispatchtoProps)(ParticipatLotList)