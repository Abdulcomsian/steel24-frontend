import React, { useEffect, useState } from "react";

const UseCountdown = ({ startDate, endDate }) => {
    const countDownDate = new Date(endDate).getTime();
    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    if (new Date(startDate) > new Date() && days + hours + minutes + seconds >= 0)
        return <li className="nav-item p-0 bg-primary text-white border px-3" >Not Started.</li >
    else if (days + hours + minutes + seconds <= 0) {
        return <li className="nav-item p-0 bg-primary text-white border px-3" >Expired.</li>
    } else {
        return <div className="show-counter">
            {/* <span>{days} : {hours} : {minutes} : {seconds}</span> */}
            < li className="nav-item p-0 bg-primary text-white border m-0 px-3" > Time Left : {hours} H  - {minutes} M  - {seconds} S</li>
        </div>

    }
};
    
export default UseCountdown