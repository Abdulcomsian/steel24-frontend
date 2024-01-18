import React, { useEffect } from "react";
import FooterComponent from "../FooterComponent";
import NevbarComponents from "../NevbarComponents";
export default function PrivacyPolicyComponent() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
},[]);
  return (
    <div className="">
      <NevbarComponents />
      <div className="container mb-7 mt-2">
        <div className="card bg-secondary ">
          <div className="card-header main_title">
            <h3>Privacy Policy at Steel24.in</h3>
            Effective date: January 01, 2023
          </div>
          <div className="card-body headings ">
            <p>
              {" "}
              Steel24.in ("us", "we", or "our") operates the{" "}
              <a href="http://www.steel24.in">http://www.steel24.in</a> website
              and the Steel24.in mobile application (the "Service"). This page
              informs you of our policies regarding the collection, storing,
              processing, transferring, sharing, use, and disclosure of personal
              data when you use our Service and the choices you have associated
              with that data. We use your data to provide and improve the
              Service. By using the Service, you agree to the collection,
              storing, processing, transferring, sharing, and use of information
              in accordance with this policy. Unless otherwise defined in this
              Privacy Policy, terms used in this Privacy Policy have the same
              meanings as in our Terms and Conditions.
              <br />
            </p>
            <br />
            <h5>Information Collection And Use</h5>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            <br />
            <h5>Types of Data Collected</h5>
            <ul>
              <li>
                Personal Data
                <p>
                  While using our Service, we may ask you to provide us with
                  certain personally identifiable information that can be used
                  to contact or identify you ("Personal Data"). Personally
                  identifiable information may include, but is not limited to:
                </p>
                <ul>
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, PIN/Postal code, City</li>
                  <li>Cookies and Usage Data</li>
                </ul>
              </li>

              <li>
                <span className="font-weight-bolder">Usage Data</span>
                <p>
                  {" "}
                  We may also collect information that your browser sends
                  whenever you visit our Service or when you access the Service
                  by or through a mobile device ("Usage Data"). This Usage Data
                  may include information such as your computer's Internet
                  Protocol address (e.g. IP address), browser type, browser
                  version, the pages of our Service that you visit, the time and
                  date of your visit, the time spent on those pages, unique
                  device identifiers and other diagnostic data.
                  <br />
                  <br />
                  When you access the Service by or through a mobile device,
                  this Usage Data may include information such as the type of
                  mobile device you use, your mobile device unique ID, the IP
                  address of your mobile device, your mobile operating system,
                  the type of mobile Internet browser you use, unique device
                  identifiers and other diagnostic data. <br />
                  <br />
                </p>
              </li>
              <li>
                <span className="font-weight-bolder">
                  {" "}
                  Tracking & Cookies Data{" "}
                </span>
                <p>
                  We use cookies and similar tracking technologies to track the
                  activity on our Service and hold certain information. Cookies
                  are files with small amount of data which may include an
                  anonymous unique identifier. Cookies are sent to your browser
                  from a website and stored on your device. Tracking
                  technologies also used are beacons, tags, and scripts to
                  collect and track information and to improve and analyze our
                  Service. You can instruct your browser to refuse all cookies
                  or to indicate when a cookie is being sent. However, if you do
                  not accept cookies, you may not be able to use some portions
                  of our Service.
                  <br />
                  <br />
                </p>
                Examples of Cookies we use:
                <ul>
                  <li>
                    <span className="font-weight-bolder">
                      {" "}
                      Session Cookies. 
                    </span>
                    We use Session Cookies to operate our Service.
                  </li>
                  <li>
                    <span className="font-weight-bolder">
                      {" "}
                      Preference Cookies. 
                    </span>
                    We use Preference Cookies to remember your preferences and
                    various settings.
                  </li>
                  <li>
                    <span className="font-weight-bolder">
                      {" "}
                      Security Cookies. 
                    </span>
                    We use Security Cookies for security purposes.
                  </li>
                </ul>
              </li>
            </ul>
            <br />
            <h5>Use of Data</h5>
            Steel24.in uses the collected data for various purposes:
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>
                To allow you to participate in interactive features of our
                Service when you choose to do so
              </li>
              <li>To provide customer care and support</li>
              <li>
                To provide analysis or valuable information so that we can
                improve the Service
              </li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To ensure creditworthiness and conducting credit checks</li>
              <li>To customising future shopping for you</li>
              <li>To improve our platform and communication with you</li>
            </ul>
            <br />
            <br />
            <h5>Transfer Of Data</h5>
            <p>
              {" "}
              Your information, including Personal Data, may be transferred to —
              and maintained on — computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ than those from your jurisdiction.
              If you are located outside India and choose to provide information
              to us, please note that we transfer the data, including Personal
              Data, to India and process it there.
              <br />
              <br />
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
              Steel24.in will take all steps reasonably necessary to ensure that
              your data is treated securely and in accordance with this Privacy
              Policy and no transfer of your Personal Data will take place to an
              organization or a country unless there are adequate controls in
              place including the security of your data and other personal
              information.
              <br />
            </p>
            <br />
            <h5>Disclosure Of Data</h5>
            <h6>Legal Requirements</h6>
            Steel24.in may disclose your Personal Data in the good faith belief
            that such action is necessary to:
            <ul>
              <li>To comply with a legal obligation</li>
              <li>
                To protect and defend the rights or property of Steel24.in
              </li>
              <li>
                To prevent or investigate possible wrongdoing in connection with
                the Service
              </li>
              <li>
                To protect the personal safety of users of the Service or the
                public
              </li>
              <li>To protect against legal liability</li>
            </ul>
            <br />
            <br />
            <h5>Security Of Data</h5>
            <p>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet, or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
              <br />
              It is important for you to protect against unauthorised access to
              your password and to your computer. Be sure to sign off when you
              finish using a shared computer. <br />
              <br />
            </p>
            <br />
            <h5>Service Providers</h5>
            <p>
              {" "}
              We may employ third party companies and individuals to facilitate
              our Service ("Service Providers"), to provide the Service on our
              behalf, to perform Service-related services or to assist us in
              analyzing how our Service is used.
              <br />
              These third parties have access to your Personal Data only to
              perform these tasks on our behalf and are obligated not to
              disclose or use it for any other purpose.
              <br />
            </p>
            <br />
            <h6>Links To Other Sites</h6>
            <p>
              Our Service may contain links to other sites that are not operated
              by us. If you click on a third party link, you will be directed to
              that third party's site. We strongly advise you to review the
              Privacy Policy of every site you visit.
              <br />
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services. <br />
              <br />
            </p>
            <h6>Children's Privacy</h6>
            <p>
              Our Service does not address anyone under the age of 18
              ("Children"). Use of our Service is available only to persons who
              can form a legally binding contract under the Indian Contract Act,
              1872. If you are a minor i.e. under the age of 18 years, you may
              use our Service only with the involvement of a parent or guardian.
              <br />
              We do not knowingly collect personally identifiable information
              from anyone under the age of 18. If you are a parent or guardian
              and you are aware that your Children has provided us with Personal
              Data, please contact us. If we become aware that we have collected
              Personal Data from children without verification of parental
              consent, we take steps to remove that information from our
              servers.
              <br />
            </p>
            <br />
            <h6>Changes To This Privacy Policy</h6>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email and/or a prominent notice on our
              Service, prior to the change becoming effective and update the
              "effective date" at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
              <br />
            </p>
            <br />
            <h6>Contact Us</h6>
            <p>
              {" "}
              If you have any questions about this Privacy Policy, please
              contact us: By email: contact@steel24.in
            </p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
