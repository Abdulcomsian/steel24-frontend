import React from "react";
import axios from "axios";
import { Services } from "./../Redux/Actions/Services"
import NevbarComponent from './NevbarComponents';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

function getOrderData(param) {
    return Services.postService('lotpayment', param).then(
        (response) => {
            if (response.status === 401) {
            }
            else {
                return response;
            }
        }
    );
}

function Payment() {

    const loginUserDetails = JSON.parse(localStorage.getItem('UserDetails'))

    async function showRazorpay() {
        const __DEV__ = document.domain === 'localhost';

        const src = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!src) {
            console.log('Razorpay script failed to load.');
            // alert('Razorpay script failed to load.');
            return;
        }

        const param = {
            customerId: 4,
            lotId: 1
        }

        const orderDetails = await getOrderData(param);

        if (orderDetails?.orderDetails.id) {
            const options = {
                key: __DEV__ ? "rzp_test_lhYz1V2MQpcLCZ" : 'Production key',
                amount: orderDetails.orderDetails.amount_due,
                currency: orderDetails.orderDetails.currency,
                name: orderDetails.lotDetails.title,
                description: "Pay for lot",
                image: {},
                order_id: orderDetails.orderDetails.id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: 'order_id',
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post("http://localhost:5000/payment/success", data);

                    alert(result.data.msg);
                },
                prefill: {
                    name: loginUserDetails.name,
                    email: loginUserDetails.email,
                    contact: loginUserDetails.contact,
                },
                notes: {
                    address: "Soumya Dey Corporate Office",
                },
                theme: {
                    color: "#61dafb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        else {
            alert('Something Wrong Happened, Try After Some Time.')
        }
    }

    return (
        <div >
            <NevbarComponent />
            <p>Buy React now!</p>
            <button className="" onClick={showRazorpay}>
                Pay ₹500
            </button>
        </div>
    );
}

export default Payment;