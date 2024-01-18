import React, { useEffect } from "react";
import FooterComponent from "../FooterComponent";
import NevbarComponents from "../NevbarComponents";

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth",left:0 });
  }, []);

  return (
    <div className="" id="policy">
      <NevbarComponents />
      <div className="container mb-7  mt-2">
        <div className="card bg-secondary ">
          <div className="card-header main_title">
            <h3>Refund and Cancellation Policy for Steel Auction </h3>
            Effective date: January 01, 2023
          </div>
          <div className="card-body headings">
            <ol>
              <h5>1. Refund Policy:</h5>
              <h5>1.1 No Refund after Auction Closure:</h5>{" "}
              <p>
                Once an auction is closed, and the winning bid is confirmed, no
                refunds will be issued.
              </p>
              <h5>1.2 Bidder's Responsibility:</h5>{" "}
              <p>
                Bidders are responsible for carefully reviewing all auction
                details, including item descriptions, specifications, and
                conditions, before placing bids. Refunds will not be provided
                for bids placed in error or misunderstanding of the auction
                details.
              </p>
              <h5>1.3 Dispute Resolution:</h5>{" "}
              <p>
                In the event of a dispute regarding the accuracy of auction item
                descriptions or other related issues, bidders must contact our
                customer support within 24 hours of auction closure. We will
                review the case and may consider a refund based on the merits of
                the dispute.
              </p>
              <h5>1.4 Payment Gateway Issues:</h5>{" "}
              <p>
                Refunds will not be provided for payments made through the
                payment gateway (e.g., Razorpay) errors unless explicitly stated
                in the terms and conditions of the payment gateway.
              </p>
              <h5>2. Cancellation Policy:</h5>{" "}
              <h5>2.1 Cancellation by Bidders:</h5>{" "}
              <p>
                Bidders are not allowed to cancel their bids once placed.
                Bidders should exercise caution and review their bids carefully
                before confirming.
              </p>
              <h5>2.2 Auctioneer's Right to Cancel:</h5>{" "}
              <p>
                The auctioneer reserves the right to cancel an auction at any
                time, for any reason, without prior notice. In the event of such
                cancellations, bidders will be notified, and any payments made
                will be refunded.
              </p>
              <h5>3. Special Considerations:</h5> <h5>3.1 Force Majeure:</h5>{" "}
              <p>
                We shall not be liable for any failure to perform our
                obligations under these terms if such failure is caused by
                events beyond our reasonable control, including, but not limited
                to, acts of God, war, terrorism, insurrection, riots, civil
                unrest, natural disasters, or government actions.
              </p>
              <h5>3.2 Policy Amendments:</h5>{" "}
              <p>
                We reserve the right to amend this Refund and Cancellation
                Policy at any time. The revised policy will be effective
                immediately upon posting on the Website. Bidders are encouraged
                to review the policy periodically for any changes.
              </p>
              <br />
              <br />
              <p>
                By using our Steel Auction Website, you agree to comply with
                this Refund and Cancellation Policy. If you have any questions
                or concerns, please contact our customer support.
              </p>
            </ol>
            <div className="Policy-section">
              <a>Steel24.in</a>
              <p>Hinjewadi, IT Park Pune, Maharashtra, 411057</p>
              <a href="mailto:sales.steel24@gmail.com">
                sales.steel24@gmail.com
              </a>
              <a href="tel:+918329976841">+91 83299-76841</a>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
