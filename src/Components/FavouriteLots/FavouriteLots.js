import { Tag, notification } from "antd";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { AiFillStar } from "react-icons/ai";
import { FaHammer } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFavourite, deleteFavourite, getFavorites } from "../../Api/lotsapi";
import { getDate, getDateTime } from "../../Redux/Constants";
import loading from "../../assets/images/Group.svg";
import FixComponents from "../FixComponents";

function FavouriteLots() {
  const [api, contextHolder] = notification.useNotification();
  const [favouriteLots, setFavouriteLots] = useState({});
  const [apiLoading, setApiLoding] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { loginUserDetails } = useSelector(
    (store) => store?.loginUserDetailsReducer
  );

  const fetchAllFavouriteLots = () => {
    setApiLoding(true);
    getFavorites(userDetails?.id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFavouriteLots(res.data);
        setApiLoding(false);
      } else {
        setFavouriteLots([]);
        setApiLoding(false);
      }
    });
  };

  const addFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setFavouriteLots(null);
    addFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchAllFavouriteLots();
        setApiLoding(false);
      } else {
        fetchAllFavouriteLots();
        setApiLoding(false);
      }
    });
  };
  const deleteFavouriteLot = (user_id, lot_id) => {
    setApiLoding(true);
    setFavouriteLots(null);
    deleteFavourite(user_id, lot_id).then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        fetchAllFavouriteLots();
        setApiLoding(false);
      } else {
        fetchAllFavouriteLots();
        setApiLoding(false);
      }
    });
  };

  useEffect(() => {
    setUserDetails(loginUserDetails);
    if (userDetails?.id) {
      fetchAllFavouriteLots();
    }
  }, [loginUserDetails, userDetails]);

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

  return (
    <>
      {contextHolder}
      <div className="">
        <div className="row">
          <div className="card p-0 m-2 w-100">
            <div className="card-header">
              <div
                className="live_LotsDetails_header p-2"
                style={{ color: "black", background:"none"}}
              >
                Favourite Lots
              </div>
            </div>
            {favouriteLots?.Fav_lots?.length > 0 ? (
              favouriteLots?.Fav_lots?.map((lot) => {
                return (
                  <>
                    <div
                      className="card"
                      style={{ padding: "1%" }}
                      onClick={(e) => {
                        handleNavLinkClick(lot);
                      }}
                    >
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
                              {/* {lot?.customers?.length > 0 ? ( */}
                              <AiFillStar
                                color="#e5c04c"
                                size={35}
                                className="mx-4"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteFavouriteLot(userDetails?.id, lot?.id);
                                }}
                              />
                              {/* ) : (
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
                              )} */}
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
                                {lot?.bids?.[0]?.created_at ? (
                                  <Countdown
                                    date={
                                      new Date(
                                        getDate(lot?.bids?.[0]?.created_at)
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
                                Ends {getDateTime(lot.EndDate)}
                              </Tag>
                              <Tag
                                style={{
                                  backgroundColor: "rgb(244 243 237)",
                                }}
                                className="tag_text"
                              >
                                Start Rs {lot?.Price} &nbsp;&nbsp;&nbsp;&nbsp;+
                                {lot?.bids?.[0]?.amount
                                  ? lot?.bids?.[0]?.amount - lot?.Price
                                  : 0}
                              </Tag>
                              {/* <br /> */}

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
                                Participation Fee: {lot.participate_fee}
                              </Tag>
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
                <FixComponents
                  comp={!apiLoading && favouriteLots != null ? "NoData" : ""}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default FavouriteLots;
