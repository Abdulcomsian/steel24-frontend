import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { userDetailsUpdateAction, getUserDetailsAction } from '../Redux/Actions/Actions'
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import FixComponents from "./FixComponents";
// import fs from 'fs';

function UserProfileController(props) {
    const [userFormData, setUserFormData] = useState();
    const [invalidData, setInvalidData] = useState(false);
    const [imgList, setImgList] = useState(false);
    
    useEffect(() => {
        props.getUserDetailsAction();
    }, [])

    useEffect(() => {
        if (props.loginUserDetailsReducer?.loginUserDetails) {
            setUserFormData(props.loginUserDetailsReducer.loginUserDetails);
            setImgList({
                'gst_img': props.loginUserDetailsReducer.loginUserDetails.gst_img,
                'aadhar_img': props.loginUserDetailsReducer.loginUserDetails.aadhar_img,
                'pan_img': props.loginUserDetailsReducer.loginUserDetails.pan_img,
            })
        }
    }, [props?.loginUserDetailsReducer])

    const onFormUpdate = (event) => {
        if (event.target.type === 'file') {
            setUserFormData({ ...userFormData, [event.target.name]: event.target.files[0] });
        }
        else {
            setUserFormData({ ...userFormData, [event.target.name]: event.target.value.toUpperCase() });
        }
        setInvalidData(null)
    }

    const onSaveForm = (event) => {
        event.preventDefault()
        if (userFormData.contactNo.length !== 10) {
            setInvalidData('invalid Contact No.');
        }
        else if (userFormData.GSTNo.length !== 15) {
            setInvalidData('invalid GST No.');
        }
        else if (userFormData.PanNo.length !== 10) {
            setInvalidData('invalid Pan No.');
        }
        else if (userFormData.adharNo.length !== 12) {
            setInvalidData('invalid Aadhaar No. ');
        }

        else if (userFormData.pincode.length !== 6) {
            setInvalidData('invalid Pincode No. ');
        }
        else {
            let formdata = new FormData();
            formdata.append("name", userFormData.name);
            formdata.append("email", userFormData.email);
            formdata.append("contactNo", userFormData.contactNo);
            formdata.append("adharNo", userFormData.adharNo);
            formdata.append("GSTNo", userFormData.GSTNo);
            formdata.append("PanNo", userFormData.PanNo);
            formdata.append("address", userFormData.address);
            formdata.append("city", userFormData.city);
            formdata.append("state", userFormData.state);
            formdata.append("pincode", userFormData.pincode);
            formdata.append("compnyName", userFormData.compnyName);
            formdata.append("gst_img", userFormData.gst_img);
            formdata.append("pan_img", userFormData.pan_img);
            formdata.append("aadhar_img", userFormData.aadhar_img);
            // userFormData.GST_bill = document.getElementsByName('GST_bill');
            // userFormData.PAN_card = document.getElementsByName('PAN_card');
            // userFormData.Adhar_card = document.getElementsByName('Adhar_card');
            props.onUserDetailsUpdateAction(userFormData.id, formdata);
        }
    }

    return (
        <div className="">
            {/* <HomeComponent /> */}
            <div className="border-light card  shadow  p-0 m-2 mb-7 " id="tabs-icons-text-2" role="tabpanel"
                aria-labelledby="tabs-icons-text-2-tab">
                <div className="p-0 m-2">
                    <div className="card ">
                        {invalidData &&
                            <div className="alert alert-default bg-warning fade show" role="alert">
                                <span className="alert-inner--text"><strong>{invalidData} </strong></span>
                            </div>}
                        {props?.loginUserDetailsReducer?.update &&
                            <FixComponents />
                        }
                        <form onSubmit={onSaveForm} >
                            <div className="card-header bg-light h6 d-flex justify-content-between ">
                                <span className="card-title m-0">Profile Details</span>
                                <button type="submit" className="btn btn-primary btn-sm mr-3">Save</button>
                            </div>
                            {props.loginUserDetailsReducer?.loginUserDetails ?

                                <div className="card-body ">
                                    <h5 className="d-block font-weight-bold ">Personal Details</h5>
                                    <div className="row">
                                        <div className="col-lg-10 col-lg-10 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Full Name</small>
                                            <div className="form-group">
                                                <input type="text" name="name" className="form-control"
                                                    value={userFormData ? userFormData.name : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Email Id</small>
                                            <div className="form-group">
                                                <input type="emil" name="email" className="form-control"
                                                    value={userFormData ? userFormData.email : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Contact Number</small>
                                            <div className="form-group">
                                                <input type="number" name="contactNo" className="form-control"

                                                    value={userFormData ? userFormData.contactNo : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="d-block font-weight-bold ">Card Details</h5>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">GST Number</small>
                                            <div className="form-group">
                                                <input type="text" name="GSTNo" className="form-control"
                                                    value={userFormData ? userFormData.GSTNo : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">GST Image</small>
                                            <div className="form-group">
                                                <input type="file" accept="image/png, image/jpeg" name="gst_img" className="form-control"
                                                    onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">PAN Number</small>
                                            <div className="form-group">
                                                <input type="text" name="PanNo" className="form-control" minLength="10"
                                                    value={userFormData ? userFormData.PanNo : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">PAN Card Image</small>
                                            <div className="form-group">
                                                <input type="file" accept="image/png, image/jpeg" name="pan_img" className="form-control"
                                                    onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Aadhaar Card Number</small>
                                            <div className="form-group">
                                                <input type="number" name="adharNo" className="form-control" minLength="12"
                                                    value={userFormData ? userFormData.adharNo : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Aadhaar Card Image</small>
                                            <div className="form-group">
                                                <input type="file" accept="image/png, image/jpeg" name="aadhar_img" className="form-control"
                                                    onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        {imgList &&
                                            <div className="col-lg-10 col-md-10 col-sm-10">
                                                <small className="d-block  font-weight-bold ">Cards</small>
                                                <div className="row">
                                                    {imgList?.gst_img &&
                                                        <div className="col-4">
                                                            <small className="d-block  font-weight-bold  ">GST Number</small>
                                                            <img src={'http://127.0.0.1:8000/files/' + imgList?.gst_img} className="m-1 w-75 h-50 img-thumbnail" />
                                                        </div>}
                                                    {imgList?.pan_img &&
                                                        <div className="col-4">
                                                            <small className="d-block  font-weight-bold  ">PAN Card</small>
                                                            <img src={'http://127.0.0.1:8000/files/' + imgList?.pan_img} className="m-1 w-75 h-50 img-thumbnail" />
                                                        </div>
                                                    }
                                                    {imgList?.aadhar_img &&
                                                        <div className="col-4">
                                                            <small className="d-block  font-weight-bold  ">Aadhaar Card</small>
                                                            <img src={'http://127.0.0.1:8000/files/' + imgList?.aadhar_img} className="m-1 w-75 h-50 img-thumbnail" />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <h5 className="d-block font-weight-bold ">Address Details</h5>
                                    <div className="row">
                                        <div className="col-lg-10 col-lg-10 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Company Name</small>
                                            <div className="form-group">
                                                <input type="text" name="compnyName" className="form-control"
                                                    value={userFormData ? userFormData.compnyName : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-10 col-lg-10 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Address</small>
                                            <div className="form-group">
                                                <textarea type="text" name="address" className="form-control" onChange={onFormUpdate}
                                                    value={userFormData ? userFormData.address : ''} required>{userFormData ? userFormData.address : ''}
                                                    {userFormData ? userFormData.address : ''}
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">City</small>
                                            <div className="form-group">
                                                <input type="text" name="city" className="form-control"
                                                    value={userFormData ? userFormData.city : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">State</small>
                                            <div className="form-group">
                                                <input type="text" name="state" className="form-control"
                                                    value={userFormData ? userFormData.state : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <small className="d-block  font-weight-bold ">Pincode</small>
                                            <div className="form-group">
                                                <input type="number" name="pincode" className="form-control" minLength="6"
                                                    value={userFormData ? userFormData.pincode : ''} onChange={onFormUpdate} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : < div className="alert alert-default bg-warning fade show" role="alert">
                                    <span className="alert-inner--text"><strong>Please Wait, Updating Details. </strong></span>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div >
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
    onUserDetailsUpdateAction: (id, details) => userDetailsUpdateAction(id, details),
    getUserDetailsAction: () => getUserDetailsAction(),

}

export default connect(mapStateToProps, mapDispatchtoProps)(UserProfileController)