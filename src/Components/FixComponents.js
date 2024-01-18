import React, { useEffect, useState } from "react";

const FixComponents = (props) => {

    if (props.comp === 'NoData') {
        return <div className="alert bg-gradient-gray text-center w-100 mx-3">
            <span className="alert-inner--text"><strong>No record found.</strong>
            </span>
        </div>;
    } else {
        return <div className="alert bg-gradient-gray text-center w-100 mx-3">
            <span className="alert-inner--text"><strong>Please Wait.</strong>
            </span>
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>;
    }




};

export default FixComponents