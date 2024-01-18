import { Link } from "react-router-dom";
import appLogo from "../images/appLogo.png";
import faceBook from "../assets/images/facebook.svg";
import Instagram from "../assets/images/instagram.svg";
import { useRef, useState } from "react";
import { contactUsMail } from "../Api/lotsapi";
import { log } from "util";
import { notification, Button } from "antd";
import { set } from "mongoose";

export default function FooterComponent(props) {
  const formValue = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const sendMail = (data, event) => {
    setLoading(true);
    contactUsMail(data).then((res) => {
      if (res.status === 200) {
        event.target.reset();
        api.info({
          description: res.data?.msg,
        });
        setLoading(false);
      } else {
        api.info({
          description: "Email not send successfully",
        });
        setLoading(false);
      }
    });
  };
  return (
    <>
      {/* <footer className="footer bg-default py-2">
                <div className="container-fluid row">
                    <Link className="col-lg-2 col-md-12 col-sm=12" to={'/'}>
                        <img src={appLogo} style={{ width: '150px', height: '50px', }} />
                    </Link>
                    <Link to={'/disclaimer'} className="btn col-lg-2 col-md-6 col-sm-6 text-white text-left m-0" >Disclaimer</Link>
                    <Link to={'/privacypolicy'} className="btn col-lg-2 col-md-6 col-sm-6 text-white text-left m-0" >Privacy Policy</Link>
                    <Link to={'/questions'} className="btn col-lg-3 col-md-6 col-sm-6 text-white text-left m-0" >Frequently Asked Questions</Link>
                    <Link to={'/termsconditions'} className="btn col-lg-3 col-md-6 col-sm-6 text-white text-left m-0" >Terms & Conditions</Link>
                </div >
            </footer> */}
      {contextHolder}
      <footer className="bg-primary-2 footer_section">
        <div className="container-fluid col-10">
          <div className="row  text-left">
            <div className="col-lg-3 col-md-6 col-sm-6 ">
              <Link className="" to={"/"}>
                <img src={appLogo} style={{ width: "150px", height: "50px" }} />
              </Link>
              <div>
                <h6 className="col-10 mt-4 p-0">
                  Steel24 is an auction company that provides various steel
                  products. We specialize in connecting buyers and sellers in
                  the steel industry, providing a reliable and efficient
                  platform for trade. Join our auctions and experience the
                  benefits of working with a trusted steel auction company.
                </h6>
                <hr color="white" size="3" width="100%" align="center" />
                <div>
                  <h5 className=" my-3">
                    <a
                      style={{ marginRight: "22px" }}
                      target="blanck"
                      href="https://www.facebook.com/steel24.in"
                    >
                      <img src={faceBook} />
                    </a>
                    <a
                      target="blanck"
                      href="https://www.instagram.com/steel24.in/"
                    >
                      <img src={Instagram} />
                    </a>
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 my-3">
              <h3>CONTACT INFO</h3>
              <div className="mt-4">
                <h6>
                  <i
                    className="fa fa-phone"
                    aria-hidden="true"
                    style={{ color: "#FFFFFF", fontSize: "14px" }}
                  ></i>{" "}
                  <span className="ml-3">
                    {" "}
                    <a href="tel:+918329976841">+91 83299-76841</a>
                  </span>
                </h6>
                <h6 className="mt-3">
                  <i
                    className="fa fa-envelope"
                    aria-hidden="true"
                    style={{ color: "#FFFFFF", fontSize: "14px" }}
                  ></i>
                  <span className="ml-3">
                    <a href="mailto:sales.steel24@gmail.com">
                      sales.steel24@gmail.com
                    </a>
                  </span>
                </h6>
                <h6 className="mt-3">
                  <i
                    className="fa fa-map-marker"
                    aria-hidden="true"
                    style={{ color: "#FFFFFF", fontSize: "14px" }}
                  ></i>
                  <span className="ml-3">
                    {" "}
                    Hinjewadi, IT Park Pune, Maharashtra, 411057
                  </span>
                </h6>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 my-3 useFull-Links">
              <h3>USEFULL LINKS</h3>
              <div className="mt-3">
                <ul>
                  <li>
                    <Link to={"/disclaimer"} className="btn  text-left m-0">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link to={"/privacypolicy"} className="btn text-left m-0">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={"/questions"} className="btn text-left m-0">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/termsconditions"}
                      className="btn  text-left m-0"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to={"/refundpolicy"} className="btn  text-left m-0">
                      Refund and Cancellation Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 my-3" id="contact">
              <h3>CONTACT & SUBSCRIBE US</h3>
              <div className="col-12 contact_form p-0 mt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const formDataObject = Object.fromEntries(
                      formData.entries()
                    );
                    // console.log(formDataObject);
                    sendMail(formDataObject, e);
                  }}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Your Name"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Your Email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          type="textarea"
                          name="message"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Your Message"
                          required
                        />
                      </div>
                      {/* <div
                        className="form-group"
                        style={{ display: "flex", alignItems: "flex-start" }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="subscribe"
                          value=""
                          id="flexCheckDefault"
                          style={{ marginLeft: "0 !important" }}
                        />
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                          style={{
                            fontFamily: "Inter",
                            fontSize: "12px",
                            fontWeight: "400",
                            lineHeight: "15px",
                            letterSpacing: "0px",
                          }}
                        >
                          Also subscribe to your e-mail *
                        </label>
                      </div> */}
                      <Button
                        htmlType="submit"
                        className="btn btn-primary col-12"
                        loading={loading}
                      >
                        {loading?"Sending":"Send Message"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="footer-copyright py-3 footer_section_copyRight"
          style={{ borderTop: "1px solid white" }}
        >
          Copyright © 2023 All rights reserved!
        </div>
      </footer>
    </>
  );
}
