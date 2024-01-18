import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getWinLotsListAction } from "../Redux/Actions/Actions";
import { Services } from "../Redux/Actions/Services";
import FixComponents from "./FixComponents";
import Constants, { getDateTime, handleDownload } from "../Redux/Constants";
import DataTable from "react-data-table-component";
import { Table } from "antd";
import { log } from "util";
import {
  downloadExcelFileWinLot,
  getWinLotsByDate,
  winSpecificDateExcel,
} from "../Api/lotsapi";
import { Resizable } from "react-resizable";
import { BiSolidDownload } from "react-icons/bi";
import moment from "moment";
import LotDetailPopup from "./LotDetailPopup/LotDetailPopup";
import { set } from "mongoose";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      style={{ backgroundColor: "#258ec7" }}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function getOrderData(param) {
  return Services.postService("getpaymentid", param).then((response) => {
    if (response.data.sucess) {
      return response.data;
    }
    return false;
  });
}

function WinLotListComponent(props) {
  const [customerDetails, setcustomerDetails] = useState(null);
  const [winLotList, setWinLotList] = useState(null);
  const [processing, setProcessing] = useState(null);

  const [showDetailsModeul, setShowDetailsModeul] = useState(false);
  const [showImageModeul, setShowImageModeul] = useState(false);
  const [showTAndC, setShowTAndC] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [lotDetails, setLotDetails] = useState(null);

  useEffect(() => {
    if (props.loginUserDetailsReducer?.loginUserDetails) {
      setcustomerDetails(props.loginUserDetailsReducer.loginUserDetails);
    }
  }, [props?.loginUserDetailsReducer]);

  useEffect(() => {
    if (customerDetails?.id) {
      props.getWinLotsListAction(customerDetails.id);
    }
  }, [customerDetails]);

  // useEffect(() => {
  //   if (props.getCustimerWinLotsReducer?.customerWinLots) {
  //     setWinLotList(props.getCustimerWinLotsReducer?.customerWinLots);
  //   }
  // }, [props.getCustimerWinLotsReducer]);

  async function showRazorpay(lotId) {
    const __DEV__ = document.domain === "localhost";

    setProcessing(true);
    const src = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!src) {
      console.log("Razorpay script failed to load.");
      // alert('Razorpay script failed to load.');
      return;
    }
    const param = {
      customerId: customerDetails.id,
      lotId: lotId,
    };
    const orderDetails = await getOrderData(param);
    if (orderDetails?.orderDetails.id) {
      const options = {
        key: "rzp_test_8PGJWSObrIzWmn",
        amount: orderDetails.orderDetails.amount_due,
        currency: orderDetails.orderDetails.currency,
        name: orderDetails.custoemrDetais.name,
        description: "Pay for lot",
        image: {},
        order_id: orderDetails.orderDetails.id,
        handler: async function (response) {
          const data = {
            orderCreationId: orderDetails.orderDetails.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          let result = Services.postService("completelotpayment", param).then(
            (response) => {
              if (response.data.sucess) {
                props.getWinLotsListAction(customerDetails.id);
                setProcessing(false);
                return response.data;
              } else {
                console.log(response);
              }
              return false;
            }
          );
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
        prefill: {
          name: orderDetails.lotDetails.title,
          email: orderDetails.custoemrDetais.email,
          contact: orderDetails.custoemrDetais.contactNo,
        },
        notes: {
          address: orderDetails.custoemrDetais.address,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      alert("Something Wrong Happened, Try After Some Time.");
    }
  }

  const columns = [
    {
      name: "Lot No",
      key: (row) => row.lotId,
      selector: (row) => row.lotId,
      style: (row) => ({
        backgroundColor: "#5e72e4",
      }),
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
      style: (row) => ({
        backgroundColor: "rgba(14, 177, 206, 0.6) !important",
      }),
    },
    {
      name: "Price",
      selector: (row) => row.Price,
      style: (row) => ({
        backgroundColor: "rgba(14, 177, 206, 0.6) !important",
      }),
    },
    {
      name: "Start",
      selector: (row) => row.StartDate,
      style: (row) => ({
        backgroundColor: "#f3a4b5",
      }),
    },
    {
      name: "Ended At",
      selector: (row) => row.EndDate,
      style: (row) => ({
        backgroundColor: "#f3a4b5",
      }),
    },
    {
      name: "Seller",
      selector: (row) => row.Seller,
      style: (row) => ({
        backgroundColor: "#11cdef !important",
      }),
    },
    {
      name: "Plant",
      selector: (row) => row.Plant,
      style: (row) => ({
        backgroundColor: "#11cdef !important",
      }),
    },
    {
      name: "Material AT",
      selector: (row) => row.materialLocation,
      style: (row) => ({
        backgroundColor: "#11cdef !important",
      }),
    },
    {
      name: "Status",
      selector: (row) => row.lot_status,
      style: (row) => ({
        backgroundColor: "#5e72e4",
      }),
    },
  ];

  const lotComponent = (lotDetails) => {
    console.log(lotDetails);
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
                Lot No : {lotDetails.lotId}
              </li>
              <li className="nav-item p-0 m-0 bg-translucent-info text-dark border row">
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  Qty : {lotDetails.Quantity || "- -"}
                </div>
                <div className="nav-item m-0 border-right p-0 twoInOne1">
                  @ Rs. {lotDetails.Price || "- -"}/ mt
                </div>
              </li>
              <li className="nav-item p-0 bg-pink border">
                Start Rs. :{lotDetails.StartDate}
              </li>
              <li className="nav-item p-0 bg-pink border">
                Ended At :{lotDetails.EndDate}
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
                Material AT : {lotDetails ? lotDetails.materialLocation : "-"}
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
  const customStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "800",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        color: "black",
      },
    },
  };

  const dateFilter = (startDate, endDate) => {
    setWinLotList([]);
    setTableLoading(true);
    getWinLotsByDate(startDate, endDate, customerDetails?.id).then((res) => {
      if (res.status === 200) {
        setWinLotList(res.data?.win_lots);
        setTableLoading(false);
      } else {
        setWinLotList(props.getCustimerWinLotsReducer?.customerWinLots);
        setTableLoading(false);
      }
    });
  };

  const getToday = () => {
    const startDate = new Date();
    const endDate = new Date();
    setStartDate(moment(startDate).format("YYYY-MM-DD"));
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
    dateFilter(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  };

  const getThisMonth = () => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    setStartDate(moment(startDate).format("YYYY-MM-DD"));
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
    dateFilter(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  };

  const getPreviousMonth = () => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    );
    setStartDate(moment(startDate).format("YYYY-MM-DD"));
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
    dateFilter(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  };

  const getThreeMonth = () => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 3,
      1
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    );
    setStartDate(moment(startDate).format("YYYY-MM-DD"));
    setEndDate(moment(endDate).format("YYYY-MM-DD"));
    dateFilter(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  };

  const [columnsLot, setColumnsLot] = useState([
    {
      title: "Lot No",
      dataIndex: "lotno",
      width: 250,
      // sorter: (a, b) => a.Product.localeCompare(b.Product),
      sorter: (a, b) => a.lotno - b.lotno,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      width: 250,
      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: "Price",
      dataIndex: "Price",
      width: 250,
      sorter: (a, b) => a.Price - b.Price,
    },
    {
      title: "Started At",
      dataIndex: "Start",
      width: 250,
    },
    {
      title: "Ended At",
      dataIndex: "EndedAt",
      width: 250,
    },
    {
      title: "Seller",
      dataIndex: "Seller",
      width: 250,
    },
    {
      title: "Plant",
      dataIndex: "Plant",
      width: 250,
    },
    {
      title: "Material At",
      dataIndex: "MaterialAt",
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: 250,
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: () => <a>Delete</a>,
    // },
  ]);
  const data = winLotList?.map((material) => {
    return {
      lotno: material?.lot_detail?.id,
      Quantity: material?.lot_detail?.Quantity,
      Price: material?.lot_detail?.Price,
      Start: moment(material?.lot_detail?.StartDate).format("DD-MMM-YY h:mma"),
      EndedAt: moment(material?.lot_detail?.EndDate).format("DD-MMM-YY h:mma"),
      Seller: material?.lot_detail?.Seller,
      Plant: material?.lot_detail?.Plant,
      MaterialAt: material?.lot_detail?.materialLocation,
      Status: material?.lot_detail?.lot_status,
    };
  });

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columnsLot];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumnsLot(newColumns);
    };
  const mergeColumns = columnsLot.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const downloadExcel = () => {
    downloadExcelFileWinLot(customerDetails?.id).then((res) => {
      if (res.status === 200) {
        handleDownload(res.data?.file_url);
      }
    });
  };

  const downloadExcelbyDate = () => {
    if (startDate != null && endDate != null) {
      winSpecificDateExcel(customerDetails?.id, startDate, endDate).then(
        (res) => {
          if (res.status === 200) {
            handleDownload(res.data?.file_url);
          }
        }
      );
    }
  };

  const handleRowClick = (record) => {
    setOpen(true);
    setLotDetails(record?.lotno);
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
      {/* <div className="col-12">
        <div className="catagroy">
          <span>
            <h4>Search by Date:</h4>
          </span>
          <form onSubmit={dateFilter}>
            <div className="search_filter">
              <input
                type="date"
                className="form-control mr-4"
                name="startDate"
                id="startDate"
                required
              />
              To:
              <input
                type="date"
                className="form-control ml-4"
                name="endDate"
                id="endDate"
                required
              />
              <button type="submit" className="btn Favourite_btn ml-4">
                Search
              </button>
            </div>
          </form>
        </div>
      </div> */}
      {/* <div className="win_title">Win Lots</div> */}
      {
        props.getCustimerWinLotsReducer.Loading || processing ? (
          <FixComponents />
        ) : (
          <>
            <div className="col-12 p-0">
              <div className=" p-0 m-1">
                {/* <div class="card-header live_LotsDetails_header">
                    Material Details: Live #
                  </div> */}

                {/* <table
                id="example"
                className="table table-striped table-bordered"
              >
                <colgroup>
                  <col style={{ width: "1%" }} />
                  <col style={{ width: "1%" }} />
                  <col style={{ width: "1%" }} />
                  <col style={{ width: "2%" }} />
                  <col style={{ width: "2%" }} />
                  <col style={{ width: "2%" }} />
                  <col style={{ width: "2%" }} />
                  <col style={{ width: "2%" }} />
                  <col style={{ width: "2%" }} />
                </colgroup>
                <thead
                  className="table_head"
                  style={{ background: "#258EC7", color: "white" }}
                >
                  <tr>
                    <th>Lot No</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Start</th>
                    <th>Ended At</th>
                    <th>Seller</th>
                    <th>Plant</th>
                    <th>Material At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="table_body">
                  {winLotList?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.lot_details?.id}</td>
                        <td>{item?.lot_details?.Quantity}</td>
                        <td>{item?.lot_details?.Price}</td>
                        <td>{item?.lot_details?.StartDate}</td>
                        <td>{item?.lot_details?.EndDate}</td>
                        <td>{item?.lot_details?.Seller}</td>
                        <td>{item?.lot_details?.Plant}</td>
                        <td>{item?.lot_details?.materialLocation}</td>
                        <td>{item?.lot_details?.lot_status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */}

                <Table
                  className="table-font"
                  title={() => {
                    return (
                      <>
                        <div className="d-flex justify-content-center" style={{backgroundColor:"rgb(239, 239, 239)"}}>
                          <div className="win_title">Win Lots </div>{" "}
                          {winLotList?.length > 0 ? (
                            <button
                              type="button"
                              className="btn Favourite_btn ml-4"
                              style={{ padding: " 0.325rem 0.25rem" }}
                              onClick={() => {
                                // downloadExcel();
                                downloadExcelbyDate();
                              }}
                            >
                              <BiSolidDownload className="mr-1" size={24} />
                              Download Excel
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="py-3" style={{backgroundColor:"rgb(239, 239, 239)"}}>
                          <div className="catagroy">
                            <span>
                              <h4>Search by Date:</h4>
                            </span>
                            <form
                              onSubmit={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                const startDate =
                                  event.target.elements.startDate.value;
                                setStartDate(startDate);
                                const endDate =
                                  event.target.elements.endDate.value;
                                setStartDate(endDate);
                                dateFilter(startDate, endDate);
                              }}
                            >
                              <div className="search_filter">
                                <input
                                  type="date"
                                  className="form-control "
                                  name="startDate"
                                  id="startDate"
                                  required
                                />
                                To:
                                <input
                                  type="date"
                                  className="form-control "
                                  name="endDate"
                                  id="endDate"
                                  required
                                />
                                <button
                                  type="submit"
                                  className="btn Favourite_btn"
                                >
                                  Search
                                </button>
                              </div>
                            </form>
                            <button
                              type="button"
                              className="btn Favourite_btn "
                              onClick={getToday}
                            >
                              Today
                            </button>
                            <button
                              type="button"
                              className="btn Favourite_btn "
                              onClick={getThisMonth}
                            >
                              This Month
                            </button>
                            {/* <button
                              type="button"
                              className="btn Favourite_btn ml-2"
                              onClick={getPreviousMonth}
                            >
                              Previous Month
                            </button> */}
                            <button
                              type="button"
                              className="btn Favourite_btn "
                              onClick={getThreeMonth}
                            >
                              Last 3 Month
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  }}
                  components={{
                    header: {
                      cell: ResizableTitle,
                    },
                  }}
                  loading={tableLoading}
                  columns={mergeColumns}
                  dataSource={data}
                  pagination={true}
                  bordered={true}
                  onRow={(record) => {
                    return {
                      onClick: () => handleRowClick(record),
                    };
                  }}
                  rowClassName="hoverClass"
                />
              </div>
            </div>
            {/* <DataTable
                columns={columns}
                data={winLotList}
                pagination
                customStyles={customStyles}
                onRowClicked={(lot)=>{
                    setShowDetailsModeul(lot)
                }}
                /> */}
          </>
        )
        // : (
        // winLotList.map((lot) =>
        //     <>
        //         <div className="card border-light my-1" key={lot.id} onClick={() => setShowDetailsModeul(lot)}>
        //             {lotComponent(lot)}
        //         </div>
        //         <hr className="my-3" />
        //     </>
        // <>
        //     <div className="border-light card col-lg-12 col-md-12 col-sm-12 p-0 text-darker" key={lot.id}>
        //         <div className="card-header p-0">
        //             <div className="card-title bg-gradient-lighter h5 mb-0 px-3">#{lot.id}, {lot.title}</div>
        //             {/* <div className="">{lot}</div> */}
        //         </div>
        //         <div className="card-body p-1">
        //             <ul className="nav nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        //                 <li className="nav-item bg-info border">
        //                     Total  : {lot.total_amount}
        //                 </li>
        //                 <li className="nav-item p-0 m-0 bg-translucent-light border row" >
        //                     <div className="nav-item m-0 bg-primary border-right p-0 twoInOne1">Paid  : {lot.paid_amount}</div>
        //                     <div className="nav-item m-0 bg-warning border-right p-0 twoInOne1">Remaining  : {lot.remaining_amount}</div>
        //                 </li>
        //                 {lot.remaining_amount > 0 ?
        //                     <div className="bg-primary btn mt-1 text-white w-100" onClick={() => { showRazorpay(lot.id) }}>Pay : {lot.remaining_amount}</div>
        //                     : <button type="button" className="bg-success text-white btn btn-sm mt-1 w-100" >Payment Complete</button>
        //                 }
        //             </ul>
        //         </div>
        //     </div>
        //     <hr className="my-2" />
        // </>
        // )
        // <FixComponents comp="NoData" />
        // )
      }
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
                                  <td className="w-25">Texes and Duties </td>
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
                        {showDetailsModeul?.material &&
                          showDetailsModeul?.material.map((material) => (
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loginUserDetailsReducer: state.loginUserDetailsReducer,
    getCustimerWinLotsReducer: state.getCustimerWinLotsReducer,
  };
};

const mapDispatchtoProps = {
  getWinLotsListAction: (id) => getWinLotsListAction(id),
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(WinLotListComponent);
