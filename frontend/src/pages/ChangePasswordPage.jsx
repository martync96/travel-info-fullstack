import { useState } from 'react';
import NotificationModal from '../components/NotificationModal';
import axios from 'axios';
import EmailValidator from '../functions/EmailValidator.jsx';
import PasswordValidator from '../functions/PasswordValidator.jsx';

const ChangePasswordPage = () => {
    
    //states for user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [validForm, setValidForm] = useState(false); //state for valid form, set to true by default

    //state handlers
    const handleEmail = (e) => {setEmail(e.target.value); validateForm(e.target.value, password, newPassword1, newPassword2)};
    const handlePassword = (e) => {setPassword(e.target.value); validateForm(e.target.value, password, newPassword1, newPassword2)};
    const handleNewPassword1 = (e) => {setNewPassword1(e.target.value); validateForm(e.target.value, password, newPassword1, newPassword2)};
    const handleNewPassword2 = (e) => {setNewPassword2(e.target.value); validateForm(e.target.value, password, newPassword1, newPassword2)};

    //states for modal 
    const [show, setShow] = useState(false); //state to show/hide modal
    const [error, setError] = useState(""); //state to pass error message to the modal 

    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleModal = (error) => {
        setError(error);
        handleShow();   
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(checkPasswords() && validatePasswords() && EmailValidator(email)) {
            submitDetails();
        }
    };

    const checkPasswords = () => {
        if(newPassword1 === newPassword2) {
            return true;
        }
        handleModal("Passwords do not match") 
        return false;       

    };

    const validatePasswords = () => {
        if(PasswordValidator(newPassword1) && PasswordValidator(newPassword2)) {
            return true;
        }
        handleModal("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
        return false;
    }

    const validateForm = (email, password, newPassword1, newPassword2) => {
        setValidForm(email.length > 0 && password.length > 0 && newPassword1.length > 0 && newPassword2.length > 0);
    }

    const submitDetails = async () => {
        const data = {
            email: email, 
            password: password,
            newPassword: newPassword1,
        }
        try{    
           const response = await axios.post(`http://localhost:4000/changePassword`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token') //send the token in the header for verification
                }
            });
                if(response.status === 200) {
                    handleModal("Password Changed Successfully");
            } 
        }catch(e){
            handleModal(e.message);
        };
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8 d-flex justify-content-center">
                        <form className="signup-form w-75" data-testid="change-password-form">
                            <h1 className="text-center">Change Password</h1>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label-signup">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup">Old Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup" data-testid="newpass1">Enter Your New Password</label>
                                <input type="password" className="form-control" id="exampleInputNewPassword1" onChange={handleNewPassword1} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup" data-testid="newpass2">Enter Your New Password Again</label>
                                <input type="password" className="form-control" id="exampleInputNewPassword2" onChange={handleNewPassword2} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit} disabled={!validForm} data-testid="submit">Submit</button>
                        </form>
                    </div>
                    <div className="col-2">
                    </div>
                    <NotificationModal show={show} handleClose={handleClose} error={error} />
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;