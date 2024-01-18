import { Pagination, Select, Tag, notification } from "antd";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { FaHammer } from "react-icons/fa6";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCalendar, CiStopwatch } from "react-icons/ci";
import {
  LiveLotsFavorites,
  addFavourite,
  deleteFavourite,
  downloadExcelFile,
  downloadExcelFileWitCatagroy,
  downloadFavExcelFile,
  getActiveLots,
  getCategory,
  getFilterlots,
} from "../../Api/lotsapi";
import {
  isAllradyLoginAction,
  logOutAction,
} from "../../Redux/Actions/Actions";
import { getDateTime, handleDownload } from "../../Redux/Constants";
import CountdownComponent from "../Countdown/CountdownComponent";
import FixComponents from "../FixComponents";
import "./style.css";
import { Image } from "antd";
import moment from "moment";

function LiveLots(props) {
  const [activeLots, setActiveLots] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [apiLoading, setApiLoding] = useState(false);
  const [participationLot, setParticipationLot] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [category, setCategory] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const [selectValue, setSelectValue] = useState("all");
  const [isBlinking, setIsBlinking] = useState(false);
  const [endDate, setEndDate] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentActiveLots, setCurrentActiveLots] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  //useEffect for pagination
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    setCurrentActiveLots(
      Array.isArray(activeLots)
        ? activeLots.slice(indexOfFirstCard, indexOfLastCard)
        : []
    );
  }, [currentPage, cardsPerPage, activeLots]);

  function getTime(date) {
    const dateObj = new Date(date);
    const time = dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return time;
  }
  const handleNavLinkClick = (lot) => {
    navigate("/dashboard/live/LiveLotDetails", {
      state: { lot, userDetail: userDetails },
    });
  };

  // function getDate(dateTime) {
  //   const dateObj = new Date(dateTime);
  //   const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
  //   return formattedDate;
  // }

  const fetchActiveLots = () => {
    // setApiLoding(true);
    // setActiveLots([]);
    getActiveLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setSelectValue("all");
        setFavourite(false);
        setActiveLots(
          (res.data?.userLots).sort((a, b) => {
            return new Date(a.EndDate) - new Date(b.EndDate);
          })
        );
        setApiLoding(false);
      } else {
        // setActiveLots([]);
        setApiLoding(false);
      }
    });
  };

  const fetchCategory = () => {
    getCategory().then((res) => {
      if (res.status === 200 && res.data?.success == true) {
        setCategory(res?.data?.categories);
      }
    });
  };

  useEffect(() => {
    if (userDetails?.id) {
      fetchActiveLots();
      fetchCategory();
    }
  }, [userDetails]);

  //   useEffect(() => {
  //     console.log("here",props?.loginUserDetailsReducer)
  //     if (props?.loginUserDetailsReducer?.loginUserDetails) {

  //         setCustomerDetails(props.loginUserDetailsReducer.loginUserDetails)
  //     }
  // }, [props.loginUserDetailsReducer])

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setActiveLots(null);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchActiveLots();
        setApiLoding(false);
      } else {
        fetchActiveLots();
        setApiLoding(false);
      }
    });
  };

  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setActiveLots(null);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchActiveLots();
        setApiLoding(false);
      } else {
        fetchActiveLots();
        setApiLoding(false);
      }
    });
  };

  // FOR LOT BID UPDATE
  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("steel24");
    channel.bind("win-lots checking", function (data) {
      fetchActiveLots();
    });
    return () => {
      pusher.unsubscribe("steel24");
    };
  }, []);

  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("lot-change");
    channel.bind("lot.successful", function (data) {
      fetchActiveLots();
    });

    return () => {
      pusher.unsubscribe("lot-change");
    };
  }, []);

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

  const addAnimation = () => {
    var element = document.getElementById("lastBid");
    element.classList.add("blink");
  };

  const removeAnimation = () => {
    var element = document.querySelector(".blinker");
    element.classList.remove("blinker");
  };

  const fetchFilterLots = (cId) => {
    setApiLoding(true);
    setActiveLots(null);
    getFilterlots(userDetails?.id, cId, "live").then((res) => {
      if (res.status === 200 && res.data?.success) {
        setActiveLots(
          (res.data?.userLots).sort((a, b) => {
            return new Date(a.EndDate) - new Date(b.EndDate);
          })
        );
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  const onChangeSelect = (val) => {
    setFavourite(false);
    setSelectValue(val);
    if (val === "all") {
      fetchActiveLots();
    } else {
      fetchFilterLots(val);
    }
  };

  const fetchAllFavouriteLots = () => {
    setSelectValue("all");
    setApiLoding(true);
    setActiveLots([]);
    LiveLotsFavorites(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(true);
        setActiveLots(
          (res.data?.Fav_lots).sort((a, b) => {
            return new Date(a.EndDate) - new Date(b.EndDate);
          })
        );
        setApiLoding(false);
      } else {
        setActiveLots([]);
        setApiLoding(false);
      }
    });
  };

  const downloadExcel = () => {
    setApiLoding(true);
    downloadExcelFile("live").then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(endDate).getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 60000 && timeDifference > 0) {
        setIsBlinking(true);
      } else {
        setIsBlinking(false);
      }

      if (timeDifference <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  useEffect(() => {
    if (selectValue) {
      setSelectedCategory(category.find((item) => item.id === selectValue));
    }
  }, [selectValue]);

  const downloadExcelWithCategroy = () => {
    setApiLoding(true);
    downloadExcelFileWitCatagroy(
      userDetails?.id,
      selectedCategory?.id,
      "live"
    ).then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  const downloadFavExcel = () => {
    setApiLoding(true);
    downloadFavExcelFile(userDetails?.id, "live").then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  return (
    <>
      {contextHolder}
      <div className="">
        <div className="row">
          <div className="col-12">
            <div className="catagroy">
              <span>
                <h4>Search by categories:</h4>
              </span>
              <Select
                showSearch
                className="select-section"
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChangeSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                
                value={selectValue}
              >
                <Select.Option key={"all"} value={"all"} label={"all"}>
                  All
                </Select.Option>
                {category?.map((item) => {
                  return (
                    <>
                      <Select.Option
                        key={item?.id}
                        value={item?.id}
                        label={item?.title}
                      >
                        {item?.title}
                      </Select.Option>
                    </>
                  );
                })}
              </Select>
            </div>
            <div className="Favourite_section">
              <button
                type="button"
                className="btn Favourite_btn"
                style={{ background: favourite ? "black" : "" }}
                onClick={() => {
                  favourite ? fetchActiveLots() : fetchAllFavouriteLots();
                }}
              >
                <AiOutlineStar
                  // color="white"
                  className="mr-2"
                  size={20}
                />
                OMT
              </button>
              {category?.map((item) => {
                return (
                  <>
                    <button
                      key={item?.id}
                      type="button"
                      className="btn Favourite_btn"
                      onClick={() => {
                        setFavourite(false);
                        setSelectValue(item?.id);
                        onChangeSelect(item?.id);
                      }}
                      style={{
                        background: selectValue === item?.id ? "black" : "",
                      }}
                    >
                      {item?.title}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
          <div
            className="card p-0 m-2 w-100"
            style={{ backgroundColor: "rgb(239, 239, 239)" }}
          >
            <div className="card-header bg-white">
              <div
                className="live_LotsDetails_header p-2"
                style={{ color: "black" }}
              >
                {selectedCategory ? selectedCategory?.title : "All"} -{" "}
                {activeLots?.length} - Live Lots
                {activeLots?.length > 0 ? (
                  <div>
                    <button
                      type="button"
                      className="btn Favourite_btn ml-4"
                      style={{
                        padding: " 0.325rem 0.25rem",
                        backgroundColor: "green",
                      }}
                      onClick={() => {
                        selectedCategory != null
                          ? downloadExcelWithCategroy()
                          : favourite
                          ? downloadFavExcel()
                          : downloadExcel();
                      }}
                    >
                      <BiSolidDownload className="mr-1" size={24} />
                      Download Excel
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {activeLots?.length > 0 ? (
              currentActiveLots?.map((lot) => {
                return (
                  <>
                    {/* <div class="card-header live_Lots_header">{lot.title}</div> */}
                    <div
                      className="card card_section"
                      onClick={(e) => {
                        // setOpen(true);
                        // setParticipationLot(lot);
                        handleNavLinkClick(lot);
                      }}
                    >
                      <div className="card-body p-0">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item p-0">
                            <div className="description-section">
                              {" "}
                              <div className="Lot-Details"
                              >
                                <div className="live_Lots_title p-3">
                                  <div>{lot.title}</div>
                                  {/* <div>{lot.categories?.title}</div> */}
                                  {/* <button
                                className="btn"
                                style={{
                                  backgroundColor: "#020a52",
                                  color: "white",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpen(true);
                                }}
                              >
                                Details
                              </button> */}
                                </div>
                                <div className="lots_details_mobile">
                                  <div>
                                    {" "}
                                    {lot?.customers?.length > 0 || favourite ? (
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
                                          addFavouriteLot(
                                            userDetails?.id,
                                            lot?.id
                                          );
                                        }}
                                      />
                                    )}
                                  </div>
                                  {/* <FaRegStar
                                color="rgb(114 178 188)"
                                size={30}
                                className="mx-4"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log("click", lot?.lot?.id);
                                }}
                              /> */}
                                  <div>
                                    {" "}
                                    <Tag
                                      style={{
                                        backgroundColor: "#14213D",
                                        // color: "white",
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
                                    {/* <Tag className="tag_text">
                                    ₹
                                    {lot?.last_bid?.amount
                                      ? parseInt(
                                        lot?.last_bid?.amount
                                        ).toLocaleString()
                                      : parseInt(lot?.Price).toLocaleString()}
                                    /mt &nbsp;&nbsp;
                                  </Tag> */}
                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(241 241 241)",
                                      }}
                                      className="tag_text"
                                    >
                                      STARTED AT{" "}
                                      {moment(lot.StartDate).format(
                                        "DD-MMM-YY h:mma"
                                      )}
                                    </Tag>
                                    {/* <Tag
                                style={{
                                  backgroundColor: "rgb(241 214 228)",
                                }}
                                className={
                                  isBlinking ? "tag_text blinker" : "tag_text"
                                }
                                onAnimationEnd={removeAnimation}
                              >
                                ₹ {lot.Price}/mt &nbsp;&nbsp;
                                <img src={loading} style={{ width: "15px" }} />
                                &nbsp;
                                {lot?.EndDate ? (
                                  <Countdown
                                    date={new Date(getDate(lot?.EndDate))}
                                    daysInHours
                                  />
                                ) : (
                                  "00:00:00"
                                )}
                              </Tag> */}
                                    {/* <CountdownComponent lot={lot} /> */}
                                    {/* <Tag
                                  style={{
                                    backgroundColor: "#FFD700",
                                  }}
                                  className="tag_text"
                                >
                                  <FaHammer className="mr-2" />
                                  Bid Now!
                                </Tag> */}
                                    {/* <Tag
                                  style={{
                                    backgroundColor: "rgb(241 214 228)",
                                  }}
                                  className="tag_text"
                                >
                                  Ends At{" "}
                                  {moment(lot.StartDate).format("h:mma")}
                                </Tag> */}
                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(240 225 206)",
                                      }}
                                      className="tag_text"
                                    >
                                      {/* MATERIAL AT{" "} */}
                                      {lot?.materialLocation
                                        ? lot?.materialLocation.toUpperCase()
                                        : ""}{" "}
                                    </Tag>
                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(240 225 206)",
                                      }}
                                      className="tag_text"
                                    >
                                      {lot?.make_in
                                        ? "MADE IN  " +
                                          lot?.make_in.toUpperCase()
                                        : ""}
                                    </Tag>
                                    {/* <Tag
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
                                </Tag> */}
                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(155 220 226)",
                                      }}
                                      className="tag_text"
                                    >
                                      Participation Fee:{" "}
                                      {parseInt(
                                        lot.participate_fee
                                      ).toLocaleString()}{" "}
                                     
                                    </Tag>
                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(244 243 237)",
                                      }}
                                      className="tag_text"
                                      onAnimationEnd={removeAnimation}
                                    >
                                      Start Rs{" "}
                                      {parseInt(lot?.Price).toLocaleString()}{" "}
                                      &nbsp;&nbsp;&nbsp;&nbsp;+
                                      {lot?.last_bid?.amount
                                        ? parseInt(
                                          lot?.last_bid?.amount - lot?.Price
                                          ).toLocaleString()
                                        : 0}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="Lot-Bottom-section">
                                  <div className="detail-section">
                                    <CiCalendar size={28} />
                                    <h3>Ends At:</h3>
                                    <p>{moment(lot.EndDate).format("h:mma")}</p>
                                  </div>{" "}
                                  <CountdownComponent lot={lot} />
                                  {/* <div className="detail-section">
                                  <FaHammer size={28} />
                                  <h3>Bids:</h3>
                                  <p>{lot?.bids?.length}</p>
                                </div> */}
                                </div>
                              </div>
                              <div className="BitNowSection">
                                <p>
                                  <span>₹</span>{" "}
                                  {lot?.last_bid?.amount
                                    ? parseInt(
                                      lot?.last_bid?.amount
                                      ).toLocaleString() + "/mt"
                                    : parseInt(lot?.Price).toLocaleString() +
                                      "/mt"}
                                </p>
                                <button type="button" className="BidNowBtn">
                                  <FaHammer size={20} />
                                  Bid Now
                                </button>
                              </div>
                            </div>
                            <div
                              className={
                                lot?.uploadlotpicture ? "Image-secion" : ""
                              }
                            >
                              {lot?.uploadlotpicture ? (
                                <Image
                                  src={
                                    new URL(
                                      `https://admin.steel24.in/LotImages/${lot?.uploadlotpicture}`
                                    )
                                  }
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  // style={{
                                  //   width: "auto",
                                  //   height: "200px",
                                  //   objectFit: "cover",
                                  // }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                          {/* <li class="list-group-item">Jharsuguda, Kolkata</li>
                      <li class="list-group-item">
                        <Tag
                          style={{ backgroundColor: "rgba(246, 181, 25, 0.2)" }}
                          className="tag_text"
                        >
                          Total Qty: 347 mt
                        </Tag>
                        <Tag
                          style={{ backgroundColor: "rgba(246, 181, 25, 0.2)" }}
                          className="tag_text"
                        >
                          11 Lots
                        </Tag>
                      </li>
                      <li class="list-group-item">
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getDate(lot?.StartDate)}
                        </Tag>
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getTime(lot?.StartDate)}
                        </Tag>
                    
                        Until:
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getTime(lot?.EndDate)}
                        </Tag>
                      </li> */}
                        </ul>
                      </div>
                    </div>
                  </>
                );

                {
                  /* {activeLots?.activeLots?.map((lot) => {
              return (
                <div className="card p-0 m-2 w-100">
                  <div class="card-header live_Lots_header">{lot.title}</div>
                  <div className="card" style={{ padding: "1%" }}>
                    <div class="card-body p-0">
                      <ul class="list-group list-group-flush">
                        <li
                          class="list-group-item p-0"
                          style={{ background: "rgb(221 255 255)" }}
                        >
                          <div class="ive_Lots_header p-3">{lot.title}</div>
                          <div>
                            <FaRegStar
                              color="rgb(114 178 188)"
                              size={30}
                              className="mx-4 "
                            />
                            <Tag
                              style={{
                                backgroundColor: "rgb(2 114 181)",
                                color: "white",
                              }}
                              className="tag_text"
                            >
                              Lot No: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "#FFD700",
                              }}
                              className="tag_text"
                            >
                              Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(241 214 228)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "#FFD700",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(241 214 228)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <br />
                            <Tag
                              style={{
                                backgroundColor: "rgb(240 225 206)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(155 220 226)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(221 255 215)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt
                            </Tag>
                            <Tag
                              style={{
                                backgroundColor: "rgb(241 241 241)",
                              }}
                              className="tag_text"
                            >
                              Total Qty: 347 mt end
                            </Tag>
                          </div>
                        </li>
                        <li class="list-group-item">Jharsuguda, Kolkata</li>
                      <li class="list-group-item">
                        <Tag
                          style={{ backgroundColor: "rgba(246, 181, 25, 0.2)" }}
                          className="tag_text"
                        >
                          Total Qty: 347 mt
                        </Tag>
                        <Tag
                          style={{ backgroundColor: "rgba(246, 181, 25, 0.2)" }}
                          className="tag_text"
                        >
                          11 Lots
                        </Tag>
                      </li>
                      <li class="list-group-item">
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getDate(lot?.StartDate)}
                        </Tag>
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getTime(lot?.StartDate)}
                        </Tag>
                    
                        Until:
                        <Tag
                          style={{ backgroundColor: "rgba(37, 142, 199, 0.2)" }}
                          className="tag_text"
                        >
                          {getTime(lot?.EndDate)}
                        </Tag>
                      </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })} */
                }
              })
            ) : (
              <>
                <div className="main_card_body">
                  <FixComponents
                    comp={!apiLoading && activeLots != null ? "NoData" : ""}
                  />
                </div>
                {/* <div className="sold_noRecord">No record found</div> */}
              </>
            )}
            <div
              className="d-flex justify-content-center p-1"
              style={{ background: "white" }}
            >
              <Pagination
                current={currentPage}
                pageSize={cardsPerPage}
                total={activeLots?.length}
                showTotal={(total) => `Total ${total} items`}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
                onShowSizeChange={(current, size) => {
                  setCardsPerPage(size);
                  setCurrentPage(current);
                }}
              />
            </div>
          </div>
        </div>
        {/* <Modal
        title="confirmation for Participation"
        open={open}
        onOk={() => {
          setOpen(false);
          // handleNavLinkClick(participationLot?.id);
        }}
        onCancel={() => setOpen(false)}
      >
        Participation fee is{" "}
        <span>
          <bold>{participationLot?.participate_fee}</bold>
        </span>
        .Do you want to participate in bid?
      </Modal> */}
      </div>
    </>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     getLiveLotsListReducer: state.getLiveLotsListReducer,
//     loginUserDetailsReducer: state.loginUserDetailsReducer,
//     participateInLotReducer: state.participateInLotReducer,
//     getCategoriesReducer: state.getCategoriesReducer,
//   };
// };

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
export default connect(mapStateToProps, mapDispatchtoProps)(LiveLots);
