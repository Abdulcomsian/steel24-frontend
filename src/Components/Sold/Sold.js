import { Image, Pagination, Select, Tag } from "antd";
import moment from "moment";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  SoldLotsFavorites,
  addFavourite,
  deleteFavourite,
  downloadExcelFile,
  downloadExcelFileWitCatagroy,
  downloadFavExcelFile,
  getCategory,
  getFilterlots,
  getLotDetails,
  getSoldLots,
} from "../../Api/lotsapi";
import {
  isAllradyLoginAction,
  logOutAction,
} from "../../Redux/Actions/Actions";
import { handleDownload } from "../../Redux/Constants";
import CountdownComponent from "../Countdown/CountdownComponent";
import FixComponents from "../FixComponents";
import LotDetailPopup from "../LotDetailPopup/LotDetailPopup";

function Sold(props) {
  const [soldLots, setSoldLots] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [apiLoading, setApiLoding] = useState(false);
  const [open, setOpen] = useState(false);
  const [lotDetails, setLotDetails] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentSoldLots, setCurrentSoldLots] = useState(null);
  const [selectValue, setSelectValue] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState([]);

  //useEffect for pagination
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    setCurrentSoldLots(
      Array.isArray(soldLots)
        ? soldLots.slice(indexOfFirstCard, indexOfLastCard)
        : []
    );
  }, [currentPage, cardsPerPage, soldLots]);

  const fetchSoldLots = () => {
    // setApiLoding(true);
    // setSoldLots([]);
    getSoldLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(false);
        setSoldLots(res.data?.SoldLots);
        setApiLoding(false);
      } else {
        // setSoldLots([]);
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    if (userDetails?.id) {
      fetchSoldLots();
      fetchCategory();
    }
  }, [userDetails]);

  const fetchLotDetails = (id) => {
    setApiLoding(true);
    getLotDetails(id).then((res) => {
      if (res.status == 200) {
        setLotDetails(res.data);
      } else {
        setApiLoding(false);
      }
    });
  };
  useEffect(() => {
    if (
      !props.loginUserDetailsReducer.loginUserDetails &&
      localStorage.getItem("UserDetails") &&
      localStorage.getItem("UserDetails") !== ""
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
    Navigate("/");
    props.logOutAction();
    window.location.reload();
  };

  const fetchAllFavouriteLots = () => {
    setSelectValue("all");
    setApiLoding(true);
    setSoldLots([]);
    SoldLotsFavorites(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(true);
        setSoldLots(res.data?.Fav_lots);
        setApiLoding(false);
      } else {
        setSoldLots([]);
        setApiLoding(false);
      }
    });
  };

  const downloadExcel = () => {
    setApiLoding(true);
    downloadExcelFile("Sold").then((res) => {
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
    downloadFavExcelFile(userDetails?.id, "Sold").then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    if (selectValue) {
      setSelectedCategory(category.find((item) => item.id === selectValue));
    }
  }, [selectValue]);

  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setSoldLots([]);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchSoldLots();
        setApiLoding(false);
      } else {
        fetchSoldLots();
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
      fetchSoldLots();
    });

    return () => {
      pusher.unsubscribe("lot-change");
    };
  }, []);

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setSoldLots([]);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchSoldLots();
        setApiLoding(false);
      } else {
        fetchSoldLots();
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

  const fetchFilterLots = (cId) => {
    setApiLoding(true);
    setSoldLots(null);
    getFilterlots(userDetails?.id, cId, "Sold").then((res) => {
      if (res.status === 200 && res.data?.success) {
        setSoldLots(res.data?.userLots);
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
      fetchSoldLots();
    } else {
      fetchFilterLots(val);
    }
  };

  const downloadExcelWithCategroy = () => {
    setApiLoding(true);
    downloadExcelFileWitCatagroy(
      userDetails?.id,
      selectedCategory?.id,
      "Sold"
    ).then((res) => {
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
      <LotDetailPopup
        data={open}
        lot={lotDetails}
        onCancel={() => {
          setOpen(false);
          setLotDetails(null);
        }}
      />
      <div className="">
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
              <option key={"all"} value={"all"} label={"all"}>
                All
              </option>
              {category?.map((item) => {
                return (
                  <>
                    <option key={item?.id} value={item?.id} label={item?.title}>
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
                favourite ? fetchSoldLots() : fetchAllFavouriteLots();
              }}
            >
              <AiOutlineStar className="mr-2" size={20} />
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
        <div className="row justify-content-center">
          <div
            className="card p-0 m-2 w-100"
            style={{ backgroundColor: "rgb(239, 239, 239)" }}
          >
            <div className="card-header bg-white">
              <div
                className="live_LotsDetails_header p-2"
                style={{ color: "black" }}
              >
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  {selectedCategory ? selectedCategory?.title : "All"} -{" "}
                  {soldLots?.length} - Sold Lots
                  {soldLots?.length > 0 ? (
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
            </div>
            {soldLots?.length > 0 ? (
              currentSoldLots?.map((lot) => {
                return (
                  <div
                    className="card card_section"
                    onClick={(e) => {
                      setOpen(true);
                      setLotDetails(lot?.id);
                      // fetchLotDetails(lot?.id);
                    }}
                  >
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item p-0">
                          <div
                            className={
                              lot?.uploadlotpicture
                                ? "description-section"
                                : "w-100"
                            }
                          >
                            <div className="w-100">
                              <div className="live_Lots_title p-3">
                                <div>{lot.title}</div>
                                {/* <div>{lot.categories?.title}</div> */}
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
                                <div>
                                  <Tag className="tag_text">
                                    Lot No:{lot.id}
                                  </Tag>
                                  <Tag className="tag_text">
                                    Qty: {lot.Quantity} mt
                                  </Tag>
                                  <Tag className="tag_text">
                                    ₹
                                    {lot?.bids?.length > 0
                                      ? parseInt(
                                          lot?.bids[0]?.max_bid
                                        ).toLocaleString()
                                      : parseInt(lot?.Price).toLocaleString()}
                                    /mt &nbsp;&nbsp;
                                  </Tag>

                                  <Tag className="tag_text">
                                    SOLD TO HIGHEST BIDDER
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
                                      ? "MADE IN  " + lot?.make_in.toUpperCase()
                                      : ""}
                                  </Tag>

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
                                    {lot?.bids?.[0]?.max_bid
                                      ? parseInt(
                                          lot?.bids?.[0]?.max_bid - lot?.Price
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
                );
              })
            ) : (
              <>
                <div className="main_card_body">
                  <FixComponents
                    comp={!apiLoading && soldLots != null ? "NoData" : ""}
                  />
                </div>
              </>
            )}
            <div className="d-flex justify-content-center p-1 bg-white">
              <Pagination
                current={currentPage}
                pageSize={cardsPerPage}
                total={soldLots?.length}
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
export default connect(mapStateToProps, mapDispatchtoProps)(Sold);
