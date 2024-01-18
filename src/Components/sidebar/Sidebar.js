import React, { useEffect, useState } from "react";
// import logo from "../assests/images/logo.svg";
import appLogo from "../../images/logo.png";
import { Nav, NavLink } from "react-bootstrap";
import { FaChevronLeft, FaSignOutAlt, FaHome } from "react-icons/fa";
import { AiOutlinePieChart, AiOutlineCreditCard, AiFillStar } from "react-icons/ai";
import { BsBox, BsCash } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineWatchLater,MdPictureInPicture } from "react-icons/md";
import { connect } from "react-redux";
import {
  logOutAction,
  isAllradyLoginAction,
  getUserDetailsAction,
  requestAtivateAccount,
} from "../../Redux/Actions/Actions";

const SideMenu = [
  {
    id: 1,
    value: "Dashboard",
    label: "Dashboard",
    active: false,
    rights: true,
    path: "/Dashboard",
    icon: <FaHome size={28} className="mr-2" />,
  },
  {
    id: 2,
    value: "Live",
    label: "Live",
    active: false,
    rights: true,
    path: "/dashboard/Live",
    icon: <AiOutlinePieChart size={28} className="mr-2" />,
  },
  {
    id: 3,
    value: "Sold",
    label: "Sold",
    active: false,
    rights: true,
    path: "/dashboard/Sold",
    icon: <AiOutlineCreditCard size={28} className="mr-2" />,
  },
  {
    id: 4,
    value: "Expired",
    label: "Expired",
    active: false,
    rights: true,
    path: "/dashboard/Expired",
    icon: <BsBox size={28} className="mr-2" />,
  },
  {
    id: 5,
    value: "Payment",
    label: "Payments",
    active: false,
    rights: true,
    path: "/dashboard/Payment",
    icon: <BsCash size={28} className="mr-2" />,
  },
  {
    id: 6,
    value: "Favourite Lots",
    label: "Favourite Lots",
    active: false,
    rights: true,
    path: "/dashboard/Favourite",
    icon: <AiFillStar size={28} className="mr-2" />,
  },
  {
    id: 7,
    value: "Upcoming",
    label: "Live Later",
    active: false,
    rights: true,
    path: "/dashboard/Upcoming",
    icon: <MdOutlineWatchLater size={28} className="mr-2" />,
  },
  {
    id: 8,
    value: "Pictures",
    label: "Pictures",
    active: false,
    rights: true,
    path: "/dashboard/Pictures",
    icon: <MdPictureInPicture size={28} className="mr-2" />,
  },
];

const Sidebar = (props) => {
  const [sideMenuArray, setSideMenuArray] = useState(SideMenu);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const checkPath = (path) => {
    let arry = path.split("/");
    return arry[arry.length - 1];
  };

  useEffect(() => {
    // const activeItem = sideMenuArray?.find(
    //   (item) => location.pathname.startsWith(item.path)
    // );
    // console.log(activeItem);
    const name = checkPath(location.pathname);
    const newMenuArray =
      name != "LiveLotDetails"
        ? sideMenuArray.filter((item) => {
            if (item.value.startsWith(name)) {
              item.active = true;
              return true;
            } else {
              item.active = false;
              return true;
            }
          })
        : sideMenuArray;

    setSideMenuArray(newMenuArray);
  }, [location]);

  const onLogOut = () => {
    navigate("/");
    props.logOutAction();
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="logo">
          <div className="div-left">
            <a href="/" className="simple-text logo-mini">
              <div className="logo-img image_size">
                <img src={appLogo} style={{ width: "150px", height: "50px" }} />
              </div>
            </a>
          </div>
          <div className="div-right">
            <FaChevronLeft style={{float:"right"}}/>
          </div>
        </div>

        <div className="side-menu">
          <div className="sidebar-wrapper">
            {sideMenuArray &&
              sideMenuArray.map((item, key) => {
                return (
                  <Nav
                    key={key}
                    className={item.active == true ? "nav_link_active" : ""}
                  >
                    {/* <li onClick={(e) => handleToggle(item.id)}> */}
                    <NavLink
                      onClick={() => handleNavLinkClick(item.path)}
                      className="nav-link"
                    >
                      <div className="d-flex align align-items-center">
                        <div>{item.icon}</div>
                        <div>
                          <p>{item.label}</p>
                        </div>
                      </div>
                    </NavLink>
                  </Nav>
                );
              })}
          </div>

          <div className="logout-button">
            <Nav className="pl-0">
              <NavLink>
                <div
                  className="d-flex justify-content-center gap-2 "
                  style={{ alignItems: "center" }}
                  onClick={onLogOut}
                >
                  <div className="mr-2">
                    <FaSignOutAlt size={28} />
                  </div>
                  <div>
                    <p>Logout</p>
                  </div>
                </div>
              </NavLink>
            </Nav>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
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
export default connect(mapStateToProps, mapDispatchtoProps)(Sidebar);
