import React, { useEffect, useState } from "react";

const ShowCurrentTime = () => {
    const [currentTIme, setCurrentTIme] = useState(null);

    setInterval(() => {

        var today = new Date();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var year = today.getFullYear();

        var hour = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
        var minute = today.getMinutes();
        var seconds = today.getSeconds();
        var milliseconds = today.getMilliseconds();
        setCurrentTIme(day + '/' + month + '/' + year + ' - ' + hour + ' : ' + minute + ' : ' + seconds);

    }, 1000);

    return <button className="bg-default btn text-white px-5" > {currentTIme}</button>;





};

export default ShowCurrentTime