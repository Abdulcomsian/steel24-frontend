import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { getDate } from "../../Redux/Constants";
import { Tag } from "antd";
import { log } from "util";
import loading from "../../assets/images/Group.svg";
import { CiStopwatch } from "react-icons/ci";

// const CustomCountdown = (endDate) => {
//   // Calculate the remaining time

//   // Custom renderer for the countdown
//   const renderer = ({ days, hours, minutes, seconds, completed }) => {
//     if (completed) {
//       return <span>Countdown completed!</span>;
//     } else {
//       return (
//         <div>
//           <span>{days} days</span>
//           <span>{hours} hours</span>
//           <span>{minutes} minutes</span>
//           <span>{seconds} seconds</span>
//         </div>
//       );
//     }
//   };

//   return <Countdown date={endDate} renderer={renderer} />;
// };

function CountdownComponent(props) {
  const [endDate, setEndDate] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lot, setLot] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const targetTime = new Date(endDate).getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 60000 && timeDifference > 0) {
        setIsBlinking(true);
      } else {
        setIsBlinking(false);
      }

      if (timeDifference <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  useEffect(() => {
    if (props?.lot) {
      setLot(props?.lot);
      if (props?.lot?.lot_status === "Upcoming") {
        setEndDate(new Date(getDate(props?.lot?.StartDate)));
      } else {
        setEndDate(new Date(getDate(props?.lot?.EndDate)));
      }
    }
  }, [props?.lot]);

  const calculateTimeDelta = (data) => {
    return (
      <div>
        {data?.total > 0 ? (
          data?.days > 0 ? (
            <>
              <span>{data?.days}d :</span>
              <span> {data?.hours}hr :</span>
              <span> {data?.minutes}m</span>
            </>
          ) : data?.hours >= 26 ? (
            <>
              <span>{data?.days}d :</span>
              <span> {data?.hours}hr :</span>
              <span> {data?.minutes}m </span>
            </>
          ) : (
            <>
              {data?.hours != 0 ? <span> {data?.hours}hr</span> : " "}
              <span> {data?.minutes}m :</span>
              <span> {data?.seconds}s </span>
            </>
          )
        ) : (
          "00:00:00"
        )}
      </div>
    );
  };

  return (
    <>
      {lot?.EndDate ? (
        <div
          className={isBlinking ? "detail-section blinker" : "detail-section"}
        >
          <CiStopwatch size={28} />
          <h3>Time Left:</h3>
          <p>
            <Countdown
              date={endDate}
              renderer={calculateTimeDelta}
              daysInHours
            />
          </p>
        </div>
      ) : (
        // <Countdown
        //   date={endDate}
        //   renderer={calculateTimeDelta}
        //   daysInHours
        //   className={isBlinking ? "tag_text blinker" : "tag_text"}
        // />
        "00:00:00"
      )}
      {/* <Tag
        style={{
          backgroundColor: "rgb(241 214 228)",
        }}
        className={isBlinking ? "tag_text blinker" : "tag_text"}
      >
        <div className="d-flex">
          ₹{" "}
          {props?.lot?.bids?.length > 0
            ? parseInt(props?.lot?.bids[0]?.amount).toLocaleString()
            : parseInt(lot?.Price).toLocaleString()}
          /mt &nbsp;&nbsp;
          <img src={loading} style={{ width: "15px" }} />
          &nbsp;
          {lot?.EndDate ? (
            <Countdown
              date={endDate}
              renderer={calculateTimeDelta}
              daysInHours
            />
          ) : (
            "00:00:00"
          )}
        </div>
      </Tag> */}
    </>
  );
}

export default CountdownComponent;
