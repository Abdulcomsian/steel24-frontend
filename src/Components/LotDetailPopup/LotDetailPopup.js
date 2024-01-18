import { Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLotDetails, requestToRestart } from "../../Api/lotsapi";
import {
  isAllradyLoginAction,
  logOutAction,
} from "../../Redux/Actions/Actions";
import appLogo from "../../images/logo.png";
import FixComponents from "../FixComponents";
import MaterialTable from "../MaterialTable/MaterialTable";

function LotDetailPopup(props) {
  const [open, setOpen] = useState(props?.data);
  const [apiLoading, setApiLoding] = useState(false);
  const [lotDetails, setLotDetails] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [Request, setRequest] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (
      !props.loginUserDetailsReducer.loginUserDetails &&
      localStorage.getItem("UserDetails") &&
      localStorage.getItem("UserDetails") != ""
    ) {
      props.isAllradyLoginAction(
        JSON.parse(localStorage.getItem("UserDetails"))
      );
    } else if (!props.loginUserDetailsReducer.loginUserDetails) {
      // navigate('/')
    } else if (props.loginUserDetailsReducer.loginUserDetails) {
      setUserDetails(props.loginUserDetailsReducer.loginUserDetails);
    }
    if (
      localStorage.getItem("LoginDate") &&
      localStorage.getItem("LoginDate") != new Date().toLocaleDateString()
    ) {
      onLogOut();
    }
  }, [props?.loginUserDetailsReducer]);

  const onLogOut = () => {
    navigate("/");
    props.logOutAction();
    window.location.reload();
  };

  const fetchLotDetails = (id) => {
    setApiLoding(true);
    getLotDetails(id).then((res) => {
      if (res.status == 200) {
        setLotDetails(res.data);
        setRequest(res.data?.unanswerPerviousRequest);
      } else {
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    if (props?.data && props?.lot) {
      setOpen(props?.data);
      fetchLotDetails(props?.lot);
    }
  }, [props?.lot]);

  const checkLotStatus = (status) => {
    if (status === "Sold" || status === "sold") {
      return "This Lot has been sold";
    } else if (status === "Expired" || status === "expired") {
      return "This Lot has been  Expired";
    } else if (status === "upcoming" || status === "Upcoming") {
      return "This Lot is  Pending for Auction";
    } else {
      return "This Lot is  SUBJECT TO APPROVAL";
    }
  };
  const getLotColor = (status) => {
    if (status === "Sold" || status === "sold") {
      return "#258ec7";
    } else if (status === "Expired" || status === "expired") {
      return "#258ec7";
    } else if (status === "upcoming" || status === "Upcoming") {
      return "#258ec7";
    } else {
      return "#258ec7";
    }
  };

  const requestRestart = () => {
    requestToRestart(userDetails?.id, lotDetails?.lot?.id).then((res) => {
      if (res.status === 200) {
        setRequest(true);
        api.info({
          description: "Notification send successfully",
        });
      } else {
        api.error({
          description: "Notification not send.",
        });
      }
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        footer={null}
        onCancel={() => {
          setLotDetails(null);
          setOpen(false);
          props.onCancel();
        }}
        className="w-100"
      >
        {lotDetails ? (
          <>
            <div className="col-12 p-0">
              <div className=" p-0 m-4">
                {lotDetails?.lot?.lot_status === "STA" ||
                lotDetails?.lot?.lot_status === "Expired" ? (
                  <div style={{ paddingBottom: "0.5%" }}>
                    {Request ? (
                      <>
                        <div className="d-flex justify-content-center">
                          <span className="popup_LotsDetails_STA">
                            You already requested to restart this lot.
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="popup_LotsDetails_STA">
                          Interested in this lot?
                          <span>
                            Please make sure that you bid on this lot once it is
                            restarted.Failure to bid after we restart this
                            lot,could lead to disciplinary action at steel24.
                            <button
                              type="button"
                              className="btn Request_btn ml-2"
                              disabled={Request}
                              style={{ backgroundColor: Request ? "gray" : "" }}
                              onClick={() => {
                                requestRestart();
                              }}
                            >
                              REQUEST ADMIN TO RESTART LOT
                            </button>
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  ""
                )}
                <div
                  className="col-12 popup_lot_details"
                  style={{
                    background: getLotColor(lotDetails?.lot?.lot_status),
                  }}
                >
                  <div className="col-lg-4 col-md-4 col-sm-12 Right_div">
                    <div className="image_div">
                      <img
                        src={appLogo}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="lot_status">
                      {checkLotStatus(lotDetails?.lot?.lot_status)}
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 p-0">
                    <table id="example" className="table table-responsive">
                      <colgroup>
                        <col style={{ width: "1%" }} />
                      </colgroup>
                      <tbody className="table_body">
                        <tr style={{ background: "black" }}>
                          <td>
                            Lot No: {lotDetails?.lot?.id} &nbsp; Qty:{" "}
                            {lotDetails?.lot?.Quantity} mt
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {lotDetails?.lotDetails?.lot_status ===
                              "upcoming" ||
                            lotDetails?.lotDetails?.lot_status === "Upcoming"
                              ? "Starts At: Rs "
                              : "Last Bid: Rs "}
                            {lotDetails?.maxbid?.amount
                              ? lotDetails?.maxbid?.amount
                              : lotDetails?.lotDetails?.Price}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {lotDetails?.lotDetails?.lot_status ===
                              "upcoming" ||
                            lotDetails?.lotDetails?.lot_status === "Upcoming"
                              ? `Starting At: ${moment(
                                  lotDetails?.lot?.StartDate
                                ).format("DD-MMM-YY h:mma")}`
                              : `Ended At: ${moment(
                                  lotDetails?.lot?.EndDate
                                ).format("DD-MMM-YY h:mma")}`}{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {checkLotStatus(lotDetails?.lot?.lot_status)}
                            {lotDetails?.lot?.show_winner_name &&
                            lotDetails?.lot?.lot_status.toUpperCase() != "STA"
                              ? ` to ${lotDetails?.lot?.lot_winner.customer?.name}`
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Material At: {lotDetails?.lot?.materialLocation}
                            &nbsp;&nbsp; Made in: {lotDetails?.lot?.make_in}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="col-12 popup_lot_details_bottom"
                    style={{
                      background: "black",
                    }}
                  >
                    {lotDetails?.lot?.categories?.title} -{" "}
                    {lotDetails?.lot.title}
                  </div>
                </div>
              </div>
            </div>
            {lotDetails && lotDetails?.lot?.lot_terms ? (
              <div className="col-12 p-0">
                <div className=" p-0 m-4">
                  <div className="card-header popup_LotsDetails_header">
                    Terms & conditions: Please read the following carefully and
                    abide by them.
                  </div>

                  <div className="card-body p-0">
                    <ul className="">
                      <li className=" popup_terms_condition">
                        <div className="col-3">Payment Terms:</div>
                        <div className="div_left">
                          {lotDetails?.lot?.lot_terms?.Payment_Terms}
                        </div>
                      </li>
                      <li className=" popup_terms_condition">
                        <div className="col-3">Price Basis:</div>
                        <div className="div_left">
                          {lotDetails?.lot?.lot_terms?.Price_Bases}
                        </div>
                      </li>
                      <li className=" popup_terms_condition">
                        <div className="col-3">Taxes and Duties:</div>
                        <div className="div_left">
                          {lotDetails?.lot?.lot_terms?.Texes_and_Duties}
                        </div>
                      </li>
                      <li className=" popup_terms_condition">
                        <div className="col-3">Commercial Terms:</div>
                        <div className="div_left">
                          {lotDetails?.lot?.lot_terms?.Commercial_Terms}
                        </div>
                      </li>
                      <li className=" popup_terms_condition">
                        <div className="col-3">Test Certificate:</div>
                        <div className="div_left">
                          {lotDetails?.lot?.lot_terms?.Test_Certificate}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="col-12 p-0">
              <div className=" p-0 m-4">
                <div className="material-table">
                  <div className="card-header live_LotsDetails_header">
                    The Details of Material in this lot : #{" "}
                    {lotDetails?.lot?.id}
                  </div>
                </div>
                <MaterialTable list={lotDetails?.materialList} />
              </div>
            </div>
          </>
        ) : (
          <>
            <FixComponents
              comp={!apiLoading && lotDetails != null ? "NoData" : ""}
            />
          </>
        )}
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    getUpCommingLotsListReducer: state.getUpCommingLotsListReducer,
    loginUserDetailsReducer: state.loginUserDetailsReducer,
  };
};
const mapDispatchtoProps = {
  logOutAction: () => logOutAction(),
  isAllradyLoginAction: (details) => isAllradyLoginAction(details),
};
export default connect(mapStateToProps, mapDispatchtoProps)(LotDetailPopup);
