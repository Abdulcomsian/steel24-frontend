import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  logOutAction,
  isAllradyLoginAction,
  getUserDetailsAction,
  requestAtivateAccount,
} from "../Redux/Actions/Actions";
import appLogo from "../images/appLogo.png";

function NevbarComponent(props) {
  const [showManu, onShowManu] = useState(false);
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

  const sendRequest = () => {
    if (userDetails) {
      props.requestAtivateAccount(userDetails.id);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-default p-0">
        <div className="container">
          <Link className="navbar-brand  position-sticky top-0 " to={"/"}>
            <img src={appLogo} style={{ width: "150px", height: "50px" }} />
          </Link>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-primary"
            aria-controls="navbar-primary"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbar-primary">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-12 collapse-close">
                  <button
                    type="button"
                    className="navbar-toggler collapsed"
                    data-toggle="collapse"
                    data-target="#navbar-primary"
                    aria-controls="navbar-primary"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
            <ul className="navbar-nav ml-lg-auto">
              {props.loginUserDetailsReducer.loginUserDetails ? (
                <li className="nav-item">
                  <Link to="/Dashboard" className="nav-link navbar_li">
                    Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    to={"/login"}
                    className="btn btn-block btn-default h-100 "
                    style={{background:"black",border:"none"}}
                  >
                    Login
                  </Link>
                </li>
              )}
              {/* {props.loginUserDetailsReducer.loginUserDetails ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="javascript:;" id="navbar-primary_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.loginUserDetailsReducer?.loginUserDetails?.name}</a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-primary_dropdown_1">

                                        <Link to='/userprofile' className="dropdown-item">Profile</Link>
                                        <Link to='/payments' className="dropdown-item">Payments</Link>
                                        <a className="dropdown-item">Customer Support</a>
                                        <div onClick={onLogOut} className="dropdown-item">Logout</div>


                                    </div>
                                </li> :
                                <li className="nav-item">
                                    < Link to={'/login'} className="btn btn-block btn-default h-100" >Login</Link>

                                </li>
                            } */}
            </ul>
          </div>
        </div>
      </nav>
      {props.loginUserDetailsReducer?.loginUserDetails &&
        !props.loginUserDetailsReducer?.loginUserDetails?.isApproved && (
          <div
            className="alert alert-default bg-warning fade show row m-0"
            role="alert"
          >
            {props.requestAtivateAccountReducer?.requestStatus?.sucess ? (
              <span className="alert-inner--text col-md-8 col-sm-12 ">
                <strong>
                  Account activation request sent to admin successfully .
                </strong>
              </span>
            ) : (
              <>
                <span className="alert-inner--text col-md-8 col-sm-12 ">
                  <strong>
                    Your account is not active. Please request the admin to
                    activate your account.
                  </strong>
                </span>
                <div className="col-md-4 col-sm-12 d-flex justify-content-end ">
                  <button
                    className="btn btn-sm btn-primary "
                    onClick={sendRequest}
                  >
                    Request To Activate Account
                  </button>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loginUserDetailsReducer: state.loginUserDetailsReducer,
    requestAtivateAccountReducer: state.requestAtivateAccountReducer,
  };
};
const mapDispatchtoProps = {
  logOutAction: () => logOutAction(),
  isAllradyLoginAction: (details) => isAllradyLoginAction(details),
  requestAtivateAccount: (userid) => requestAtivateAccount(userid),
};
export default connect(mapStateToProps, mapDispatchtoProps)(NevbarComponent);
