import { Image, Pagination, Select, Tag, notification } from "antd";
import moment from "moment";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UpcomingLotsFavorites,
  addFavourite,
  deleteFavourite,
  downloadExcelFile,
  downloadExcelFileWitCatagroy,
  downloadFavExcelFile,
  getCategory,
  getFilterlots,
  getUpcomingLots,
} from "../../Api/lotsapi";
import { handleDownload } from "../../Redux/Constants";
import CountdownComponent from "../Countdown/CountdownComponent";
import FixComponents from "../FixComponents";
import LotDetailPopup from "../LotDetailPopup/LotDetailPopup";

function UpcomingLot() {
  const [allLots, setAllLots] = useState({});
  const [api, contextHolder] = notification.useNotification();
  const [apiLoading, setApiLoding] = useState(false);
  const [participationLot, setParticipationLot] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [lotDetails, setLotDetails] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const { loginUserDetails } = useSelector(
    (store) => store?.loginUserDetailsReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [currentLots, setCurrentLots] = useState(null);

  const [selectValue, setSelectValue] = useState("all");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //useEffect for pagination
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    setCurrentLots(
      Array.isArray(allLots)
        ? allLots.slice(indexOfFirstCard, indexOfLastCard)
        : []
    );
  }, [currentPage, cardsPerPage, allLots]);

  const handleNavLinkClick = (lot) => {
    if (lot?.lot_status === "live") {
      navigate("/dashboard/live/LiveLotDetails", {
        state: { lot, userDetail: userDetails },
      });
    } else {
      api.info({
        description: `Lot is ${lot?.lot_status}.`,
      });
    }
  };

  const fetchUpcomingLots = () => {
    // setApiLoding(true);
    // setAllLots([]);
    getUpcomingLots(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(false);
        setAllLots(res.data?.userLots);
        setApiLoding(false);
      } else {
        // setAllLots([]);
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
    setUserDetails(loginUserDetails);
    if (userDetails?.id) {
      fetchUpcomingLots();
      fetchCategory();
    }
  }, [loginUserDetails, userDetails]);

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setAllLots(null);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchUpcomingLots();
        setApiLoding(false);
      } else {
        fetchUpcomingLots();
        setApiLoding(false);
      }
    });
  };

  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setAllLots(null);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchUpcomingLots();
        setApiLoding(false);
      } else {
        fetchUpcomingLots();
        setApiLoding(false);
      }
    });
  };

  const fetchAllFavouriteLots = () => {
    setSelectValue("all");
    setApiLoding(true);
    setAllLots([]);
    UpcomingLotsFavorites(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavourite(true);
        setAllLots(
          (res.data?.Fav_lots).sort((a, b) => {
            return new Date(a.EndDate) - new Date(b.EndDate);
          })
        );
        setApiLoding(false);
      } else {
        setAllLots([]);
        setApiLoding(false);
      }
    });
  };

  const downloadExcel = () => {
    setApiLoding(true);
    downloadExcelFile("Upcoming").then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
        setApiLoding(false);
      } else {
        setApiLoding(false);
      }
    });
  };

  const fetchFilterLots = (cId) => {
    setApiLoding(true);
    setAllLots(null);
    getFilterlots(userDetails?.id, cId, "Upcoming").then((res) => {
      if (res.status === 200 && res.data?.success) {
        setAllLots(res.data?.userLots);
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
      fetchUpcomingLots();
    } else {
      fetchFilterLots(val);
    }
  };

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
      "Upcoming"
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
    downloadFavExcelFile(userDetails?.id, "Upcoming").then((res) => {
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
                  favourite ? fetchUpcomingLots() : fetchAllFavouriteLots();
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
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedCategory ? selectedCategory?.title : "All"} -{" "}
                  {allLots?.length} - UpComings Lots
                  {allLots?.length > 0 ? (
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
            {allLots?.length > 0 ? (
              currentLots?.map((lot) => {
                return (
                  <>
                    <div
                      className="card card_section"
                      onClick={(e) => {
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
                                    <Tag className="tag_text">
                                      ₹{parseInt(lot?.Price).toLocaleString()}
                                      /mt &nbsp;&nbsp;
                                    </Tag>

                                    <Tag
                                      style={{
                                        backgroundColor: "rgb(241 241 241)",
                                      }}
                                      className="tag_text"
                                    >
                                      Starts AT{" "}
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
                                        ? "MADE IN  " +
                                          lot?.make_in.toUpperCase()
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
                                      {lot?.bids?.[0]?.amount
                                        ? parseInt(
                                            lot?.bids?.[0]?.amount
                                          ).toLocaleString()
                                        : 0}
                                    </Tag>
                                  </div>
                                </div>
                                <div className="Lot-Bottom-section">
                                  <div className="detail-section">
                                    <CiCalendar size={28} />
                                    <h3>Starts At:</h3>
                                    <p>
                                      {moment(lot.StartDate).format("h:mma")}
                                    </p>
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
                    comp={!apiLoading && allLots != null ? "NoData" : ""}
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
                total={allLots?.length}
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
export default UpcomingLot;
