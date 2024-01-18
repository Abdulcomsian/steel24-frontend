import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import NevbarComponents from "./NevbarComponents";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function HomeComponent(props) {

    const navigate = useNavigate();

    useEffect(() => {

        if (!props.loginUserDetailsReducer.loginUserDetails) {
            navigate('/')
        }

    }, [props?.loginUserDetailsReducer])

    return (
        <div className="">
            <NevbarComponents />
            {props.loginUserDetailsReducer && props.loginUserDetailsReducer.loginUserDetails ?
                <>
                    <HeaderComponent />
                    {/* <FooterComponent /> */}
                </>
                : <div className="alert alert-default bg-warning fade show" role="alert">
                    <span className="alert-inner--text"><strong>User is not login, Or session timeout please login again.</strong></span>
                </div>
            }
            {/* <FooterComponent /> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginUserDetailsReducer: state.loginUserDetailsReducer,
    }
}
const mapDispatchtoProps = {
}

export default connect(mapStateToProps, mapDispatchtoProps)(HomeComponent)