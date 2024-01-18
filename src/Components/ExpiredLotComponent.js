import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getExpiredLotsListAction,
  participoteOnExpireLotAction,
  getCategoriesAction,
  clearParticipateInExpireLotLotStatusCleanAction,
} from "../Redux/Actions/Actions";
import { connect } from "react-redux";
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import ShowCurrentTime from "./ShowCurrentTime";
import FixComponents from "./FixComponents";
import Constants from "../Redux/Constants";
import { getExpiredLots } from "../Api/lotsapi";

function ExpiredLotComponent(props) {
  const [expiredLotsList, setExpiredLotsList] = useState(null);
  const [filteredExpiredLotList, setFilteredExpiredLotList] = useState(null);
  const [selectedCategori, setSelectedCategori] = useState(null);
  const [showImageModeul, setShowImageModeul] = useState(false);
  const [showDetailsModeul, setShowDetailsModeul] = useState(false);
  const [showTAndC, setShowTAndC] = useState(false);

  const navigate = useNavigate();
  // api request
  useEffect(() => {
    getExpiredLots().then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        setFilteredExpiredLotList(res.data?.expiredLots);
      }
    });
    // props.getExpiredLotsListAction()
    // props.getCategoriesAction()
  }, []);

  // set expired lot Responce
  useEffect(() => {
    if (props.getExpiredLotsListReducer.expiredLotsList) {
      setExpiredLotsList(props.getExpiredLotsListReducer.expiredLotsList);
      setFilteredExpiredLotList(
        props.getExpiredLotsListReducer.expiredLotsList
      );
    }
  }, [props.getExpiredLotsListReducer.expiredLotsList]);

  // Participat on expired lot
  const bidOnLot = (lot) => {
    if (props.loginUserDetailsReducer?.loginUserDetails.id) {
      props.participoteOnExpireLotAction({
        customerId: props.loginUserDetailsReducer?.loginUserDetails.id,
        lotid: lot.lot.id,
        bidPrice: Number(lot.lot.participate_fee) + Number(100),
      });
    }
  };

  // set selected Categori lots
  useEffect(() => {
    if (selectedCategori) {
      if (expiredLotsList) {
        setFilteredExpiredLotList(
          expiredLotsList.filter((lot, index) => {
            if (lot.lot.categoryId === selectedCategori) {
              return lot;
            }
          })
        );
      }
    }
  }, [selectedCategori]);

  // Responce Of participat on  expired lot
  useEffect(() => {
    if (props.participoteOnExpireLotReducer.participoteOnExpireLot) {
      navigate("/livelotdetails/" + showDetailsModeul.lot.id);
      setShowDetailsModeul(false);
    } else if (props.participoteOnExpireLotReducer.Error) {
      alert(props.participoteOnExpireLotReducer.Error.message);
      props.clearParticipateInExpireLotLotStatusCleanAction();
    }
  }, [props.participoteOnExpireLotReducer]);

  // one lot Component
  const expiredlotControler = (lotDetails) => {
    return (
      <>
        <div className="card-header bg-translucent-warning px-4 text-dark">
          {lotDetails.title}
        </div>
        <div className="card-body p-1">
          <div className="nav-wrapper py-0">
            <ul
              className="nav nav-pills nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              role="tablist"
            >
              <li className="nav-item p-0 m-0 bg-primary text-white border">
                Lot No :{/* {lotDetails.lot ? lotDetails.lot.id : '-'} */}
              </li>
              <li className="nav-item p-0 m-0 bg-translucent-info text-dark border row">
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  Qty : {lotDetails?.Quantity || "- -"}
                </div>
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  @ Rs. {lotDetails?.Price || "- -"}/ mt
                </div>
              </li>
              <li className="nav-item p-0 bg-pink text-dark  m-0 border">
                Start Rs. :{lotDetails.StartDate}
              </li>
              <li className="nav-item p-0 bg-pink text-dark  m-0 border">
                Ended At :{lotDetails.EndDate}
              </li>

              <li className="nav-item p-0 bg-primary text-white m-0 border">
                Status : {lotDetails ? lotDetails.lot_status : "-"}
              </li>
            </ul>
          </div>
          <div className="nav-wrapper my-2 py-0 text-dark">
            <ul
              className="nav nav-pills nav-fill flex-column flex-md-row"
              id="tabs-icons-text"
              role="tablist"
            >
              <li className="nav-item p-0 bg-info m-0 border">
                Seller. : {lotDetails ? lotDetails.Seller : "- -"}
              </li>
              <li className="nav-item p-0 bg-info m-0 border">
                Made In : {lotDetails ? lotDetails.Plant : "-"}
              </li>
              <li className="nav-item p-0 bg-info m-0 border">
                Material At : {lotDetails ? lotDetails.materialLocation : "-"}
              </li>
              {props.loginUserDetailsReducer?.loginUserDetails?.status ? (
                <li className="nav-item p-0  border">
                  <button
                    type="button"
                    className=" btn btn-sm bg-primary text-white btn-tooltip w-100"
                  >
                    {" "}
                    Bid Now
                  </button>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </>
    );
  };

  console.log(showImageModeul);
  return (
    <div className="">
      <HomeComponent />
      <div className="container-fluid mb-7">
        <div className="border-light card shadow ">
          <div className="p-0 m-2">
            <div className=" alert align-items-center bg-warning d-flex justify-content-between p-0 pl-3">
              <h5 className="m-0 text-white">Expired Lots</h5>
              {<ShowCurrentTime />}
            </div>
            <div className="alert bg-default d-flex justify-content-around p-0 mb-3">
              {props.getCategoriesReducer?.categoriList &&
                props.getCategoriesReducer?.categoriList.map((categori) => (
                  <button
                    className={
                      "btn btn-sm m-0 text-white px-4 m-1 " +
                      (categori.id === selectedCategori
                        ? "bg-gradient-danger"
                        : "bg-gradient-gray")
                    }
                    key={categori.id}
                    onClick={() => {
                      setSelectedCategori(categori.id);
                    }}
                  >
                    {" "}
                    {categori.title}
                  </button>
                ))}
            </div>
            {props.getExpiredLotsListReducer.Error && (
              <div
                className="alert alert-default bg-warning fade show"
                role="alert"
              >
                <span className="alert-inner--text">
                  <strong>
                    {props.getExpiredLotsListReducer.Error.message}
                  </strong>
                </span>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="card-body p-0">
              {
                filteredExpiredLotList ? (
                  filteredExpiredLotList.map((lot) => (
                    <>
                      <div
                        className="card border-light my-1"
                        key={lot.id}
                        onClick={() => setShowDetailsModeul(lot)}
                      >
                        {expiredlotControler(lot)}
                      </div>
                      <hr className="my-3" />
                    </>
                  ))
                ) : (
                  <FixComponents comp="NoData" />
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Expired Lot Details Moel */}
      <div
        className={"modal fade " + (showDetailsModeul && "show")}
        id="auction_Details"
        tabIndex="1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              {showDetailsModeul && (
                <div className="card shadow border-0 mb-0">
                  <div className="card-header bg-translucent-warning text-default d-flex justify-content-between">
                    Lot #{showDetailsModeul.id} is not sold.
                    <button
                      className="btn btn-sm text-darker"
                      onClick={() => setShowDetailsModeul(false)}
                    >
                      X
                    </button>
                  </div>
                  <div className="card-body ">
                    <ul className="text-center list-unstyled text-darker">
                      <li className="bg-warning border mb-1">
                        {" "}
                        This lot is not soled{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Lot no : {showDetailsModeul.id}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Quantity :{showDetailsModeul.Quantity}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Start date : {showDetailsModeul.StartDate}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        End date : {showDetailsModeul.EndDate}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Plant : {showDetailsModeul.Plant}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Palce : {showDetailsModeul.materialLocation}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Price : {showDetailsModeul.Price}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Participate fee :{" "}
                        {showDetailsModeul.participate_fee}{" "}
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            window.confirm(
                              "Do You Want To Restart This Lot with Participate Fee : " +
                                showDetailsModeul.participate_fee +
                                " And Bid Of " +
                                (Number(showDetailsModeul.Price) +
                                  Number(100))
                            ) && bidOnLot(showDetailsModeul);
                          }}
                          className="btn  bg-primary text-white btn-tooltip mb-1"
                        >
                          {" "}
                          Bid For Lot With{" "}
                          {Number(showDetailsModeul.participate_fee) +
                            Number(100)}{" "}
                        </button>
                      </li>
                    </ul>
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="p-1">
                            <button
                              type="button"
                              className="btn btn-sm bg-lighter btn-tooltip"
                              onClick={() => setShowTAndC(!showTAndC)}
                            >
                              {" "}
                              T&C
                            </button>
                          </th>
                          <th className="p-1">
                            Terms & Conditions : Please read the following
                            details carefully.
                          </th>
                        </tr>
                      </thead>
                      {showTAndC && (
                        <>
                          {showDetailsModeul?.lotTerms ? (
                            <>
                              <tr className="p-1">
                                <td className="w-25"> Payment Terms </td>
                                <td className="w-75">
                                  {showDetailsModeul.lotTerms.Payment_Terms}{" "}
                                </td>
                              </tr>
                              <tr className="p-1">
                                <td className="w-25"> Price Basis </td>
                                <td className="w-75">
                                  {showDetailsModeul.lotTerms.Price_Bases}{" "}
                                </td>
                              </tr>

                              <tr className="p-1">
                                <td className="w-25"> Texes and Duties </td>
                                <td className="w-75">
                                  {showDetailsModeul.lotTerms.Texes_and_Duties}{" "}
                                </td>
                              </tr>

                              <tr className="p-1">
                                <td className="w-25"> Commercial terms </td>
                                <td className="w-75">
                                  {showDetailsModeul.lotTerms.Commercial_Terms}{" "}
                                </td>
                              </tr>

                              <tr className="p-1">
                                <td className="w-25"> Test certificate </td>
                                <td className="w-75">
                                  {showDetailsModeul.lotTerms.Test_Certificate}{" "}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <FixComponents comp="NoData" />
                          )}
                        </>
                      )}
                    </table>
                    <table className="table">
                      <thead>
                        <tr>
                          <th> Product</th>
                          <th> Thickness</th>
                          <th> Width</th>
                          <th> Length</th>
                          <th> Weight</th>
                          <th> Grade</th>
                          <th> Remark</th>
                          <th> images</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showDetailsModeul?.materialilist &&
                          showDetailsModeul?.materialilist.map((material) => (
                            <tr>
                              <td> {material["Product"]}</td>
                              <td> {material["Thickness"]}</td>
                              <td> {material["Width"]}</td>
                              <td> {material["Length"]}</td>
                              <td> {material["Weight"]}</td>
                              <td> {material["Grade"]}</td>
                              <td> {material["Remark"]}</td>
                              <td>
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-sm mr-3"
                                  onClick={() => setShowImageModeul(material)}
                                >
                                  Image
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={"modal fade " + (showImageModeul && "show")}
        id="auction_Details"
        tabIndex="1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card shadow border-0 mb-0">
                <div className="card-header bg-blue text-default d-flex justify-content-between">
                  <h6 className="text-white">{showImageModeul["Product"]}</h6>
                  <button
                    className="btn btn-sm text-darker"
                    onClick={() => setShowImageModeul(false)}
                  >
                    X
                  </button>
                </div>
                <div className="card-body d-flex justify-content-around">
                  <img
                    src={
                      Constants.SERVERURL + "files/" + showImageModeul["images"]
                    }
                    className="m-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    getExpiredLotsListReducer: state.getExpiredLotsListReducer,
    loginUserDetailsReducer: state.loginUserDetailsReducer,
    participoteOnExpireLotReducer: state.participoteOnExpireLotReducer,
    getCategoriesReducer: state.getCategoriesReducer,
  };
};

const mapDispatchtoProps = {
  getExpiredLotsListAction: () => getExpiredLotsListAction(),
  participoteOnExpireLotAction: (details) =>
    participoteOnExpireLotAction(details),
  getCategoriesAction: () => getCategoriesAction(),
  clearParticipateInExpireLotLotStatusCleanAction: () =>
    clearParticipateInExpireLotLotStatusCleanAction(),
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(ExpiredLotComponent);
