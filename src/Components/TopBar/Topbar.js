import React, { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { FaRegUser, FaHeadset, FaArrowLeft } from "react-icons/fa6";
import { AiFillProfile, AiOutlineBank } from "react-icons/ai";
import logo from "../../images/logo.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import { BsList } from "react-icons/bs";
import { FaChevronLeft, FaSignOutAlt, FaHome } from "react-icons/fa";
import {
  AiOutlinePieChart,
  AiOutlineCreditCard,
  AiFillStar,
} from "react-icons/ai";
import { BsBox, BsCash } from "react-icons/bs";
import { MdOutlineWatchLater, MdPictureInPicture } from "react-icons/md";
// import appLogo from "../../images/logo.png";
import appLogo from "../../images/main-logo.png";
import { logOutAction } from "../../Redux/Actions/Actions";
import { useSelector } from "react-redux";

const SideMenu = [
  {
    id: 1,
    value: "Dashboard",
    label: "Dashboard",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/Dashboard",
    icon: <FaHome size={28} className="mr-2" />,
  },
  {
    id: 2,
    value: "Live",
    label: "Live",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "Black",
    path: "/dashboard/Live",
    icon: <AiOutlinePieChart size={28} className="mr-2" />,
  },
  {
    id: 3,
    value: "Sold",
    label: "Sold",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Sold",
    icon: <AiOutlineCreditCard size={28} className="mr-2" />,
  },
  {
    id: 4,
    value: "Expired",
    label: "Expired",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Expired",
    icon: <BsBox size={28} className="mr-2" />,
  },
  {
    id: 9,
    value: "Win",
    label: "Win",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Win",
    // icon: <MdPictureInPicture size={28} className="mr-2" />,
  },
  {
    id: 10,
    value: "STA",
    label: "STA",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/STA",
  },
  {
    id: 5,
    value: "Payment",
    label: "Payments",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Payment",
    icon: <BsCash size={28} className="mr-2" />,
  },
  // {
  //   id: 6,
  //   value: "Favourite Lots",
  //   label: "Favourite",
  //   active: false,
  //   rights: true,
  //   backgroundcolor: "black",
  //   color: "white",
  //   path: "/dashboard/Favourite",
  //   icon: <AiFillStar size={28} className="mr-2" />,
  // },
  {
    id: 7,
    value: "Upcoming",
    label: "Upcoming",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Upcoming",
    icon: <MdOutlineWatchLater size={28} className="mr-2" />,
  },
  {
    id: 8,
    value: "Pictures",
    label: "Pictures",
    active: false,
    rights: true,
    backgroundcolor: "#258ec7",
    color: "black",
    path: "/dashboard/Pictures",
    icon: <MdPictureInPicture size={28} className="mr-2" />,
  },
];

const Topbar = () => {
  const location = useLocation();
  const [sideMenuArray, setSideMenuArray] = useState(SideMenu);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { loginUserDetails } = useSelector(
    (store) => store?.loginUserDetailsReducer
  );
  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
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
    logOutAction();
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div>
        <div className="topnav_bar">
          <Navbar
            expand="lg"
            style={{ paddingLeft: "2%", background: "#efefef" }}
          >
            <div className="div-left">
              {/* <Container fluid> */}
              {/* <div className="toggle_button">
            <button
              id="test-button"
              type="button"
              className="btn btn-secondary"
            >
              <BsList />
            </button>
          </div> */}

              <div class="dropdown">
                <button
                  class="btn btn-secondary"
                  type="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "black" }}
                >
                  <BsList style={{ color: "white" }} />
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <NavLink
                      to="/Dashboard"
                      className="dropdown-item dropdown_menu"
                    >
                      <div className="mr-2">
                        <FaHome size={22} />
                      </div>
                      <div>Dashboard</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/userprofile"
                      className="dropdown-item dropdown_menu"
                    >
                      <div className="mr-2">
                        <AiFillProfile size={22} />
                      </div>
                      <div>Profile</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/Live"
                      className="dropdown-item dropdown_menu"
                    >
                      <div className="mr-2">
                        <AiOutlinePieChart size={22} />
                      </div>
                      <div>Live Auctions</div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      // to="/dashboard/profile"
                      className="dropdown-item dropdown_menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onLogOut();
                      }}
                    >
                      <div className="mr-2">
                        <FaSignOutAlt size={22} />
                      </div>
                      <div>Logout</div>
                    </NavLink>
                  </li>
                </ul>
              </div>
              {/* <div className="top_logo">
              <div>
                <img
                  className="rounded-circle mr-2"
                  src={logo}
                  height={50}
                  width={50}
                  alt="Profile Pic"
                />
              </div>
              <p>
                Steel Company
              </p>
            </div> */}
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
              {/* <Navbar.Collapse id="basic-navbar-nav"> */}
              <div style={{ marginLeft: "2%", display: "flex" }}>
                <div className="logo mr-4">
                  <div className="div-left">
                    <a href="/" className="simple-text logo-mini">
                      <div className="logo-img image_size">
                        <img src={appLogo} />
                      </div>
                    </a>
                  </div>
                </div>
                {/* <Nav className="mr-auto" style={{ color: "white" }}>
              {sideMenuArray &&
                sideMenuArray.map((item, key) => {
                  return (
                    <NavLink
                      to={item.path}
                      className={
                        item.active == true
                          ? "topbar_text mr-4"
                          : "topbar_text mr-4"
                      }
                      style={{ color: "white" }}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  );
                })}
            </Nav> */}
              </div>

              {/* {location.pathname != "/dashboard/live/LiveLotDetails" ? (
                <>
                  <Nav className="mr-auto">
                    <NavLink to="/dashboard/userprofile" className="topbar_text">
                      <FaRegUser size={28} className="mr-2" />
                      View Your Profile
                    </NavLink>
                    <Nav.Link href="#link" className="topbar_text">
                      <FaHeadset size={28} className="mr-2" />
                      Customer Support
                    </Nav.Link>
                    <Nav.Link href="#link" className="topbar_text">
                      <AiOutlineBank size={28} className="mr-2" />
                      View Virtual Bank Accont
                    </Nav.Link>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="mr-auto">
                    <Nav.Link href="/dashboard/Live" className="topbar_text">
                      <FaArrowLeft size={28} className="mr-2" />
                      Back To Live
                    </Nav.Link>
                    <Nav.Link href="#link" className="topbar_text">
                      <FiRefreshCcw size={28} className="mr-2" />
                      Refresh
                    </Nav.Link>
                  </Nav>
                </>
              )} */}
              {/* <Nav className="ml-auto d-flex align-items-center"> */}

              {/* <NavDropdown
                  title={
                    // <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    <div>
                      <div>
                        <img
                          className="rounded-circle mr-2"
                          src={logo}
                          height={50}
                          width={50}
                          alt="Profile Pic"
                        />
                      </div>
                      <p>
                        <span className="d-lg-none d-md-block"></span>
                      </p>
                    </div>
                  }
                  id="nav-dropdown"
                  // drop="start"
                >
                  <NavLink to="/profile" className="dropdown-item">
                    Profile
                  </NavLink>
                  <NavLink to="/settings" className="dropdown-item">
                    Settings
                  </NavLink>
                  <NavDropdown.Divider />
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </NavDropdown> */}
              {/* <NavDropdown
                  title={}
                  id="nav-dropdown"
                >
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">
                    Something else here
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              {/* </Nav>
            </Navbar.Collapse> */}
              {/* </Container> */}
            </div>
            <div className="div-right">
              <div>
                {loginUserDetails ? (
                  <NavLink to="/dashboard/userprofile">
                    {loginUserDetails?.name}
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
              {/* <NavLink
                className="mobileHide"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onLogOut();
                }}
              >
                Logout
              </NavLink> */}
            </div>
          </Navbar>
        </div>
        <div class="dropdown MenubarMobile" >
              <button
                class="btn btn-secondary"
                type="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {sideMenuArray &&
                  sideMenuArray.map((item, key) => {
                    return (
                      <li>
                        <NavLink
                          to={item.path}
                          className="dropdown-item dropdown_menu"
                          style={{
                            background:
                              item.active === true
                                ? item.backgroundcolor
                                : "none",
                            color: item.active === true ? item.color : "Black",
                          }}
                        >
                          <div className="mr-4">
                            {item.icon}
                            {item.label}
                          </div>
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </div>
        <div
          className="col-sm-12 MenubarDestop"
          expand="lg"
          style={{ padding: 0, background: "#000" }}
        >
          {/* <div className="toggle_button">
            <button
              id="test-button"
              type="button"
              className="btn btn-secondary"
            >
              <BsList />
            </button>
          </div> */}
          
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* <Nav className="mr-auto" > */}
            {sideMenuArray &&
              sideMenuArray.map((item, key) => {
                return (
                  <NavLink
                    to={item.path}
                    className="topbar_text menu_bar"
                    style={{
                      background:
                        item.active === true ? item.backgroundcolor : "none",
                      color: item.active === true ? item.color : "white",
                    }}
                  >
                    <div
                      className="mr-4"
                      // style={{
                      //   color: item.active === true ? item.color : "black",
                      // }}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  </NavLink>
                );
              })}
            {/* </Nav> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
