import React, { useEffect, useState } from "react";
import {
  getSoldLotsListAction,
  getCategoriesAction,
} from "../Redux/Actions/Actions";
import { connect } from "react-redux";
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import ShowCurrentTime from "./ShowCurrentTime";
import FixComponents from "./FixComponents";
import Constants from "../Redux/Constants";
import { getSoldLots } from "../Api/lotsapi";

function SoledLotsComponent(props) {
  const [soledLotsList, setSoledLotsList] = useState(null);
  const [filteredSoledLots, setFilteredSoledLots] = useState(null);
  const [selectedCategori, setSelectedCategori] = useState(null);

  const [showDetailsModeul, setShowDetailsModeul] = useState(false);
  const [showImageModeul, setShowImageModeul] = useState(false);
  const [showTAndC, setShowTAndC] = useState(false);

  // api request
  useEffect(() => {
    getSoldLots().then((res) => {
      if (res.status == 200 && res.data?.success === true) {
        console.log(res.data);
        setFilteredSoledLots(res.data?.soldLots);
      }
    });
    // props.getSoldLotsListAction()
    // props.getCategoriesAction()
  }, []);

  // set soled lot Responce
  useEffect(() => {
    if (props.getSoldLotsListReducer.soldLotsList) {
      setFilteredSoledLots(props.getSoldLotsListReducer.soldLotsList);
      setSoledLotsList(props.getSoldLotsListReducer.soldLotsList);
    }
  }, [props.getSoldLotsListReducer]);

  // set selected Categori lots
  useEffect(() => {
    if (selectedCategori) {
      if (soledLotsList) {
        setFilteredSoledLots(
          soledLotsList.filter((lot, index) => {
            if (lot.lot.categoryId === selectedCategori) {
              return lot;
            }
          })
        );
      }
    }
  }, [selectedCategori]);

  // one lot Component
  const lotComponent = (lotDetails) => {
    return (
      <>
        <div className="card-header bg-translucent-success text-darker px-4">
          {" "}
          {lotDetails.title}
        </div>
        <div className="card-body p-1">
          <div className="nav-wrapper py-0">
            <ul
              className="nav nav-fill flex-column flex-md-row text-dark"
              id="tabs-icons-text"
              role="tablist"
            >
              <li className="nav-item p-0 bg-primary text-white border ">
                Lot No : {lotDetails ? lotDetails.id : "-"}
              </li>
              <li className="nav-item p-0 m-0 bg-translucent-info text-dark border row">
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  Qty : {lotDetails?.Quantity || "- -"}
                </div>
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  @ Rs. {lotDetails?.Price || "- -"}/ mt
                </div>
              </li>
              <li className="nav-item p-0 bg-pink border">
                Start Rs. :{lotDetails.StartDate}
              </li>
              <li className="nav-item p-0 bg-pink border">
                Ended At :{lotDetails.EndDate}
              </li>
              <li className="nav-item p-0 bg-success border">
                Win By :{" "}
                {lotDetails.customerVisible && lotDetails.customername
                  ? lotDetails.customername
                  : "Unknown Customer"}
              </li>
            </ul>
          </div>
          <div className="nav-wrapper my-2 py-0">
            <ul
              className="nav nav-fill flex-column flex-md-row text-dark"
              id="tabs-icons-text"
              role="tablist"
            >
              <li className="nav-item p-0 bg-info  border">
                Seller : {lotDetails ? lotDetails.Seller : "- -"}
              </li>
              <li className="nav-item p-0 bg-info  border">
                Plant : {lotDetails ? lotDetails.Plant : "-"}
              </li>
              <li className="nav-item p-0 bg-info  border">
                Material AT :{" "}
                {lotDetails ? lotDetails.materialLocation : "-"}
              </li>
              <li className="nav-item p-0 bg-primary text-white border">
                Status : {lotDetails ? lotDetails.lot_status : "-"}
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  console.log(showDetailsModeul);
  return (
    <div className="">
      <HomeComponent />
      <div className="container-fluid mb-7">
        <div className="border-light card shadow ">
          <div className="p-0 m-2 font-weight-bold">
            <div className="alert align-items-center bg-success d-flex justify-content-between p-0 pl-3">
              <h5 className="m-0 text-white">Sold Lots</h5>
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

            {props.getSoldLotsListReducer.Error && (
              <div
                className="alert alert-default bg-warning fade show"
                role="alert"
              >
                <span className="alert-inner--text">
                  <strong>{props.getSoldLotsListReducer.Error.message}</strong>
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
                filteredSoledLots ? (
                  filteredSoledLots?.map((lot) => (
                    <>
                      <div
                        className="card border-light my-1"
                        key={lot.id}
                        onClick={() => setShowDetailsModeul(lot)}
                      >
                        {lotComponent(lot)}
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
{console.log("showDetailsModeul",showDetailsModeul)}
      {/* Soled Lot Details Moel */}
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
                  <div className="card-header bg-success  text-default d-flex justify-content-between">
                    Lot #{showDetailsModeul.id} is sold.
                    <button
                      className="btn btn-sm text-darker"
                      onClick={() => setShowDetailsModeul(false)}
                    >
                      X
                    </button>
                  </div>
                  <div className="card-body ">
                    <ul className="text-center list-unstyled text-darker">
                      {showDetailsModeul?.customerVisible ? (
                        <li className="bg-success border mb-1">
                          {" "}
                          Winner : {showDetailsModeul.customername}
                        </li>
                      ) : (
                        <li className="bg-success  border mb-1">
                          {" "}
                          SOLD TO HIGHEST BIDDER{" "}
                        </li>
                      )}
                      <li className="bg-light border mb-1">
                        {" "}
                        Plant :{showDetailsModeul.Plant}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Lot no : {showDetailsModeul.id} , Qty :
                        {showDetailsModeul.Quantity}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Sold price : {showDetailsModeul.finalmount}{" "}
                      </li>
                      <li className="bg-light border mb-1">
                        {" "}
                        Sold date : {showDetailsModeul.EndDate}{" "}
                      </li>
                      {/* {showDetailsModeul?.lot?.customerVisible ?
                                                <li className="bg-light border mb-1" > Compny name : {showDetailsModeul.lot.compnyName} </li>
                                                : ''
                                            } */}
                    </ul>
                    <table className="table d-flex justify-content-center ">
                      <thead>
                        <tr>
                          <th className="p-1">
                            <button
                              type="button"
                              className="btn btn-sm bg-lighter btn-tooltip"
                              onClick={() => setShowTAndC(!showTAndC)}
                            >
                              {" "}
                              Terms & Condition
                            </button>
                          </th>
                          <th className="p-1">
                            Terms & Condition : Please read the following
                            details carefully.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
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
                                    {
                                      showDetailsModeul.lotTerms
                                        .Texes_and_Duties
                                    }{" "}
                                  </td>
                                </tr>

                                <tr className="p-1">
                                  <td className="w-25"> Commercial terms </td>
                                  <td className="w-75">
                                    {
                                      showDetailsModeul.lotTerms
                                        .Commercial_Terms
                                    }{" "}
                                  </td>
                                </tr>

                                <tr className="p-1">
                                  <td className="w-25"> Test certificate </td>
                                  <td className="w-75">
                                    {
                                      showDetailsModeul.lotTerms
                                        .Test_Certificate
                                    }{" "}
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <FixComponents comp="NoData" />
                            )}
                          </>
                        )}
                      </tbody>
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
      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginUserDetailsReducer: state.loginUserDetailsReducer,
    getSoldLotsListReducer: state.getSoldLotsListReducer,
    getCategoriesReducer: state.getCategoriesReducer,
  };
};

const mapDispatchtoProps = {
  getSoldLotsListAction: () => getSoldLotsListAction(),
  getCategoriesAction: () => getCategoriesAction(),
};

export default connect(mapStateToProps, mapDispatchtoProps)(SoledLotsComponent);
