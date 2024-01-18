import { Modal, Tag, notification } from "antd";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addnewbidtolot,
  cancelAutoBid,
  checkAutoBid,
  createautobid,
  getLotDetails,
  participateInLot,
} from "../../Api/lotsapi";
import { getDate, getTodayDate } from "../../Redux/Constants";
import timer from "../../images/timer-outline.svg";
import FixComponents from "../FixComponents";
import "./style.css";
import MaterialTable from "../MaterialTable/MaterialTable";
import Countdown from "react-countdown";
import LotDetailPopup from "../LotDetailPopup/LotDetailPopup";

function LivelotsDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cities, setCities] = useState([]);
  const [secondCity, setSecondCity] = useState([]);
  const [lotDetails, setLotDetails] = useState({});
  const [isOn, setIsOn] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [previousBidValue, setPreviousBidValue] = useState(null);
  const [nextBidValue, setNextBidValue] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [yourBid, setYourBid] = useState(false);
  const [participateFee, setParticipateFee] = useState(false);
  const [countdown, setCountdown] = useState(0); // Initial countdown value in seconds
  const [autoBidValue, setAutoBidValue] = useState(false);
  const [todayTime, setTodayTime] = useState(getTodayDate());
  const [bidButton, setBidButton] = useState(false);
  const [popupDetails, setPopupDetails] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdown((prevCountdown) => {
  //       if (prevCountdown === 0) {
  //         clearInterval(timer); // Stop the countdown when it reaches 0
  //         return prevCountdown; // Return the same value to avoid negative numbers
  //       }
  //       return prevCountdown - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  // }, [countdown]);

  //check the customer autobid
  const fetchAutoBid = (lotId) => {
    setApiLoading(true);
    checkAutoBid(lotId).then((res) => {
      if (res.status === 200 && res.data.success) {
        setAutoBidValue(res.data?.autobid);
        setApiLoading(false);
      } else {
        setApiLoading(false);
      }
    });
  };

  //this api is for add new bid against lot
  const newbidtolot = (amount) => {
    addnewbidtolot({
      amount: amount,
      lotId: lotDetails?.lotDetails?.id,
    }).then((res) => {
      if (res.status === 200 && res.data?.success === true) {
        // api.info({
        //   description: "You have submitted a bid of Rs " + amount+" for this Lot",
        // });
        if (res.data?.setButton) {
          setPreviousBidValue(res.data?.maxAmount);
          setBidButton(false);
          api.error({
            description: res.data?.message,
          });
        } else {
          setPreviousBidValue(amount);
        }
      } else {
        setBidButton(false);
        api.info({
          description: res.data?.msg,
        });
      }
    });
  };

  //for get time in seconds of the last bid
  const getTimeInSeconds = (givenTime) => {
    const givenDate = new Date(givenTime);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor((currentDate - givenDate) / 1000);
    return differenceInSeconds > 120 ? 0 : 120 - differenceInSeconds;
    // return(differenceInSeconds);
  };

  const addAnimation = () => {
    var element = document.getElementById("lastBid");
    element.classList.add("blink");
  };

  //for change the data of bid real time (pusher)
  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("steel24");
    channel.bind("win-lots checking", function (data) {
      setBidButton(false);
      if (
        data?.customer?.id === userDetails?.id &&
        data?.detail?.lotId === lotDetails?.lotDetails?.id &&
        data.success
      ) {
        setPreviousBidValue(data?.detail?.amount);
        setYourBid(true);
        // api.info({
        //   description:
        //     "You have submitted a bid of Rs " +
        //     data?.detail?.amount +
        //     " for this Lot",
        // });
        addAnimation();
      } else if (
        data?.detail?.lotId === lotDetails?.lotDetails?.id &&
        data.success
      ) {
        setPreviousBidValue(data?.detail?.amount);
        setYourBid(false);
        // api.info({
        //   description: data?.customer?.name + " bid " + data?.detail?.amount,
        // });
        addAnimation();
      } else if (
        data?.detail?.lotId === lotDetails?.lotDetails?.id &&
        !data.success
      ) {
        setOpen(true);
        setPopupDetails(data?.detail?.lotId);
        // info(data?.customer?.name);
      }
    });

    // channel.bind("Sold Lots", function (data) {
    //   if (data?.detail?.lotId === lotDetails?.lotDetails?.id && data.success) {
    //     info(data?.detail?.customer?.name);
    //   }
    // });

    return () => {
      pusher.unsubscribe("steel24");
    };
  }, [location?.state, lotDetails]);

  //check the lot status and add 100plus value in the last  bid value
  const bidNow = (amount) => {
    if (lotDetails?.lotDetails?.lot_status === "live") {
      if (amount > previousBidValue) {
        if (
          amount == previousBidValue
            ? previousBidValue + 100
            : parseInt(lotDetails?.lotDetails?.Price) + 100
        ) {
          newbidtolot(amount);
        } else {
          api.error({
            description:
              "The bid amount must not be greater than 100 of the last bid.",
          });
        }
      } else {
        api.error({
          description: "Bid Amount is less then last bid.",
        });
      }
    } else {
      api.error({
        description: "Lot Is Not Live.",
      });
    }
  };

  //for the pay participation fee afainst lot
  const payParticipationFee = (amount) => {
    participateInLot(userDetails?.id, lotDetails?.lotDetails?.id).then(
      (res) => {
        if (res.status == 200 && res.data?.success === true) {
          api.info({
            description: res.data?.message,
          });
          setParticipateFee(true);
          amount ? bidNow(parseInt(amount)) : autoBid();
        } else {
          setBidButton(false);
          api.info({
            description: res.data?.message,
          });
        }
      }
    );
  };

  //check the participation fee pay or not and then call the bid function
  const participateLot = (event) => {
    setBidButton(true);
    event.preventDefault();
    if (
      lotDetails?.lotDetails?.lot_status === "live" &&
      new Date(lotDetails?.lotDetails?.EndDate) > new Date()
    ) {
      if (participateFee) {
        bidNow(parseInt(event.target.elements.amount.value));
      } else {
        payParticipationFee(event.target.elements.amount.value);
      }
    } else {
      api.info({
        description: "Lot has already been sold to another user.",
      });
      setBidButton(false);
    }
  };

  //get lot details
  const fetchLotDetails = () => {
    getLotDetails(location.state?.lot?.id).then((res) => {
      if (res.status == 200) {
        setLotDetails(res?.data);
        setPreviousBidValue(
          res.data?.lotDetails?.lastBidAmount
            ? res.data?.lotDetails?.lastBidAmount
            : res.data?.lotDetails?.Price
        );
        setCountdown(new Date(getDate(res?.data?.lot?.EndDate)));
        setYourBid(
          res?.data?.maxbid?.customerId === location?.state?.userDetail?.id
        );
        setApiLoading(false);
        // fetchAutoBid(location?.state?.lot?.id);
      }
    });
  };

  //this is for get  the details of lot  and set the initial value of participation
  useEffect(() => {
    if (location?.state) {
      setUserDetails(location?.state?.userDetail);
      setParticipateFee(location?.state?.lot?.customer_balance?.length > 0);
      setApiLoading(true);
      getLotDetails(location.state?.lot?.id).then((res) => {
        if (res.status == 200) {
          setLotDetails(res?.data);
          setPreviousBidValue(
            res.data?.lotDetails?.lastBidAmount
              ? res.data?.lotDetails?.lastBidAmount
              : res.data?.lotDetails?.Price
          );
          setCountdown(new Date(getDate(res?.data?.lot?.EndDate)));
          setYourBid(
            res?.data?.maxbid?.customerId === location?.state?.userDetail?.id
          );
          setApiLoading(false);
          fetchAutoBid(location?.state?.lot?.id);
        } else {
          setApiLoading(false);
        }
      });
    }
  }, [location?.state]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    // setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (valu) => {
    // setSecondCity(value);
  };
  const onChange = (checked) => {
    setIsOn(!isOn);
    console.log(`switch to ${checked}`);
  };

  const provinceData = ["Zhejiang", "Jiangsu"];

  const cityData = {
    Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
    Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
  };

  const handleOk = () => {
    navigate("/dashboard/Live");
  };

  //modal for the notification win
  const info = (data) => {
    Modal.info({
      title: "This is a Notification message",
      content: (
        <div>
          <p>This lot is won by {data}.</p>
        </div>
      ),
      onOk() {
        handleOk();
      },
    });
  };

  //check the  participation fee and then call the autobid api
  const startAutoBid = () => {
    if (
      lotDetails?.lotDetails?.lot_status === "live" &&
      new Date(lotDetails?.lotDetails?.EndDate) > new Date()
    ) {
      if (participateFee) {
        autoBid();
      } else {
        payParticipationFee();
      }
    } else {
      api.error({
        description:
          "Your Auto Bid status could not activated.Because time is finished",
      });
    }
  };

  //this is for save the auto bider status
  const autoBid = () => {
    setApiLoading(true);
    createautobid(lotDetails?.lotDetails?.id).then((res) => {
      if (res.status === 200 && res.data.success) {
        setAutoBidValue(true);
        setApiLoading(false);
        api.success({
          description: "Your Auto Bid status has been activated successfully.",
        });
      } else {
        setAutoBidValue(false);
        setApiLoading(false);
        api.error({
          description: "Your Auto Bid status could not activated.",
        });
      }
    });
  };

  //this is for delete the autobider
  const cancelautoBid = () => {
    setApiLoading(true);
    cancelAutoBid(lotDetails?.lotDetails?.id).then((res) => {
      if (res.status === 200 && res.data.success) {
        setAutoBidValue(false);
        setApiLoading(false);
        api.success({
          description: "Your Auto Bid status has been deactivated.",
        });
      } else {
        apiLoading(false);
      }
    });
  };

  const removeAnimation = () => {
    var element = document.querySelector(".blink");
    element.classList.remove("blink");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayTime(getTodayDate());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("lot-change");
    channel.bind("lot.successful", function (data) {
      // fetchLotTime(location.state?.lot?.id);
      fetchLotDetails();
    });

    // return () => {
    //   pusher.unsubscribe("lot-change");
    // };
  }, []);

  return (
    <>
      <LotDetailPopup
        data={open}
        lot={popupDetails}
        onCancel={() => {
          setOpen(false);
          setPopupDetails(null);
          // handleOk();
        }}
      />
      {contextHolder}
      {!apiLoading ? (
        <div>
          <div className="row p-0 mx-4">
            <div className="col-12 p-0">
              <div className="mb-3">
                <p className="lot_details_time">{todayTime}</p>
              </div>
            </div>
            {/* <div className="col-12 p-0">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center justify-content-end">
                <Space wrap>
                  <Select
                    defaultValue={provinceData[0]}
                    style={{ width: 200 }}
                    onChange={handleProvinceChange}
                    options={provinceData.map((province) => ({
                      label: province,
                      value: province,
                    }))}
                  />
                  <Select
                    style={{ width: 200 }}
                    value={secondCity}
                    onChange={onSecondCityChange}
                    options={cities.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                  />
                </Space>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <div className="sound_on row">
                  <BsVolumeUp className="mr-2" />
                  <p className="mr-2">Sound is {isOn?"ON":"OFF"}</p>
                  <Switch defaultChecked={isOn} onChange={onChange}  className={`custom_switch mr-2  ${isOn ? "switch-on" : "switch-off"}`} />
                </div>
                <Tag
                  className="tag_text_STATUS ml-3"
                  style={{
                    backgroundColor: "rgba(37, 142, 199, 0.12)",
                    color: "rgba(37, 142, 199, 1)",
                  }}
                >
                  Next lot# 129151
                </Tag>
              </div>
            </div>
          </div> */}
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-12 bg-white">
              <div className=" p-0 m-2">
                <div className="lot_details_Name">
                  {lotDetails?.lotDetails?.title}
                </div>
                <div className="d-flex align-items-center my-2 flex-wrap" style={{gap:"0.5rem"}}>
                  <Tag
                    id="lastBid"
                    className="tag_text_STATUS"
                    style={{
                      backgroundColor: "rgba(246, 181, 25, 0.14)",
                      color: "rgba(246, 181, 25, 1)",
                      fontSize: "20px",
                      fontWeight: "600",
                    }}
                    onAnimationEnd={removeAnimation}
                  >
                    Highest Bid:{" "}
                    {previousBidValue
                      ? `₹ ${previousBidValue.toLocaleString()} /mt`
                      : "No Bid"}
                  </Tag>
                  <Tag
                    className="tag_text_STATUS "
                    style={{
                      backgroundColor: "rgba(125, 179, 67, 0.15)",
                      color: "rgba(125, 179, 67, 1)",
                    }}
                  >
                    Participation Fee:{" "}
                    {lotDetails?.lotDetails?.participate_fee.toLocaleString()}
                   
                  </Tag>
                  <Tag
                    className="tag_text_STATUS "
                    style={{
                      backgroundColor: "rgba(232, 76, 61, 0.14)",
                      color: "rgba(232, 76, 61, 1)",
                    }}
                  >
                    {yourBid ? "Your bid" : "Not your bid"}
                  </Tag>
                  <div className="lot_details_timer">
                    <img src={timer} />{" "}
                    <Countdown date={countdown} daysInHours />
                    {/* {countdown} Secs */}
                  </div>
                </div>
                <form onSubmit={participateLot}>
                  <div className="bit_section">
                    <input
                      type="number"
                      className="form-control w-100"
                      name="amount"
                      value={parseInt(previousBidValue) + 100}
                      disabled
                      required
                    />
                    {/* {!autoBidValue ? (
                      <button
                        type="button"
                        className="btn auto_bit"
                        onClick={startAutoBid}
                      >
                        Auto Bid
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn auto_bit"
                        onClick={cancelautoBid}
                      >
                        Stop Auto Bid
                      </button>
                    )} */}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bit_now"
                      // onClick={participateLot}
                      disabled={autoBidValue || bidButton ? true : false}
                    >
                      ₹ Bid Now{" "}
                      {(parseInt(previousBidValue) + 100).toLocaleString()}
                      /mt
                    </button>
                    <div className="Ending_time">
                      Ending Time: {lotDetails?.lotDetails?.EndDate}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 bg-white">
              <div className="card p-0 m-4">
                <div className="material-table">
                  <div className="card-header live_LotsDetails_header">
                    Live Lot No : {lotDetails?.lotDetails?.id}
                  </div>
                </div>

                <div className="card-body p-0 table_line">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item live_lot_details">
                      <h4>QTY:</h4>
                      <h5>{lotDetails?.lotDetails?.Quantity}</h5>
                    </li>
                    <li className="list-group-item live_lot_details">
                      <h4>Seller:</h4>
                      <h5>{lotDetails?.lotDetails?.Seller}</h5>
                    </li>
                    <li className="list-group-item live_lot_details">
                      <h4>Started At:</h4>
                      <h5>{lotDetails?.lotDetails?.StartDate}</h5>
                    </li>
                    <li className="list-group-item live_lot_details">
                      <h4>Started From:</h4>
                      <h5>
                        {parseInt(
                          lotDetails?.lotDetails?.Price
                        ).toLocaleString()}
                      </h5>
                    </li>
                    <li className="list-group-item ">
                      <div className="lot_table">
                        <Tag className="table_tags ml-3">Ready Stock</Tag>
                        <Tag className="table_tags ml-3">
                          Subject to Approval
                        </Tag>
                      </div>
                      <div className="lot_table">
                        <Tag
                          className="tag_text_STATUS ml-3"
                          style={{
                            backgroundColor: "rgba(37, 142, 199, 0.1)",
                            color: "rgba(37, 142, 199, 1)",
                            width: "16rem",
                            whiteSpace: "normal",
                          }}
                        >
                          Material at {lotDetails?.lotDetails?.materialLocation}
                        </Tag>
                        <Tag
                          className="tag_text_STATUS ml-3"
                          style={{
                            backgroundColor: "rgba(37, 142, 199, 0.1)",
                            color: "rgba(37, 142, 199, 1)",
                            width: "16rem",
                            textDecorationLine: "underline",
                          }}
                        >
                          Made in {lotDetails?.lotDetails?.make_in}
                        </Tag>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-12 p-0">
              <div className=" p-0 m-4">
                {lotDetails && lotDetails?.lot?.lot_terms ? (
                  <div className="col-12 p-0">
                    <div className="mb-4">
                      <div className="card-header popup_LotsDetails_header d-flex align-items-center">
                        <button
                          type="button"
                          className="btn Favourite_btn mr-3"
                          onClick={() =>
                            setTermsAndCondition(!termsAndCondition)
                          }
                        >
                          {!termsAndCondition ? "Hide" : "Show"}
                        </button>
                        Terms & conditions: Please read the following carefully
                        and abide by them.
                      </div>

                      {!termsAndCondition ? (
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
                              <div className="col-3">
                                Taxes and Duties:
                              </div>
                              <div className="div_left">
                                {lotDetails?.lot?.lot_terms?.Texes_and_Duties}
                              </div>
                            </li>
                            <li className=" popup_terms_condition">
                              <div className="col-3">
                                Commercial Terms:
                              </div>
                              <div className="div_left">
                                {lotDetails?.lot?.lot_terms?.Commercial_Terms}
                              </div>
                            </li>
                            <li className=" popup_terms_condition">
                              <div className="col-3">
                                Test Certificate:
                              </div>
                              <div className="div_left">
                                {lotDetails?.lot?.lot_terms?.Test_Certificate}
                              </div>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="material-table">
                  <div className="card-header live_LotsDetails_header">
                    Material Details: Live # {lotDetails?.lotDetails?.id}
                  </div>
                </div>

                <MaterialTable list={lotDetails?.materialList} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FixComponents comp={!apiLoading ? "NoData" : ""} />
      )}
    </>
  );
}

export default LivelotsDetails;
