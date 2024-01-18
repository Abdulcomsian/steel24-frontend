import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../assets/css/templatemoartfactory.css";
import Person from "../assets/images/Person.png";
import Back from "../assets/images/Shape_back.png";
import Tons from "../assets/images/Tons.png";
import HowToBuy from "../assets/images/how_to_buy.png";
import Jws from "./../assets/images/jsw.png";

import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  isAllradyLoginAction,
  logOutAction
} from "../Redux/Actions/Actions";
import cr2 from "../images/ColdRolledCoil.webp";
import galvanized from "../images/GalvanizedCoil.webp";
import akash from "../images/akash.png";
import amns from "../images/amns.png";
import businessman from "../images/businessman.png";
import hrsteel from "../images/hr-steel.jpg";
import appLogo from "../images/logo.png";
import posco from "../images/posco.png";
import ppgi from "../images/ppgi.jpg";
import premier from "../images/premier engineering.jpeg";
import sigma2 from "../images/sigma2.png";
import tata from "../images/tata-steel-logo.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FooterComponent from "./FooterComponent";

function AllLotsComponent(props) {
  const [showManu, onShowManu] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };

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
    <div className="index-page">
      <div className="wrapper">
        <div className="main_nav_bar">
          <nav className="navbar navbar-expand-lg navbar-dark  p-0 ">
            <div className="nav_bar">
              <Link className="navbar-brand  position-sticky top-0 " to={"/"}>
                <img src={appLogo} style={{ width: "150px", height: "50px" }} />
              </Link>
              <div className="d-flex align-items-center">
                {props.loginUserDetailsReducer.loginUserDetails ? (
                  ""
                ) : (
                  <Link
                    to={"/login"}
                    className="btn btn btn-light nav-item_button desktopHide"
                  >
                    Log in
                  </Link>
                )}
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
              </div>
              <div
                className="navbar-collapse collapse justify-content-end"
                id="navbar-primary"
              >
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
                <ul className="navbar-nav  align-items-center">
                  <li className="nav-item"></li>
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link navbar_li"
                      onClick={(event) => scrollToSection(event, "about")}
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="#"
                      className="nav-link navbar_li"
                      onClick={(event) => scrollToSection(event, "contact")}
                    >
                      Contact
                    </Link>
                  </li>
                  {props.loginUserDetailsReducer.loginUserDetails ? (
                    <>
                      {" "}
                      <li className="nav-item">
                        <Link to="/Dashboard" className="nav-link navbar_li">
                          Dashboard
                        </Link>
                      </li>
                      {
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="javascript:;"
                            id="navbar-primary_dropdown_1"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            {
                              props.loginUserDetailsReducer?.loginUserDetails
                                ?.name
                            }
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbar-primary_dropdown_1"
                          >
                            <Link
                              to="/dashboard/userprofile"
                              className="dropdown-item"
                            >
                              Profile
                            </Link>
                          </div>
                        </li>
                      }
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link
                        to={"/login"}
                        className="btn btn btn-light nav-item_button"
                      >
                        Log in
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="welcome-area" id="welcome">
          <div className=" main-home" id="home">
            <div className="container">
              <div>
                <div
                  className="left-text col-lg-12 col-md-12 col-sm-12 col-xs-12 main_Heading"
                  data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
                >
                  <h1 className=" text-white">
                    Waqt bachao, Paise bachao,
                    <br />
                    Ek click pe.
                  </h1>
                  <h3 className="text-white ">
                    Experience best prices and availability at your convenience.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row align-items-center">
            <div className="col supplier">
              <div>
                <img src={amns} style={{ width: "200px" }} />
              </div>
            </div>
            <div className="col supplier">
              <div>
                <img src={posco} style={{ width: "200px" }} />
              </div>
            </div>
            <div className="col supplier">
              <div>
                <img src={Jws} style={{ width: "200px" }} />
              </div>
            </div>
            <div className="col supplier">
              <div>
                <img src={tata} style={{ width: "200px" }} />
              </div>
            </div>
          </div>
        </div>
        <section className="section over_products_section">
          <div className="over_products">
            <div>
              <h1>Our Products</h1>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div className="col-lg-5 col-md-8 ">
                <h3>
                  Our steel products provide the ideal balance of strength and
                  affordability, making them the perfect choice for any project
                  requiring durability and cost-effectiveness.
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-11">
            <div className="d-flex row">
              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div
                  className="card text_Image"
                  style={{
                    backgroundImage: `linear-gradient(0deg, #001C2D 0%, rgba(0, 21, 33, 0) 70.83%), url(${cr2})`,
                  }}
                >
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <h3 className="text-white">Cold Rolled Coil</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div
                  className="card text_Image"
                  style={{
                    backgroundImage: `linear-gradient(0deg, #001C2D 0%, rgba(0, 21, 33, 0) 70.83%), url(${hrsteel})`,
                  }}
                >
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <h3 className="text-white">Hot Rolled Coil</h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div
                  className="card text_Image"
                  style={{
                    backgroundImage: `linear-gradient(0deg, #001C2D 0%, rgba(0, 21, 33, 0) 70.83%), url(${ppgi})`,
                  }}
                >
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <h3 className="text-white">Pre-Painted Galvanized Coil</h3>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 ">
                <div
                  className="card text_Image"
                  style={{
                    backgroundImage: `linear-gradient(0deg, #001C2D 0%, rgba(0, 21, 33, 0) 70.83%), url(${galvanized})`,
                  }}
                >
                  <div className="position-absolute bottom-0 start-0 p-3">
                    <h3 className="text-white">Galvanized Coil</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <img src={HowToBuy} style={{ width: "100%" }} />
        </section>
        <section className="section ">
          <div>
            <div>
              <div className="row text-center w-100 mb-lg-5 mb-md-5 mb-5">
                <div className=" col-md-4 mobile_m">
                  <div className="status_bar">
                    <span className="counter mr-3">25+ </span> Years
                  </div>
                  <div className="status_bar_row">
                    <img src={Back} />
                    In Business
                  </div>
                </div>
                <div
                  className=" col-md-4 mobile_m"
                  style={{
                    borderLeft: "3px solid rgba(37, 142, 199, 0.2)",
                    height: "100px",
                  }}
                >
                  <div className="status_bar">
                    <span className="counter mr-3">5000+</span>
                  </div>
                  <div className="status_bar_row">
                    <img src={Person} />
                    Trusted Customers
                  </div>
                </div>
                <div
                  className=" col-md-4 "
                  style={{
                    borderLeft: "3px solid rgba(37, 142, 199, 0.2)",
                    height: "100px",
                  }}
                >
                  <div className="status_bar">
                    <span className="counter mr-3">15000+</span>
                  </div>
                  <div className="status_bar_row">
                    <img src={Tons} />
                    Tons Supplies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section slider_section" id="about">
          <div className="col-lg-6">
            <h1>Here is what our Clients are saying About us</h1>
          </div>

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper_pagination mb-2"
          >
            <div className="swiper-pagination" />
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
            <SwiperSlide>
              <div
                className="card flex-row align-items-center slider_text justify-content-center"
                style={{
                  border: "none",
                  background: "rgb(242, 242, 242)",
                }}
              >
                <div className="card card slider_text col-lg-8 col-md-10">
                  <div className="col-lg-4 col-md-4 mobile_hide">
                    <div className="card_image">
                      <img src={businessman} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <h5>Suresh Singh</h5>
                    <h6>
                      I want to thank steel24.in for their quality Cold Rolled
                      Steel Coil, I liked the service and the full team. Since I
                      started buying from steel24.in it is very easy to buy and
                      also not time consuming.
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="card flex-row align-items-center slider_text justify-content-center"
                style={{
                  border: "none",
                  background: "rgb(242, 242, 242)",
                }}
              >
                <div className="card card slider_text col-lg-8 col-md-10">
                  <div className="col-lg-4 col-md-4 mobile_hide">
                    <div className="card_image">
                      <img src={akash} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <h5>Akash Press Part Pvt.ltd</h5>
                    <h6>
                      steel24.in is really deserved to be appreciated. Their
                      steel products really helped my industry, The parts that I
                      have to made I get it from this auction company. Their
                      entire process was smooth.{" "}
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="card flex-row align-items-center slider_text justify-content-center"
                style={{
                  border: "none",
                  background: "rgb(242, 242, 242)",
                }}
              >
                <div className="card card slider_text col-lg-8 col-md-10">
                  <div className="col-lg-4 col-md-4 mobile_hide">
                    <div className="card_image">
                      <img src={sigma2} alt="" style={{ marginTop: "3rem" }} />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <h5>Sigma Press Tech </h5>
                    <h6>
                      We've been doing business from 5 years with steel24.in and
                      our experience is amazing. Since I started buying from
                      this online auction company, I save lot of time and it is
                      to easy.
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="card flex-row align-items-center slider_text justify-content-center"
                style={{
                  border: "none",
                  background: "rgb(242, 242, 242)",
                }}
              >
                <div className="card card slider_text col-lg-8 col-md-10">
                  <div className="col-lg-4 col-md-4 mobile_hide">
                    <div className="card_image">
                      <img src={premier} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <h5>Premier Engineering</h5>
                    <h6>
                      We would like to thank steel24.in, the service of industry
                      is superior and timely delivery of material. I purchased
                      the goods 2 times, and the service was incredibly fast. We
                      Are looking for future purchases from steel24. in company.
                    </h6>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        <FooterComponent />
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchtoProps)(AllLotsComponent);
