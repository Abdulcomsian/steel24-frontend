import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExpiredLotComponent from "./Components/ExpiredLotComponent.js";
import HeaderComponent from "./Components/HeaderComponent.js";
import LiveLotDetails from "./Components/LiveLotDetails";
import LiveLotsComponent from "./Components/LiveLotsComponent.js";
import AllLotsComponent from "./Components/AllLotsComponent.js";
import NevbarComponent from "./Components/NevbarComponents.js";
import SoledLotsComponent from "./Components/SoledLotsComponent.js";
import UserProfileController from "./Components/UserProfileController.js";
import LoginSignup from "./Components/LoginSignup.js";
import PaymentPanel from "./Components/PaymentPanel.js";
import FooterComponent from "./Components/FooterComponent.js";
import DisclaimerComponent from "./Components/CompnyDetails/DisclaimerComponent.js";
import QuestionsComponent from "./Components/CompnyDetails/QuestionsComponent.js";
import PrivacyPolicyComponent from "./Components/CompnyDetails/PrivacyPolicyComponent.js";
import TermsConditionsComponent from "./Components/CompnyDetails/TermsConditionsComponent.js";
import RefundPolicy from "./Components/CompnyDetails/Refundpolicy.js"
import HomeComponent from "./Components/HomeComponent.js";
import LotDetails from "./Components/LotDetails.js";
import Dashboard from "./Components/Dashboard.js";
import LiveLots from "./Components/LiveLots/Livelots.js";
import "./assets/_main.scss";
import React, { useEffect } from "react";
import Authentication from "./Components/Authentication/Authentication.js";


function App() {
  useEffect(() => {
    window.addEventListener("load", function () {
      const sidebar = document.querySelector(".sidebar");
      const overlay = document.querySelector(".overlay");
      const sidebarToggle = document.querySelector(".div-right");
      const testButton = document.querySelector("#test-button");

      if (sidebar != null) {
        sidebar.classList.remove("sidebar-open"); // Remove the sidebar-open class by default

        testButton.addEventListener("click", function () {
          sidebar.classList.add("sidebar-open");
          overlay.classList.add("overlay-visible");
        });

        sidebarToggle.addEventListener("click", function () {
          sidebar.classList.remove("sidebar-open");
          overlay.classList.remove("overlay-visible");
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NevbarComponent />} />
          <Route element={<HeaderComponent />} />
          <Route element={<FooterComponent />} />
          <Route index element={<AllLotsComponent />} />
          <Route path="/login" element={<LoginSignup />} />
          {/* <Route  element={<Authentication/>}> */}
            <Route path="/lives" element={<LiveLots />} />
            <Route path="/Dashboard/*" element={<Dashboard />} />
            <Route path="/lotdetails/:id" element={<LotDetails />} />
            
            <Route path="/live" element={<LiveLotsComponent />} />
            <Route path="/sold" element={<SoledLotsComponent />} />
            <Route path="/expired" element={<ExpiredLotComponent />} />
            <Route path="/livelotdetails/:id" element={<LiveLotDetails />} />
            <Route path="/userprofile" element={<UserProfileController />} />
            <Route path="/payments" element={<PaymentPanel />} />
          {/* </Route> */}
          <Route path="/disclaimer" element={<DisclaimerComponent />} />
          <Route path="/questions" element={<QuestionsComponent />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyComponent />} />
          <Route
            path="/termsconditions"
            element={<TermsConditionsComponent />}
          />
          <Route
            path="/refundpolicy"
            element={<RefundPolicy />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
