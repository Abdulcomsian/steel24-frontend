import React, { useEffect } from "react";
import FooterComponent from "../FooterComponent";
import NevbarComponents from "../NevbarComponents";
export default function QuestionsComponent() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="">
      <NevbarComponents />
      <div className="container mb-7  mt-2">
        <div className="card bg-secondary ">
          <div className="card-header main_title">
            <h3>Frequently Asked Questions (FAQ) at Steel24.in</h3>
          </div>
          <div className="card-body headings">
            <h6>What is Steel24.in?</h6>
            <p>
              <span>
                If you don't agree with any of our disclaimers above please do
                not read the material on any of our pages. If you are
                dissatisfied with any portion of the service, or with any of
                these terms of use, your sole and exclusive remedy is to
                discontinue using the service and its related web sites.
              </span>
              <br />
              <br />
            </p>
            <h6>Who should use Steel24.in & what products does it offer?</h6>
            <p>
              <span>
                Steel24.in is open for the entire steel industry including steel
                manufacturers, service centres, fabricators, OEM's, steel
                traders and international trading companies. Steel24.in
                currently supports Prime and Secondary Steel products including
                Hot Rolled, Cold Rolled, Galvanised Iron, Galvalume, Color
                Coated Galvalume Sheets, Long Products, Scrap and much more.
              </span>
              <br />
              <br />
            </p>
            <h6>What are the services that Steel24.in offers?</h6>
            <p>
              <span>
                Steel24.in offers a robust, rich online trading experience to
                its customers through its customized trading modules. We auction
                different steel products on a daily basis. Registered customers
                can view the details of the products which are on auction, and
                place their bids for them. The customers can also view, and
                download excel reports of all material sold to them.
              </span>
              <br />
              <br />
            </p>
            <h6>How secure is my data and transactions at Steel24.in?</h6>
            <p>
              <span>
                Steel24.in provides an absolutely safe, secure and transparent
                trading environment. All communication between the clients, and
                the application is encrypted using an HTTPS (Hyper Text Transfer
                Protocol Secure) layer. All Steel24.in transactions between the
                buyer & the seller are strictly private and confidential. The
                password of the registered customers, is stored on a separate
                encrypted database. Additionally, bidding can be done by the
                customer only after mobile OTP authentication.
              </span>
              <br />
              <br />
            </p>
            <h6>Is anonymity maintained while bidding?</h6>
            <p>
              <span>
                All trading activities will be kept anonymous until the deal is
                closed online. This applies to both buyers and sellers of online
                trading so as to safeguard their right of confidentiality.
              </span>
              <br />
              <br />
            </p>
            <h6>How do I become a registered customer at Steel24.in?</h6>
            <span>
              There is a simple three step procedure to get registered as a
              customer with us.
              <ul>
                <li>
                  First, please Sign In at Steel24.in. You have three options
                  for sign in; via Google; using an email and password
                  combination; using a mobile number verification.
                </li>
                <li>
                  Once, you have signed in, please complete Your Profile, and
                  please fill in all the details.
                </li>
                <li>
                  Please pay the EMD via bank transfer to your selected lot, and
                  also update the details on your profile after making the
                  payment.
                </li>
                <li>
                  As soon as you complete your profile, our team member from
                  Steel24.in will verify your details. Upon receipt of your
                  payment, your account shall be activated, and you would be
                  able to view and participate in live auctions.
                </li>
                <li>
                  If you have any other queries regarding registrations, please
                  feel free to contact
                </li>
              </ul>
            </span>
            <br />
            <br />
            <h6>What are the benefits that a registered member can get?</h6>
            <p>
              <span>
                As you are well aware, the rates of steel products in India,
                fluctuate on a monthly basis. As a customer, you can view live
                auctions of various steel products. Based upon the bid prices
                being received on various products on auction, one can get a
                good idea of the current price movement in the steel industry.
              </span>
              <br />
              <br />
            </p>
            <h6>
              As a customer, how will I be informed about upcoming auctions?
            </h6>
            <p>
              <span>
                Auctions on Steel24.in are well planned & their dates are
                published on the Auction Schedule Calendar one month in advance.
                You can view the schedule from your dashboard. We also have SMS
                facility to keep our customers updated on upcoming auctions.
              </span>
              <br />
              <br />
            </p>
            <h6>
              What are the various terminologies used throughout Steel24.in?
            </h6>
            <span>
              Here is a brief description of all the terminologies used to
              describe transactions, and various actors throughout the site:
              <ul>
                <li>
                  Customer: A user who has registered, and has an active account
                  on Steel24.in. This user is able to view all “lots” on sale,
                  and bid on any lot he wishes.
                </li>
                <li>
                  Lot: A Lot is a packaged unit of sale on Steel24.in. A lot can
                  contain one or more products. The details within a lot are
                  clearly displayed to the customer on the bidding page. A lot
                  typically weighs about 20 tonnes, and consists of a similar
                  range of products.
                </li>
                <li>
                  Seller: A user who represents the steel manufacturing unit,
                  which is selling its products via Steel24.in.
                </li>
                <li>
                  Plant: Each Seller registered with us, has a number of
                  manufacturing units spread across the country. The location of
                  the Plant is also mentioned for each Lot.
                </li>
                <li>
                  Material Location: The Sellers registered with us, also have
                  multiple stockyards spread throughout the country. The
                  Material Location of the Lots being sold on Steel24.in by the
                  Seller could either be Ex-Works, which signifies that the
                  material is located at the Plant, or the Material Location
                  could be the location (city or town) of their stockyard.
                </li>
                <li>
                  Material (Ex-Stock or Arising): This applies to each Lot being
                  placed on auction. If the material is Ex-Stock, it signifies
                  that the material is ready for dispatch. If the material is
                  Arising, it signifies, that the material is under production,
                  and shall be ready for dispatch as it gets produced.
                </li>
                <li>
                  Auction Type (Normal or Discovery): This applies to each Lot
                  being placed on auction. The bidding process is the same for
                  both these types of auctions. The customer views the details
                  of the desired Lots, and places his bid on them. Upon end of
                  the auction of a Normal Lot, if the highest bid price received
                  for the lot has crossed its reserve price, the lot is
                  instantaneously awarded to the customer, who has placed the
                  highest bid for this Lot. In case of a Discovery Lot, the lot
                  is not awarded to the highest bidder upon completion of the
                  Lot. Instead, the lot enters into an STA (Subject To Approval)
                  Status. Offline negotiations are then performed between the
                  Seller, and the Customer with the highest bid. Based upon
                  these negotiations, the Seller will then either Finalize the
                  Lot (at a price equal to or higher than the highest bid on the
                  Lot) or Reject the Lot. The customer will be intimated of
                  these actions of the Seller via email and SMS.
                </li>
                <li>
                  Index: We have devised a customer centric indexing system to
                  categorize the various lots which are auctioned at Steel24.in.
                  The index is a composite of the Product Family (eg. HR, CR,
                  Secondary etc.) Each index is then converted into a button on
                  the live auctions page.
                </li>
              </ul>
            </span>
            <br />
            <br />
            <h6>What is process of a Steel24.in Auction?</h6>
            <p>
              <span>
                Please read the terminologies being used on Steel24.in before
                you read further. The process of auctions on Steel24.in is as
                follows:
                <ul>
                  <li>The Seller submits Lots for auction.</li>
                  <li>
                    A team member from Steel24.in verifies the Lots, and uploads
                    them onto the application.
                  </li>
                  <li>
                    The Lots are displayed according to their Index to the
                    customers.
                  </li>
                  <li>
                    The customers can then click on a Lot, and enter the Bidding
                    Page for the Lot. On this page, the customer can view all
                    the relevant details of the Lot, and place his bid if he
                    wishes.
                  </li>
                  <li>
                    If the customer’s current bid is the highest when the Lot
                    ends, the Lot is awarded to the customer based upon the
                    Auction Type.
                  </li>
                  <li>
                    The customer also receives an email digest at the end of day
                    with a list of all Lots awarded to him.
                  </li>
                </ul>
              </span>
              <br />
              <br />
            </p>
            <h6>
              What if I am unable to pay for and accept delivery of an awarded
              Lot?
            </h6>
            <p>
              <span>
                You, as a registered Customer are liable to pay for, and accept
                deliveries of all Lots awarded to you. In the event of failure
                of payment for an awarded Lot from your end, a sum of Rs. 2000
                per tonne will be deducted from your EMD, and your account will
                be blocked.
              </span>
              <br />
              <br />
            </p>
            <h6>How do I cancel my account at Steel24.in?</h6>
            <p>
              <span>
                Please send us an email to contact@steel24.in from your
                registered email address, requesting closure of your account. A
                team member would then call you for a verbal confirmation, and
                block the account immediately. A request for refund shall also
                be raised on your behalf, and the EMD amount shall be refunded
                to you within 14-21 days.
              </span>
            </p>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
