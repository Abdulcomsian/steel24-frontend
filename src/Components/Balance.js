import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCustomerBalanceAction } from "../Redux/Actions/Actions";
import { Services } from "../Redux/Actions/Services";
import FixComponents from "./FixComponents";
import DataTable from "react-data-table-component";
import { Table } from "antd";
import { Tab } from "bootstrap";
import { Resizable } from "react-resizable";
import { downloadBalanceExcel, getBalanceByDate } from "../Api/lotsapi";
import { getDate, handleDownload } from "../Redux/Constants";
import moment from "moment";
import { BiSolidDownload } from "react-icons/bi";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      style={{ backgroundColor: "rgb(37, 142, 199)" }}
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
  return Services.postService("getidforbalance", param).then((response) => {
    if (response.data.sucess) {
      return response.data;
    }
    return false;
  });
}

function Balance(props) {
  const [addBalance, setAddBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(null);
  const [showError, setshowError] = useState(null);
  const [customerDetails, setcustomerDetails] = useState(null);
  const [balaceList, setBalaceList] = useState([]);
  const [processing, setProcessing] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [debit, setDebit] = useState(0);
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    if (props.loginUserDetailsReducer?.loginUserDetails) {
      setcustomerDetails(props.loginUserDetailsReducer.loginUserDetails);
    }
  }, [props?.loginUserDetailsReducer]);

  useEffect(() => {
    if (customerDetails?.id) {
      props.getCustomerBalanceAction(customerDetails.id);
    }
  }, [customerDetails]);

  // useEffect(() => {
  //   if (props.getCustomerBalanceReducer?.customerBalance?.balanceHistory) {
  //     setBalaceList(
  //       props.getCustomerBalanceReducer?.customerBalance?.balanceHistory
  //     );
  //   }
  // }, [props.getCustomerBalanceReducer]);

  async function showRazorpay() {
    // if (Number(newBalance) >= 3000) {
    setProcessing(true);
    const __DEV__ = document.domain === "localhost";
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
      amount: newBalance,
    };
    const orderDetails = await getOrderData(param);
    const test = "rzp_test_8PGJWSObrIzWmn";
    const live = "rzp_live_vbnXOK5uVRzlvD";
    if (orderDetails?.orderDetails.id) {
      const options = {
        key: live,
        amount: orderDetails.orderDetails.amount,
        currency: orderDetails.orderDetails.currency,
        name: orderDetails.custoemrDetais.name,
        description: "Balance Payment.",
        image: {},
        order_id: orderDetails.orderDetails.id,
        checkout: {
          method: {
            netbanking: "1",
            card: "1",
            upi: "1",
          },
        },
        handler: async function (response) {
          console.log("response", response);
          const data = {
            orderCreationId: orderDetails.orderDetails.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          let result = Services.postService("addcustomerbalance", param).then(
            (response) => {
              if (response.data.sucess) {
                props.getCustomerBalanceAction(customerDetails.id);
                setAddBalance(null);
                setProcessing(null);
                return response.data;
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
          name: orderDetails.custoemrDetais.name,
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
    // } else {
    //   setshowError("Minimum balance must be 3000.");
    // }
  }

  const columns = [
    {
      name: "Date",
      selector: (row) => row.created_at,
      style: (row) => ({
        backgroundColor: "#11cdef",
      }),
    },
    {
      name: "Action",
      selector: (row) => row.action,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.action === "credit" || row.action === "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#4BB543",
          }),
        },
        {
          when: (row) =>
            row.action !== "credit" && row.action !== "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#fb6340",
          }),
        },
      ],
    },
    {
      name: "Lot",
      selector: (row) =>
        `${row.lotid ? row.lotid : ""}${
          row.lottitle ? "," + row.lottitle : ""
        }`,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.action !== "credit" && row.action === "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#4BB543",
          }),
        },
        {
          when: (row) =>
            row.action !== "credit" && row.action !== "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#fb6340 ",
          }),
        },
      ],
    },
    {
      name: "Amount",
      selector: (row) => row.actionAmount,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.action === "credit" || row.action === "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#4BB543",
          }),
        },
        {
          when: (row) =>
            row.action !== "credit" && row.action !== "Participate Fees Back",
          style: (row) => ({
            backgroundColor: "#fb6340",
          }),
        },
      ],
    },
    {
      name: "Final Amount",
      selector: (row) => row.finalAmount,
      style: (row) => ({
        backgroundColor: "#5e72e4",
        color: "white",
        fontSize: "14px",
      }),
    },
  ];
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

  const [tableColumns, setTableColumns] = useState([
    {
      title: "Date",
      dataIndex: "Date",
      width: 400,
    },
    {
      title: "Action",
      dataIndex: "Action",
      sorter: (a, b) => a.Lot.localeCompare(b.Lot),
      width: 400,
    },
    {
      title: "Title",
      dataIndex: "lottitle",
      width: 400,
    },
    {
      title: "Credit",
      dataIndex: "Credit",
      sorter: (a, b) => a.Credit - b.Credit,
      width: 400,
    },
    {
      title: "Debit",
      dataIndex: "Debit",
      sorter: (a, b) => a.Debit - b.Debit,
      width: 400,
    },
    // {
    //   title: "Amount",
    //   dataIndex: "Amount",
    //   sorter: (a, b) => a.Amount - b.Amount,
    //   width: 400,
    // },
    {
      title: "Balance",
      dataIndex: "finalAmount",
      sorter: (a, b) => a.finalAmount - b.finalAmount,
      width: 400,
    },
  ]);

  useEffect(() => {
    setTableData(
      balaceList?.map((item) => {
        return {
          id: item.id,
          Date: moment(item.date).format("DD-MMM-YY h:mma"),
          Action: item.action,
          lottitle: item.lot_title,
          Debit:
            item.action === "Participate Fees"
              ? parseInt(item.actionAmount).toLocaleString()
              : "",
          Credit:
            item.action === "Return Participation Fee" ||
            item.action === "credit"
              ? parseInt(item.actionAmount).toLocaleString()
              : "",
          // Amount: item.actionAmount,
          finalAmount: parseInt(item.actionAmount).toLocaleString(),
        };
      })
    );
  }, [balaceList]);

  useEffect(() => {
    let debit = 0;
    let credit = 0;
    setDebit(
      tableData?.reduce((accumulator, item) => {
        if (item?.Debit) {
          return accumulator + parseInt((item?.Debit).replace(/,/g, ""), 10);
        }
        return accumulator;
      }, debit)
    );

    setCredit(
      tableData?.reduce((accumulator, item) => {
        if (item?.Credit) {
          return accumulator + parseInt((item?.Credit).replace(/,/g, ""), 10);
        }
        return accumulator;
      }, credit)
    );
  }, [tableData]);

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...tableColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setTableColumns(newColumns);
    };
  const mergeColumns = tableColumns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const dateFilter = (startDate, endDate) => {
    setBalaceList([]);
    setTableLoading(true);
    getBalanceByDate(startDate, endDate, customerDetails?.id).then((res) => {
      if (res.status === 200) {
        setBalaceList(res.data?.Customer_Balances);
        setTableLoading(false);
      } else {
        setBalaceList(props.getCustimerWinLotsReducer?.customerWinLots);
        setTableLoading(false);
      }
    });
  };

  const getToday = () => {
    const startDate = new Date();
    const endDate = new Date();
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
    dateFilter(
      moment(startDate).format("YYYY-MM-DD"),
      moment(endDate).format("YYYY-MM-DD")
    );
  };

  const downloadExcel = () => {
    if (tableData != null) {
      downloadBalanceExcel(tableData).then((res) => {
        if (res.status === 200) {
          handleDownload(res.data?.file_url);
        }
      });
    }
  };

  return (
    <>
      {props.getCustomerBalanceReducer.Loading || processing ? (
        <FixComponents />
      ) : (
        <>
          <h3>Balance </h3>
          <div className="card col-lg-12 col-md-12 col-sm-12 border-light p-0 my-2">
            <div className="card-header bg-light h6 d-flex justify-content-between ">
              <span className="card-title m-0">
                Balance :{" "}
                {
                  props.getCustomerBalanceReducer?.customerBalance?.lastBalance
                    ?.finalAmount
                }
              </span>
              <button
                type="button"
                className="btn btn-sm btn-success btn-tooltip"
                data-animation="true"
                onClick={() => {
                  setAddBalance(!addBalance);
                }}
              >
                Add Balance
              </button>
            </div>
          </div>
          {
            addBalance ? (
              <div className="card col-lg-12 col-md-12 col-sm-12 border-light p-0 my-2">
                <div className="card-header bg-light h6  ">
                  <h5 className="d-block font-weight-bold ">Add Balance</h5>
                </div>
                <div className="card-body ">
                  <div className="form-group">
                    {showError && (
                      <div
                        className="alert alert-default bg-warning fade show w-100"
                        role="alert"
                      >
                        <span className="alert-inner--text">
                          <strong>{showError}</strong>
                        </span>
                      </div>
                    )}
                    <input
                      type="text"
                      name="newBalance"
                      className="form-control"
                      value={newBalance}
                      onChange={(event) => {
                        setNewBalance(event.target.value);
                        setshowError(null);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn  btn-primary btn-tooltip"
                    data-animation="true"
                    onClick={() => {
                      showRazorpay();
                    }}
                  >
                    Add Balance
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-tooltip"
                    data-animation="true"
                    onClick={() => {
                      setAddBalance(!addBalance);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="py-3">
                  <div className="catagroy">
                    <span>
                      <h4>Search by Date:</h4>
                    </span>
                    <form
                      onSubmit={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        const startDate = event.target.elements.startDate.value;
                        const endDate = event.target.elements.endDate.value;
                        dateFilter(startDate, endDate);
                      }}
                    >
                      <div className="search_filter">
                        <input
                          type="date"
                          className="form-control"
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
                        <button type="submit" className="btn Favourite_btn ">
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
                    {tableData?.length > 0 ? (
                      <button
                        type="button"
                        className="btn Favourite_btn ml-2"
                        style={{ padding: " 0.49rem 1.25rem" }}
                        onClick={() => {
                          downloadExcel();
                        }}
                      >
                        <BiSolidDownload className="mr-1" size={24} />
                        Download Excel
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {/* <div>
                <DataTable
                  columns={columns}
                  data={balaceList}
                  pagination
                  customStyles={customStyles}
                />
              </div> */}

                {/* <div class="card-header live_LotsDetails_header">
                    Material Details: Live #
                  </div> */}
                <Table
                  className="table-font"
                  loading={tableLoading}
                  components={{
                    header: {
                      cell: ResizableTitle,
                    },
                  }}
                  columns={mergeColumns}
                  dataSource={tableData.sort((a, b) => b?.id - a?.id)}
                  bordered={true}
                  pagination={{
                    showSizeChanger: false,
                  }}
                  footer={
                    tableData?.length > 0
                      ? () => {
                          return (
                            <>
                              <div
                                className=" Total_Debit"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                }}
                              >
                                <div style={{ width: "35%" }}>
                                  <div className="debitNcredit">
                                    <h5 className="col-4">Total Debit:</h5>
                                    <h5 className="col-4">
                                      {debit.toLocaleString()}
                                    </h5>
                                  </div>
                                  <div className="debitNcredit">
                                    <h5 className="col-4">Total Credit:</h5>
                                    <h5 className="col-4">
                                      {credit.toLocaleString()}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      : false
                  }
                />
              </>
            )
            // : (
            //   <div
            //     className="alert alert-default bg-warning fade show w-100"
            //     role="alert"
            //   >
            //     <span className="alert-inner--text">
            //       <strong>Balance Not Availabel.</strong>
            //     </span>
            //     <button
            //       type="button"
            //       className="close"
            //       data-dismiss="alert"
            //       aria-label="Close"
            //     >
            //       <span aria-hidden="true">&times;</span>
            //     </button>
            //   </div>
            // )
          }
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    loginUserDetailsReducer: state.loginUserDetailsReducer,
    getCustomerBalanceReducer: state.getCustomerBalanceReducer,
  };
};
const mapDispatchtoProps = {
  getCustomerBalanceAction: (id) => getCustomerBalanceAction(id),
};
export default connect(mapStateToProps, mapDispatchtoProps)(Balance);
