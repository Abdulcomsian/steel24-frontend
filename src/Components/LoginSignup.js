import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signUpAction, loginAction, loginWithGoogleAction } from "../Redux/Actions/Actions";
import { useNavigate } from 'react-router-dom';
import FooterComponent from "./FooterComponent";
import NevbarComponents from "./NevbarComponents";
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";

function LoginSignup(props) {

    const [showSignupForm, setShowSignupForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [errorMesssage, setErrorMesssage] = useState(null);

    const navigate = useNavigate();
    const GoogleLoginclientId = '922499495738-5efk0d3muojivjqkc1iq81nbqfj1p7sh.apps.googleusercontent.com';

    // set Form Data 
    const onFormUpdate = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    // Login with Google
    const responseGoogle = (response) => {
        console.log(response);
        props.loginWithGoogleAction({
            'email': response.profileObj.email,
            'googleId': response.profileObj.googleId,
            'name': response.profileObj.name
        })
    }

    // Login Signup Submit
    function formSubmit(event) {
        event.preventDefault();
        if (showSignupForm) {
            if (formData.password === formData.cpassword) {
                props.signUpAction(formData);
            }
            else {
                setErrorMesssage('Password not matched.');
            }
        }
        else {
            props.loginAction(formData);
        }
    }

    // Login Signup Responce Handle
    useEffect(() => {
        if (props.loginUserDetailsReducer?.loginUserDetails) {
            navigate('/Dashboard');
            window.location.reload();
        }
        else if (props.loginUserDetailsReducer.Error || props.loginUserDetailsReducer.error) {
            if (props.loginUserDetailsReducer.Error.error === "invalid_credentials") {
                setErrorMesssage('Invalid Credentials')
            } else {
                setErrorMesssage(props.loginUserDetailsReducer.Error.message)
            }
        }
    }, [props?.loginUserDetailsReducer])

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({
                client_id: GoogleLoginclientId,
                cookiepolicy: 'single_host_origin',
                plugin_name: 'hello' //any name can be used
            })

        })
    }, [])
    return (
        <div className="">
            <NevbarComponents />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card bg-secondary shadow border-0">
                            <div className="card-header bg-white">
                                <div className="btn-wrapper text-center p-3">

                                <GoogleLogin
                                        clientId='922499495738-5efk0d3muojivjqkc1iq81nbqfj1p7sh.apps.googleusercontent.com'
                                        buttonText="Login"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} className="btn btn-neutral btn-icon shadow" disabled={renderProps.disabled}><span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span><span className="btn-inner--text"> Continue With Google </span></button>
                                        )}
                                        plugin_name='hello' //any name can be used
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>
                            </div>
                            <div className="card-body text-center px-lg-5 py-lg-3   ">
                                {errorMesssage &&
                                    <div className="alert alert-default bg-warning fade show" role="alert">
                                        <span className="alert-inner--text"><strong>{errorMesssage}</strong></span>
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                }
                                <form role="form" onSubmit={formSubmit}>
                                    {showSignupForm ? <>
                                        <h4> SignUp</h4>
                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-hat-3"></i></span>
                                                </div>
                                                <input className="form-control" name="name" placeholder="Name" type="text" onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                    </>
                                        :
                                        <h4>Login</h4>

                                    }
                                    <div className="form-group mb-3">
                                        <div className="input-group input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                            </div>
                                            <input className="form-control" placeholder="Email" type="email" name="email" onChange={onFormUpdate} required />
                                        </div>
                                    </div>
                                    <div className="form-group focused">
                                        <div className="input-group input-group-alternative">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input className="form-control" placeholder="Password" type="password" name="password" onChange={onFormUpdate} required />
                                        </div>
                                    </div>
                                    {showSignupForm &&
                                        <div className="form-group focused">
                                            <div className="input-group input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input className="form-control" placeholder="Confirm password" type="password" name="cpassword" onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                    }
                                    <div className="mb-2">
                                        {props.loginUserDetailsReducer.Loading
                                            ?
                                            <button type="submit" className="btn btn-primary my-4">Please Wait</button>
                                            : <>
                                                <button type="submit" className="btn btn-primary my-2">{showSignupForm ? "Sign in" : "Login"}</button>
                                                {/* <Link to={'/'} className="btn btn-danger my-2">Back</Link> */}
                                            </>
                                        }
                                    </div>
                                    {!showSignupForm ?
                                        <>
                                            <h6>Don't have an account yet?</h6>
                                            <div className="btn-wrapper p-3">
                                                <button type="button" className="btn btn-neutral btn-icon" onClick={() => setShowSignupForm(true)}>
                                                    <span className="btn-inner--text" >SignUp</span>
                                                </button>
                                            </div>
                                        </>
                                        : <>
                                            <h6>already have account?</h6>
                                            <div className="btn-wrapper p-3">
                                                <button type="button" className="btn btn-neutral btn-icon" onClick={() => setShowSignupForm(false)}>
                                                    <span className="btn-inner--text" >Login</span>
                                                </button>
                                            </div>
                                        </>
                                    }
                                </form>
                                {/* <h6>OR</h6> */}
                                {/* <div className="btn-wrapper p-3">

                                    <GoogleLogin
                                        clientId='922499495738-5efk0d3muojivjqkc1iq81nbqfj1p7sh.apps.googleusercontent.com'
                                        buttonText="Login"
                                        render={renderProps => (
                                            <button onClick={renderProps.onClick} className="btn btn-neutral btn-icon" disabled={renderProps.disabled}><span className="btn-inner--icon"><img src="../assets/img/icons/common/google.svg" /></span><span className="btn-inner--text"> Continue With Google </span></button>
                                        )}
                                        plugin_name='hello' //any name can be used
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div> */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
            
        </div >
    )

}

const mapStateToProps = (state) => {
    return {
        loginUserDetailsReducer: state.loginUserDetailsReducer,
    }
}

const mapDispatchtoProps = {
    signUpAction: (details) => signUpAction(details),
    loginAction: (details) => loginAction(details),
    loginWithGoogleAction: (details) => loginWithGoogleAction(details),
}

export default connect(mapStateToProps, mapDispatchtoProps)(LoginSignup)