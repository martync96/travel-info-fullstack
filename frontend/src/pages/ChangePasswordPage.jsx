import { useState } from 'react';

const ChangePasswordPage = () => {
    
    //states for user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    //state handlers
    const handleEmail = (e) => {setEmail(e.target.value)};
    const handlePassword = (e) => {setPassword(e.target.value)};
    const handleNewPassword1 = (e) => {setNewPassword1(e.target.value)};
    const handleNewPassword2 = (e) => {setNewPassword2(e.target.value)};

    const handleSubmit = async (e) => {
        e.preventDefault();
        (newPassword1 === newPassword2) ? submitDetails() : alert("Passwords do not match"); //if the passwords match, call submit function, else alert the user
    };

    const submitDetails = async () => {
        const data = {
            email: email, 
            password: password,
            newPassword: newPassword1,
        }
        try{    
            axios.post(`http://localhost:4000/changePassword`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token') //send the token in the header for verification
                }
            }).then((response) => {
                console.log(response)
                if(response.status === 200) {
                    alert("Password Changed Successfully");
                }
            }); //
        }catch(e){

        };
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                    </div>
                    <div className="col-8 d-flex justify-content-center">
                        <form className="signup-form w-75">
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
                                <label htmlFor="exampleInputPassword1" className="form-label-signup">Enter Your New Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleNewPassword1} />
                            </div>
                            <div className="form-group d-flex flex-column align-items-center mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label-signup">Enter Your New Password Again</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleNewPassword2} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;