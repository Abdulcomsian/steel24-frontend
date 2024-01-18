import { useEffect, useState } from "react";
import { getTodayDate } from "../../Redux/Constants";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isAllradyLoginAction,
  logOutAction,
} from "../../Redux/Actions/Actions";
import { Tag } from "antd";

function TimeAndUserDetails(props) {
  const [userDetails, setUserDetails] = useState(null);
  const [todayTime, setTodayTime] = useState(getTodayDate());
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTodayTime(getTodayDate());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    var today = new Date();
    var hour = today.getHours();
    if (hour >= 5 && hour < 12) {
      document.getElementById("greeting").textContent = "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
      document.getElementById("greeting").textContent = "Good Afternoon!";
    } else if (hour >= 17 && hour < 20) {
      document.getElementById("greeting").textContent = "Good Evening!";
    } else {
      document.getElementById("greeting").textContent = "Good Night!";
    }
  }, []);

  return (
    <>
      <div className="live_Lots">
        <div className="textSpan">
          <h1>
            {" "}
            <span id="greeting">Good Morning!</span> {userDetails?.name}
          </h1>
          {/* <p >Lorem ipsum dolor sit amet consectetur.</p> */}
        </div>
        <div>
          <p>{todayTime}</p>
          <h3>
            Current Status:
            <Tag
              className="tag_text_STATUS ml-3"
              style={{
                backgroundColor: "rgba(125, 179, 67, 0.15)",
                color: "rgba(125, 179, 67, 1)",
              }}
            >
              {userDetails?.isApproved == 1 ? "VERIFIED" : "NOT VERIFIED"}
            </Tag>
            <Tag
              className="tag_text_STATUS"
              style={{
                backgroundColor: "rgba(125, 179, 67, 0.15)",
                color: "rgba(125, 179, 67, 1)",
              }}
            >
             {userDetails?.isApproved == 1 ? "ACTIVE" : "INACTIVE"}
            </Tag>
          </h3>
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

export default connect(mapStateToProps, mapDispatchtoProps)(TimeAndUserDetails);
