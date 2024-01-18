import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NevbarComponent from "./NevbarComponents";

export default function HeaderComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props?.loginUserDetailsReducer?.length) {
            // navigate('/')
        }
    }, [props?.loginUserDetailsReducer])

    return (
        <>
            {/* <NevbarComponent /> */}
            <div className="d-flex justify-content-around p-3 bg-light" >
                <Link className={"btn w-100 px-0 " + (window.location.pathname === '/' ? 'btn-primary' : 'bg-lighter')} to={'/'}>Dashboard</Link>
                {/* <Link className={"btn w-100 px-0 " + (window.location.pathname === '/alllots' ? 'btn-primary' : 'bg-lighter')} to={'/alllots'}>Dashboard</Link> */}

                <Link className={"btn w-100 px-0 " + (window.location.pathname === '/live' ? 'btn-primary' : 'bg-lighter')} to={'/live'}>Live</Link>

                <Link className={"btn w-100 px-0 " + (window.location.pathname === '/sold' ? 'btn-primary' : 'bg-lighter')} to={'/sold'}>Sold</Link>

                <Link className={"btn w-100 px-0 " + (window.location.pathname === '/expired' ? 'btn-primary' : 'bg-lighter')} to={'/expired'}>Expired</Link>

            </div>
        </>)
}

const mapStateToProps = (state) => {
    return {
        loginUserDetails: state.loginUserDetailsReducer.loginUserDetails,
    }
}
const mapDispatchtoProps = {
}
connect(mapStateToProps, mapDispatchtoProps)(HeaderComponent)