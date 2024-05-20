import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationModal from '../components/NotificationModal.jsx';
import EmailValidator from '../functions/EmailValidator.jsx';
import PasswordValidator from '../functions/PasswordValidator.jsx';

const RegisterUserPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [show, setShow] = useState(false); //state to show/hide modal
    const [error, setError] = useState(""); //state to pass error message to the modal 
    const [validForm, setValidForm] = useState(false); //state for valid form, set to true by default
    const [passwordsMatch, setPasswordsMatch] = useState(false); //state to check if passwords match

    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleEmail = (e) => { setEmail(e.target.value); validateForm(e.target.value, password, password1)};
    const handlePassword = (e) => { setPassword(e.target.value); validateForm(email, e.target.value, password1)};
    const handlePassword1 = (e) => { setPassword1(e.target.value); validateForm(email, password, e.target.value)};

    useEffect(() => {
        setPasswordsMatch(password === password1);
    }, [password, password1])

    const handleModal = (error) => {
        setError(error);
        handleShow();   
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateDetailsToSubmit(email, password, password1)) {
            submitDetails();
        }
    };

    const submitDetails = async () => {
        const data = {
            email: email,
            password: password,
        }
        try {
            await axios.post(`http://localhost:4000/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if (response.status === 200) {
                    handleModal("User registered successfully");
                }
            })
        } catch (e) {
           handleModal(e.message);
        };
    };

    const validateForm = (email, password, password1) => {
        setValidForm(email.length > 0 && password.length > 0 && password1.length > 0);
    }

    const validateDetailsToSubmit = (email, password, password1) => {
        if(!EmailValidator(email)){
            handleModal("Invalid Email Address");
            return false;
        }else if(!PasswordValidator(password) && (password !== password1)){
            handleModal("Invalid Password");
            return false;
        }

        return true;
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8 d-flex justify-content-center">
                        <form className="signup-form w-75">
                            <h1 className="text-center register-header">Register New User</h1>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label-signup">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3 register-enter-pwd">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup">Enter Your Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup">Enter Your Password Again </label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword1} />
                            </div>
                            <button type="submit" className="btn btn-primary register-btn" disabled={!validForm} onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                    <div className="col-2">
                    <NotificationModal show={show} handleClose={handleClose} error={error} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default RegisterUserPage;