import { Modal, Tag, notification } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHammer } from "react-icons/fa6";
import loading from "../../assets/images/Group.svg";
import FixComponents from "../FixComponents";
import { useNavigate } from "react-router-dom";
import {
  addFavourite,
  deleteFavourite,
  getActiveLots,
  getUpcomingLots,
  getactiveupcominglots,
} from "../../Api/lotsapi";
import { useSelector } from "react-redux";
import { log } from "util";
import LotDetailPopup from "../LotDetailPopup/LotDetailPopup";
import Countdown from "react-countdown";
import { getDate, getFormattedDate } from "../../Redux/Constants";
import Pusher from "pusher-js";
import moment from "moment";

function UpcomingAndLive() {
  const [allLots, setAllLots] = useState({});
  const [upcoming, setUpcoming] = useState(null);
  const [live, setLive] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [apiLoading, setApiLoding] = useState(false);
  const [participationLot, setParticipationLot] = useState(null);
  const [open, setOpen] = useState(false);
  const [lotDetails, setLotDetails] = useState(null);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const { loginUserDetails } = useSelector(
    (store) => store?.loginUserDetailsReducer
  );

  // const handleNavLinkClick = (lot) => {
  //   if (lot?.lot_status === "live") {
  //     navigate("/dashboard/live/LiveLotDetails", {
  //       state: { lot, userDetail: userDetails },
  //     });
  //   } else {
  //     api.info({
  //       description: `Lot is ${lot?.lot_status}.`,
  //     });
  //   }
  // };

  const handleNavLinkClick = (lot) => {
    if (lot?.lot_status === "live") {
      navigate("/dashboard/Live");
    } else {
      navigate("/dashboard/Upcoming");
    }
  };

  const fetchAllLots = () => {
    setApiLoding(true);
    getactiveupcominglots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setAllLots(res.data);
        setApiLoding(false);
      } else {
        setAllLots([]);
        setApiLoding(false);
      }
    });
  };

  const fetchUpcomingLots = () => {
    getUpcomingLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setUpcoming(res.data?.userLots);
        setApiLoding(false);
      } else {
        setUpcoming(null);
        setApiLoding(false);
      }
    });
  };

  const fetchActiveLots = () => {
    setApiLoding(true);
    getActiveLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setLive(res.data?.userLots);
        setApiLoding(false);
      } else {
        setLive(null);
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    setUserDetails(loginUserDetails);
    if (userDetails?.id) {
      // fetchAllLots();
      fetchActiveLots();
      fetchUpcomingLots();
    }
  }, [loginUserDetails, userDetails]);

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setAllLots(null);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchAllLots();
        setApiLoding(false);
      } else {
        fetchAllLots();
        setApiLoding(false);
      }
    });
  };

  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setAllLots(null);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchAllLots();
        setApiLoding(false);
      } else {
        fetchAllLots();
        setApiLoding(false);
      }
    });
  };

  const handleDownload = (filepath) => {
    const link = document.createElement('a');
    link.href = "https://admin.steel24.in/ExcelLots/lots_20230825_161423.xlsx";
    link.target = '_blank'; // Open in a new tab/window
    link.download = 'your-filename.xlsx'; // Specify the desired download filename
    link.click();
  };

  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("lot-change");
    channel.bind("lot.successful", function (data) {
      fetchActiveLots();
      fetchUpcomingLots();
    });

    return () => {
      pusher.unsubscribe("lot-change");
    };
  }, []);

  return (
    <>
      <LotDetailPopup
        data={open}
        lot={lotDetails}
        onCancel={() => {
          setOpen(false);
          setLotDetails(null);
        }}
      />

      <div className="col-12 card p-0">
        <div className="card-header maincard_header">
          Live Auctions at steel24
        </div>
        <div className="main_card_body">
          {live && live.length > 0 ? (
            <>
              {live?.map((lot) => {
                return (
                  <>
                    <div
                      className="col-sm-4 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleNavLinkClick(lot);
                      }}
                    >
                      <div
                        className="card-header live_LotsDetails_header"
                        style={{ background: "rgb(37, 142, 199)" }}
                      >
                        {lot?.categories?.title}
                      </div>
                      <div className="card-body p-0 table_line">
                        <ul className="list-group list-group-flush">
                          <li
                            className="list-group-item Dashboard_card_body"
                            style={{ background: "rgb(221, 255, 255)" }}
                          >
                            {lot?.title}
                          </li>
                          <li className="list-group-item Dashboard_card_body">
                            <Tag
                              style={{
                                backgroundColor: "rgb(240, 225, 206)",
                              }}
                              className="dashboard_tag_text"
                            >
                              Lot No: {lot?.id}
                            </Tag>
                          </li>
                          <li className="list-group-item Dashboard_card_body">
                            <Tag
                              style={{
                                backgroundColor: "rgb(241, 241, 241)",
                              }}
                              className="dashboard_tag_text"
                            >
                              Total Qty: {lot?.Quantity}
                            </Tag>
                          </li>
                          <li
                            className="list-group-item Dashboard_card_body"
                            style={{
                              background: "rgb(221, 255, 255)",
                              flexWrap: "wrap",
                            }}
                          >
                            <Tag
                              style={{
                                backgroundColor: "rgb(221, 255, 215)",
                              }}
                              className="dashboard_tag_text"
                            >
                              {moment(lot?.StartDate).format("DD-MMM-YY")}
                              {/* {getFormattedDate(lot?.StartDate)} */}
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(221, 255, 215)",
                              }}
                              className="dashboard_tag_text"
                            >
                              {moment(lot?.StartDate).format("h:mma")}
                              {/* {new Date(lot?.StartDate).getHours()}:
                              {new Date(lot?.StartDate).getMinutes()}:
                              {new Date(lot?.StartDate).getSeconds()} */}
                            </Tag>
                            To
                            {/* <Tag
                              style={{
                                backgroundColor: "rgb(221, 255, 215)",
                              }}
                              className="dashboard_tag_text"
                            >
                              {getFormattedDate(lot?.EndDate)}
                            </Tag> */}
                            <Tag
                              style={{
                                backgroundColor: "rgb(241, 214, 228)",
                              }}
                              className="dashboard_tag_text"
                            >
                              {moment(lot?.EndDate).format("h:mma")}
                              {/* {new Date(lot?.EndDate).getHours()}:
                              {new Date(lot?.EndDate).getMinutes()}:
                              {new Date(lot?.EndDate).getSeconds()} */}
                            </Tag>
                          </li>
                          {/* <li className="list-group-item Dashboard_card_body">
                          <h4>QTY:</h4>
                          <h5>1555</h5>
                        </li> */}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <FixComponents
                comp={!apiLoading && live != null ? "NoData" : ""}
              />
            </>
          )}
        </div>
      </div>
      <div className="col-12 card p-0 mt-4">
        <div
          className="card-header maincard_header"
        >
          Upcoming Auctions at steel24
        </div>
        <div className="main_card_body">
          {upcoming && upcoming.length > 0 ? (
            <>
              {upcoming?.map((lot) => {
                return (
                  <div
                    className="col-sm-4 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleNavLinkClick(lot);
                    }}
                  >
                    <div
                      className="card-header live_LotsDetails_header"
                      style={{ background: "rgb(37, 142, 199)" }}
                    >
                      {lot?.categories?.title}
                    </div>
                    <div className="card-body p-0 table_line">
                      <ul className="list-group list-group-flush">
                        <li
                          className="list-group-item Dashboard_card_body"
                          style={{ background: "#ffdead" }}
                        >
                          {lot?.title}
                        </li>
                        <li className="list-group-item Dashboard_card_body">
                          <Tag
                            style={{
                              backgroundColor: "rgb(240, 225, 206)",
                            }}
                            className="dashboard_tag_text"
                          >
                            Lot No: {lot?.id}
                          </Tag>
                        </li>
                        <li className="list-group-item Dashboard_card_body">
                          <Tag
                            style={{
                              backgroundColor: "rgb(241, 241, 241)",
                            }}
                            className="dashboard_tag_text"
                          >
                            Total Qty: {lot?.Quantity}
                          </Tag>
                        </li>
                        <li
                          className="list-group-item Dashboard_card_body"
                          style={{ background: "#ffdead", flexWrap: "wrap" }}
                        >
                          <Tag
                            style={{
                              backgroundColor: "rgb(221, 255, 215)",
                            }}
                            className="dashboard_tag_text"
                          >
                            {moment(lot?.StartDate).format("ddd DD-MMM-YY")}
                            {/* {getFormattedDate(lot?.StartDate)} */}
                          </Tag>
                          <Tag
                            style={{
                              backgroundColor: "rgb(221, 255, 215)",
                            }}
                            className="dashboard_tag_text"
                          >
                            {moment(lot?.StartDate).format("h:mma")}
                            {/* {new Date(lot?.StartDate).getHours()}:
                            {new Date(lot?.StartDate).getMinutes()}:
                            {new Date(lot?.StartDate).getSeconds()} */}
                          </Tag>
                          To
                          {/* <Tag
                            style={{
                              backgroundColor: "rgb(221, 255, 215)",
                            }}
                            className="dashboard_tag_text"
                          >
                            {getFormattedDate(lot?.EndDate)}
                          </Tag> */}
                          <Tag
                            style={{
                              backgroundColor: "rgb(241, 214, 228)",
                            }}
                            className="dashboard_tag_text"
                          >
                            {moment(lot?.EndDate).format("h:mma")}
                            {/* {new Date(lot?.EndDate).getHours()}:
                            {new Date(lot?.EndDate).getMinutes()}:
                            {new Date(lot?.EndDate).getSeconds()} */}
                          </Tag>
                        </li>
                        {/* <li className="list-group-item Dashboard_card_body">
                          <h4>QTY:</h4>
                          <h5>1555</h5>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <FixComponents
                comp={!apiLoading && upcoming != null ? "NoData" : ""}
              />
            </>
          )}
        </div>
      </div>

      {contextHolder}
      {/* <div className="">
        <div className="row">
          {allLots?.userLots?.length > 0 ? (
            allLots?.userLots?.map((lot) => {
              return (
                <>
                  <div
                    className="card p-0 m-2 w-100"
                    onClick={(e) => {
                      if (lot.lot_status === "upcoming") {
                        setOpen(true);
                        setLotDetails(lot?.id);
                      } else {
                        navigate("/dashboard/live/LiveLotDetails", {
                          state: { lot, userDetail: userDetails },
                        });
                      }
                    }}
                  >
                    <div className="card" style={{ padding: "1%" }}>
                      <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                          <li
                            class="list-group-item p-0"
                            style={{ background: "rgb(221 255 255)" }}
                          >
                            <div class="live_Lots_title p-3">
                              <div>{lot.title}</div>
                              <div>{lot.categories?.description}</div>
                            </div>
                            <div className="lots_details_mobile">
                              {lot?.customers?.length > 0 ? (
                                <AiFillStar
                                  color="#e5c04c"
                                  size={35}
                                  className="mx-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteFavouriteLot(
                                      userDetails?.id,
                                      lot?.id
                                    );
                                  }}
                                />
                              ) : (
                                <AiOutlineStar
                                  color="rgb(114 178 188)"
                                  size={35}
                                  className="mx-4"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addFavouriteLot(userDetails?.id, lot?.id);
                                  }}
                                />
                              )}
                              <Tag
                                style={{
                                  backgroundColor: "rgb(2 114 181)",
                                  color: "white",
                                }}
                                className="tag_text"
                              >
                                Lot No: {lot.id}
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "#FFD700",
                                }}
                                className="tag_text"
                              >
                                Qty: {lot.Quantity} mt
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(241 214 228)",
                                }}
                                className="tag_text"
                              >
                                ₹ {lot.Price}/mt &nbsp;&nbsp;
                                <img src={loading} style={{ width: "15px" }} />
                                &nbsp;
                                {lot?.bids[0]?.created_at ? (
                                  <Countdown
                                    date={
                                      new Date(
                                        getDate(lot?.bids[0]?.created_at)
                                      )
                                    }
                                    daysInHours
                                  />
                                ) : (
                                  "00:00:00"
                                )}
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "#FFD700",
                                }}
                                className="tag_text"
                              >
                                <FaHammer className="mr-2" />
                                Bid Now!
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(241 214 228)",
                                }}
                                className="tag_text"
                              >
                                Ends {lot.EndDate}
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(244 243 237)",
                                }}
                                className="tag_text"
                              >
                                Start Rs {lot?.Price} &nbsp;&nbsp;&nbsp;&nbsp;+
                                {lot?.bids[0]?.amount
                                  ? lot?.bids[0]?.amount - lot?.Price
                                  : 0}
                              </Tag>

                              <Tag
                                style={{
                                  backgroundColor: "rgb(240 225 206)",
                                }}
                                className="tag_text"
                              >
                                MATERIAL AT VASIND &nbsp;&nbsp;&nbsp; MADE IN
                                VASIND,MAHARASHTRA
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(155 220 226)",
                                }}
                                className="tag_text"
                              >
                                READY STOCK!
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(221 255 215)",
                                }}
                                className="tag_text"
                              >
                                BID N WIN
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(241 241 241)",
                                }}
                                className="tag_text"
                              >
                                STARTED AT {lot.StartDate}
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(155 220 226)",
                                }}
                                className="tag_text"
                              >
                                Participation Fee: {lot.participate_fee} /mt
                              </Tag>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <FixComponents
                comp={!apiLoading && allLots != null ? "NoData" : ""}
              />
            </>
          )}
        </div>
      </div> */}
    </>
  );
}
export default UpcomingAndLive;
