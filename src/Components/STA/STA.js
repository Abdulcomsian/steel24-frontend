import { Image, Pagination, Select, Tag, notification } from "antd";
import FixComponents from "../FixComponents";
import { useEffect, useState } from "react";
import { getDateTime, handleDownload } from "../../Redux/Constants";
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
  getSTAFavLots,
  getSTALots,
} from "../../Api/lotsapi";
import CountdownComponent from "../Countdown/CountdownComponent";
import { FaHammer } from "react-icons/fa6";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { connect } from "react-redux";
import {
  isAllradyLoginAction,
  logOutAction,
} from "../../Redux/Actions/Actions";
import { useNavigate } from "react-router-dom";
import { BiSolidDownload } from "react-icons/bi";
import LotDetailPopup from "../LotDetailPopup/LotDetailPopup";
import Pusher from "pusher-js";
import moment from "moment";
import { CiCalendar } from "react-icons/ci";

function STA(props) {
  const [activeLots, setActiveLots] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [selectValue, setSelectValue] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentActiveLots, setCurrentActiveLots] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [apiLoading, setApiLoding] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [category, setCategory] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lotDetails, setLotDetails] = useState(null);

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

  const fetchSTALots = () => {
    setApiLoding(true);
    setActiveLots([]);
    getSTALots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setSelectValue("all");
        setFavourite(false);
        setActiveLots(res.data?.STA_Lots);
        setApiLoding(false);
      } else {
        setActiveLots([]);
        setApiLoding(false);
      }
    });
  };

  const fetchAllFavouriteLots = () => {
    setSelectValue("all");
    setApiLoding(true);
    setActiveLots([]);
    getSTAFavLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(true);
        setActiveLots(res.data?.STA_Fav_Lots);
        setApiLoding(false);
      } else {
        setActiveLots([]);
        setApiLoding(false);
      }
    });
  };

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setActiveLots(null);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchSTALots();
        setApiLoding(false);
      } else {
        fetchSTALots();
        setApiLoding(false);
      }
    });
  };

  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setActiveLots(null);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchSTALots();
        setApiLoding(false);
      } else {
        fetchSTALots();
        setApiLoding(false);
      }
    });
  };

  const onChangeSelect = (val) => {
    setFavourite(false);
    setSelectValue(val);
    if (val === "all") {
      fetchSTALots();
    } else {
      fetchFilterLots(val);
    }
  };

  const fetchFilterLots = (cId) => {
    setApiLoding(true);
    setActiveLots(null);
    getFilterlots(userDetails?.id, cId, "STA").then((res) => {
      if (res.status === 200 && res.data?.success) {
        setActiveLots(res.data?.userLots);
        setApiLoding(false);
      } else {
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
      fetchSTALots();
      fetchCategory();
    }
  }, [userDetails]);

  useEffect(() => {
    if (selectValue) {
      setSelectedCategory(category.find((item) => item.id === selectValue));
    }
  }, [selectValue]);

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

  const downloadExcelWithCategroy = () => {
    setApiLoding(true);
    downloadExcelFileWitCatagroy(
      userDetails?.id,
      selectedCategory?.id,
      "STA"
    ).then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  const downloadExcel = () => {
    setApiLoding(true);
    downloadExcelFile("STA").then((res) => {
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
    downloadFavExcelFile(userDetails?.id, "STA").then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    Pusher.logToConsole = false;
    var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("lot-change");
    channel.bind("lot.successful", function (data) {
      fetchSTALots();
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
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChangeSelect}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                className="select-section"
                value={selectValue}
              >
                <option key={"all"} value={"all"} label={"all"}>
                  All
                </option>
                {category?.map((item) => {
                  return (
                    <>
                      <option
                        key={item?.id}
                        value={item?.id}
                        label={item?.title}
                      >
                        {item?.title}
                      </option>
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
                  favourite ? fetchSTALots() : fetchAllFavouriteLots();
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
            <div
              className="card-header"
              style={{ backgroundColor: "rgb(239, 239, 239)" }}
            >
              <div
                className="live_LotsDetails_header p-2"
                style={{ color: "black" }}
              >
                {selectedCategory ? selectedCategory?.title : "All"} -{" "}
                {activeLots?.length} - STA Lots
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
                    <div
                      className="card card_section"
                      onClick={(e) => {
                        // handleNavLinkClick(lot);
                        setOpen(true);
                        setLotDetails(lot?.id);
                      }}
                    >
                      <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item p-0">
                            <div
                              className={
                                lot?.uploadlotpicture
                                  ? "description-section"
                                  : "w-100"
                              }
                            >
                              <div className="w-100">
                                <div class="live_Lots_title p-3">
                                  <div>{lot.title}</div>
                                  {/* <div>{lot.categories?.title}</div> */}
                                </div>
                                <div className="lots_details_mobile">
                                  <div>
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
                                  <div>
                                    <Tag className="tag_text">
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
                                      ₹{" "}
                                      {lot?.last_bid!=null
                                        ? parseInt(
                                            lot?.last_bid?.amount
                                          ).toLocaleString()
                                        : parseInt(lot?.Price).toLocaleString()}
                                      /mt
                                    </Tag>
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
                                    {/* <CountdownComponent lot={lot} /> */}
                                    {/* <Tag
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
                                    Ended At{" "}
                                    {moment(lot.EndDate).format(
                                      "DD-MMM-YY h:mma"
                                    )}
                                  </Tag> */}

                                    {/* <br /> */}

                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(240 225 206)",
                                      }}
                                      className="tag_text"
                                    >
                                      {lot?.materialLocation
                                        ? lot?.materialLocation.toUpperCase()
                                        : ""}
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
                                  </Tag> */}
                                    {lot?.lot_status === "STA" ? (
                                      <>
                                        <Tag
                                          style={{
                                            backgroundColor: "rgb(221 255 215)",
                                          }}
                                          className="tag_text"
                                        >
                                          SUBJECT TO APPROVAL
                                        </Tag>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                    {/* <Tag
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
                                    <h3>Ended At:</h3>
                                    <p>{moment(lot.EndDate).format("h:mma")}</p>
                                  </div>{" "}
                                  <CountdownComponent lot={lot} />
                                </div>
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
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <div className="main_card_body">
                  <FixComponents
                    comp={!apiLoading && activeLots != null ? "NoData" : ""}
                  />
                </div>
              </>
            )}
            <div
              className="d-flex justify-content-center p-1"
              style={{ backgroundColor: "white" }}
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
      </div>
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

export default connect(mapStateToProps, mapDispatchtoProps)(STA);
