import React, {useState} from 'react';
import {useHistory, useLocation} from "react-router";
import {Toast, TOAST_FAILURE, TOAST_SUCCESS} from "../Common/Toasts/Toast";

export function Login() {

   const location  = useLocation();
   const history = useHistory();

   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [emailIsRequired,setEmailIsRequired] = useState(false);
   const [passwordIsRequired,setPasswordIsRequired] = useState(false);

   const [success,setSuccess] = useState(false);
   const [failure,setFailure] = useState(false);
   const [userMessage,setUserMessage] = useState("");

   function login() {
        if(email === undefined || email === '') {
            setEmailIsRequired(true);
        }
        if(password === undefined || password === '') {
            setPasswordIsRequired(true);
        }

        if(!!email && !!password) {
            if(email.trim() === 'admin' && password.trim() === "Test123#") {
                localStorage.setItem("email",email.trim());
                history.push("/");
            } else {
                console.log('called')
                setUserMessage("Login failed, Try again!")
                setFailure(true)

                setTimeout(
                    function () {
                        setFailure(false)
                    },
                    3000
                );
            }
        }
   }

    return(
        <div className="flex-shrink-0 without-left-menu">
            <div className="login-page__fixed-background"></div>
            <div className="login-page">
                <div className="login-page__right">
                    <div className="container">
                        <div className="row align-items-center login-page__right-row bg-white">
                            <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
                                <div className="card border-0 shadow-none">
                                    <div className="card-body p-sm-5 p-3">
                                        <div className="text-lg-left text-center">
                                                <h2 className="mt-4 mb-0 bold-font text-primary-color">Student Performance Analysis</h2>
                                                <p className="sub-text mt-0">Welcome Back. Please login to your
                                                    account.</p>
                                        </div>
                                        <form className="mt-md-4">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="text" className={!emailIsRequired ? "form-control" : "form-control border-danger"} onChange={(e)=> {
                                                    if(e.target.value === undefined || e.target.value === '') {
                                                        setEmailIsRequired(true)
                                                    } else {
                                                        setEmailIsRequired(false)
                                                    }
                                                    setEmail(e.target.value)}}/>
                                                <small className={!emailIsRequired ? "text-danger d-none" : "text-danger"}><i
                                                    className="fas fa-exclamation-triangle"></i> Email Required
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" className={!passwordIsRequired ? "form-control" : "form-control border-danger"} onChange={(e)=> {
                                                    if(e.target.value === undefined || e.target.value === '') {
                                                        setPasswordIsRequired(true)
                                                    } else {
                                                        setPasswordIsRequired(false)
                                                    }
                                                    setPassword(e.target.value)}}/>
                                                <small className={!passwordIsRequired ? "text-danger d-none" : "text-danger"}><i
                                                    className="fas fa-exclamation-triangle"></i> Password Required
                                                </small>
                                            </div>
                                           
                                            <a type="submit" className="btn btn-primary w-100 mt-3 btn-foreground-white"
                                                role="button" onClick={()=> login()}>Login</a>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                success && <Toast type={TOAST_SUCCESS} message={userMessage}
                                  timeout={3000}/>
            }
            {
                failure && <Toast type={TOAST_FAILURE} message={userMessage}
                                  timeout={3000}/>
            }

        </div>
    );

}