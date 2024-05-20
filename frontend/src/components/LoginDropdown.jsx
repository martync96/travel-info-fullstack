import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailValidator from '../functions/EmailValidator.jsx';
import PasswordValidator from '../functions/PasswordValidator.jsx';
import NotificationModal from './NotificationModal.jsx';

const LoginDropdown = (props) => {

    const [loginDropdown, setLoginDropdown] = useState(false); //state for login dropdown, set to false by default (dropdown is hidden)
    const [email, setEmail] = useState(''); //state for email input
    const [password, setPassword] = useState(''); //state for password input
    const [submit, setSubmit] = useState(false); //state for submit button, used to call login api when true
    const [validForm, setValidForm] = useState(false); //state for valid form, set to true by default
    const [validEmail, setValidEmail] = useState(false); //state for valid email, set to false by default
    const [validPassword, setValidPassword] = useState(false); //state for valid password, set to false by default
    const [error, setError] = useState(""); //state for error message
    const [show, setShow] = useState(false); //state for showing/hiding modal

    const formRef = useRef(); //reference to the login form
    const navigate = useNavigate(); //navigate to change password page

    const handleEmail = (e) => { setEmail(e.target.value); setValidForm(e.target.value.length > 0 && password.length > 0); }; //updates email as input field is changed
    const handlePassword = (e) => { setPassword(e.target.value.trim()); setValidForm(e.target.value.length > 0 && email.length > 0); }; //updates password as input field is changed

    console.log(password)
    //modal handlers
    const handleClose = () => setShow(false); //function to close modal
    const handleShow = () => setShow(true); //function to show modal

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents page re-rendering on submit
        e.stopPropagation(); //prevents event bubbling
        if (validateEmail(email)) {
            setSubmit(true);
        }
    }; //sets submit to true when submit button is clicked

    const handleClick = (e) => { (props.signedIn) ? handleSignOut() : null } //if signed in, sign out, else, open dropdown
    const handleSignOut = () => { props.setSignedIn(false); localStorage.removeItem('token'); localStorage.removeItem('email'); } //sets signedIn to false and destroys token in local storage

    //navigators
    const navigateChangePassword = () => { navigate('/change-password') } //navigates to change password page
    const navigateRegister = () => { navigate('/register') } //navigates to register page

    useEffect(() => {
        const handleClick = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)) { //checks where click event is and sets loginDropdown to false if anywhere other than the form
                setLoginDropdown(false);
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    useEffect(() => {
        if (submit) {
            const loginData = {
                email: email,
                password: password
            }
            axios.post(`http://localhost:4000/login`, loginData)
                .then(response => {
                    if (response.status === 200) { //if login is successful
                        localStorage.setItem('token', response.data.token); //save token in local storage
                        localStorage.setItem('email', email); //save email in local storage
                        props.setSignedIn(true); //set signedIn to true
                    }
                }).catch(error => { console.log('Error:', error.message) }); //log error if login is unsuccessful, change to report back to front end
            setSubmit(false); //reset submit to false
        }
    }, [submit]); //call login api when submit button is clicked

    return (
        <>
            <div className="btn-group">
                <button type="button" className={`btn sign-in-button btn-danger dropdown-toggle ${loginDropdown ? 'hide-element' : ` `}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={handleClick}>
                    {props.signedIn ? 'Logout' : 'Sign In'}
                </button>
                <ul className={`dropdown-menu ${loginDropdown ? 'show' : ''}`} data-testid="login-dropdown">
                    <form className="login-form " ref={formRef}> {/*gets reference to the login form*/}
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" onChange={handleEmail} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} /> {/*trims password input*/}
                        </div>
                        <div className="mb-3">
                            <small id="emailHelp" className="form-text text-muted" onClick={navigateChangePassword}>Forgotten Your Password?</small>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary" data-testid="submit-form" disabled={validForm ? false : true} onClick={handleSubmit}>Submit</button>
                        </div>
                        <div className="mb-3">
                            <small id="emailHelp" className="form-text text-muted" onClick={navigateRegister}>Don't have an account? register with us here</small>
                        </div>
                    </form>
                </ul>
            </div>
            <NotificationModal show={show} handleClose={handleClose} error={error} />
        </>
    );
};

export default LoginDropdown;