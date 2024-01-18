import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { isAllradyLoginAction, logOutAction } from "../Redux/Actions/Actions";
import NotAccess from "../assets/images/access-denied.jpg";
import ExpiredLots from "./ExpiredLots/ExpiredLots";
import FavouriteLots from "./FavouriteLots/FavouriteLots";
import FooterComponent from "./FooterComponent";
import Livelots from "./LiveLots/Livelots";
import LivelotsDetails from "./LiveLots/LivelotsDetails";
import PaymentPanel from "./PaymentPanel";
import ProductPictures from "./ProductPictures/ProductPictures";
import STA from "./STA/STA";
import Sold from "./Sold/Sold";
import TimeAndUserDetails from "./TimeAndUserDetails/TimeAndUserDetails";
import Topbar from "./TopBar/Topbar";
import UpcomingAndLive from "./UpcomingAndLive/UpcomingAndLive";
import UpcomingLot from "./UpcomingLot/UpcomingLot";
import UserProfileController from "./UserProfileController";
import WinLotListComponent from "./WinLotListComponent";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="not-found">
        <h5>Page Not Found</h5>
      </div>
    </React.Fragment>
  );
};

const AccessDenied = () => {
  return (
    <React.Fragment>
      <div className="access_denied">
        <div>
          <img
            src={NotAccess}
            className="pb-2"
            style={{ height: "300px", width: "auto" }}
          />
          <p>Please add your profile details for verification.</p>
        </div>
      </div>
    </React.Fragment>
  );
};

function Dashboard(props) {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="wrapper">
        <div class="overlay"></div>
        {/* <Sidebar /> */}
        <div className="main-panel">
          <div className="topbar-wrapper">
            <Topbar />
          </div>
          <div className="main-content">
            <div className="main_container">
              {window.location.pathname === "/dashboard/Payment" ||
              window.location.pathname === "/dashboard/live/LiveLotDetails" ? (
                <></>
              ) : (
                <>
                  <TimeAndUserDetails />
                </>
              )}
              <Routes>
                <Route path="/" Component={() => <UpcomingAndLive />} />
                {userDetails?.isApproved ? (
                  <>
                    <Route exact path="live" Component={() => <Livelots />} />
                    <Route exact path="Sold" Component={() => <Sold />} />
                    <Route
                      exact
                      path="Expired"
                      Component={() => <ExpiredLots />}
                    />
                    <Route exact path="Payment" element={<PaymentPanel />} />
                    <Route exact path="Favourite" element={<FavouriteLots />} />
                    <Route exact path="Upcoming" element={<UpcomingLot />} />

                    <Route exact path="Win" element={<WinLotListComponent />} />
                    <Route exact path="STA" element={<STA />} />
                    <Route
                      exact
                      path="/live/LiveLotDetails"
                      Component={() => <LivelotsDetails />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="*" element={<AccessDenied />} />
                  </>
                )}
                <Route exact path="Pictures" element={<ProductPictures />} />
                <Route
                  exact
                  path="userprofile"
                  element={<UserProfileController />}
                />
              </Routes>
            </div>
            <FooterComponent />
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

export default connect(mapStateToProps, mapDispatchtoProps)(Dashboard);
