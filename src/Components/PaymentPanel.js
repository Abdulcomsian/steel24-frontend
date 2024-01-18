import React, { useState } from "react";
import { Services } from "../Redux/Actions/Services";
import NevbarComponent from "./NevbarComponents";
import WinLotListComponent from "./WinLotListComponent";
import { connect } from "react-redux";
import ParticipatLotList from "./ParticipatLotList";
import Balance from "./Balance";
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import { Tabs } from "antd";

function PaymentPanel(props) {
  const [showPenal, setShowShowPenal] = useState(0);

  return (
    <div>
      {/* <HomeComponent /> */}

      <div>
        <Tabs
          defaultActiveKey="1"
          centered
          type="card"
          size="large"
          className="custom-tabs"
          style={{ margin: "2%", marginTop: "0% !important" }}
          items={[
            {
              label: "Balance",
              key: "1",
              children: <Balance />,
            },
            // {
            //   label: "Win",
            //   key: "2",
            //   children: <WinLotListComponent />,
            // },
            // {
            //   label: "Participated",
            //   key: "3",
            //   children: <ParticipatLotList />,
            // },
          ]}
        />
        
        {/* <div className="bg-light d-flex justify-content-around mt-2 p-1">
          <button
            className={
              "btn w-100 px-0 " +
              (showPenal == 0 ? "btn-primary" : "bg-lighter")
            }
            onClick={() => setShowShowPenal(0)}
          >
            Balance
          </button>
          <button
            className={
              "btn w-100 px-0 " +
              (showPenal == 1 ? "btn-primary" : "bg-lighter")
            }
            onClick={() => setShowShowPenal(1)}
          >
            Win
          </button>
          <button
            className={
              "btn w-100 px-0 " +
              (showPenal == 2 ? "btn-primary" : "bg-lighter")
            }
            onClick={() => setShowShowPenal(2)}
          >
            Participated
          </button>
        </div>
        <div className="container-fluid pb-7">
          {showPenal == 0 && <Balance />}
          {showPenal == 1 && <WinLotListComponent />}
          {showPenal == 2 && <ParticipatLotList />}
        </div> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginUserDetailsReducer: state.loginUserDetailsReducer,
  };
};
const mapDispatchtoProps = {};
export default connect(mapStateToProps, mapDispatchtoProps)(PaymentPanel);
