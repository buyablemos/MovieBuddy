import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup'
import { useNavigate } from 'react-router-dom';
import {GoogleOAuthProvider, GoogleLogin, CredentialResponse} from '@react-oauth/google';
import {JwtPayload, jwtDecode } from "jwt-decode";

type LoginProps = {
    data: string;
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomJwtPayload extends JwtPayload {
    email: string;
}

const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [usermail, setUsermail] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [loginError, setLoginError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const [googleError, setGoogleError] = useState(false);


    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value === '') {
            setError('Please choose a password.');
        } else {
            setError('');
        }
    };
    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        if (value === '') {
            setError2('Please choose an username.');
        } else {
            setError2('');
        }
    };

    const changePasswordInput = ({ data, error, handleChange }: LoginProps): JSX.Element => {
        return (
            <div>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${
                        error ? 'border-red-500' : 'border-gray-700'
                    }`}
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={data}
                    onChange={handleChange}
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        );
    };
    const changeUsernameInput = ({ data, error, handleChange }: LoginProps): JSX.Element => {
        return (
            <div>
                <input
                    className={`className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                            ${
                        error ? 'border-red-500' : 'border-gray-700'
                    }`}
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={data}
                    onChange={handleChange}
                />
                {error2 && <p className="text-red-500 text-xs italic">{error2}</p>}
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;

        if (error!="") {
            valid = false;
        }

        if (error2!="") {
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username,
                password
            });
            localStorage.setItem('user', response.data.username);
            if (rememberMe) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }
            navigate('/dashboard');

        } catch (error) {
            console.error('Error registering:', error);
            if (axios.isAxiosError(error)) {
                setLoginError(error.response?.data?.error || 'An error occurred');
            } else if (error instanceof Error) {
                setLoginError(error.message);
            } else {
                setLoginError('An unknown error occurred');
            }
        }
    };

    const handleGoogleLoginError = () => {
        console.log('Google Login Failed');
    };

    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {


            if(credentialResponse.credential) {
                const decoded: CustomJwtPayload = jwtDecode(credentialResponse.credential);
                const email = decoded.email;
                const googleId = decoded.sub;
                setUsermail(email);


                try {
                    const response = await axios.post('http://127.0.0.1:5000/login-google', {
                        email,
                        googleId,
                    });

                    if (response.data.success) {
                        localStorage.setItem('user', response.data.username);
                        if (rememberMe) {
                            localStorage.setItem('token', response.data.token);
                        } else {
                            sessionStorage.setItem('token', response.data.token);
                        }
                        navigate('/dashboard');
                    } else {
                        setGoogleError(true)
                    }
                } catch (error) {
                    console.log('Login failed:', error);
                }
            }
            else{
                console.error("Credential from Google is undefined");
            }


    };


    return (
        <div className="flex items-center justify-center h-full">
            <div className="">
                <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down">
                    <h1 className="text-white ">Login Form</h1>
                    <h2 className="text-white">Login to your account</h2>
                </div>
                <form
                    className="overflow-y-auto max-h-[60vh] darkened-background shadow-md rounded px-8 pt-8 pb-8 mb-4 animate-fade-in-up">
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        {changeUsernameInput({data: username, error: error2, handleChange: handleUsernameChange})}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        {changePasswordInput({data: password, error: error, handleChange: handlePasswordChange})}
                    </div>
                    <div className="tems-center justify-between mb-4">
                        <label className="block text-gray-400 font-bold text-center">
                            <input type="checkbox" checked={rememberMe}
                                   onChange={(e) => setRememberMe(e.target.checked)}/>
                            <span className="text-sm px-3 mb-4">
                        Remember Me</span>
                        </label>
                    </div>
                    <button className="custom-button" type="submit" onClick={handleSubmit}>Login</button>
                    <div className="items-center justify-between mb-4">
                        <span className="text-white">New here? <Link to="/register"
                                                                     className="text-blue-500 hover:text-blue-200">Create an account</Link></span>
                    </div>
                    <GoogleOAuthProvider clientId={clientId}>
                        <div>
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={handleGoogleLoginError}
                            />
                        </div>
                    </GoogleOAuthProvider>
                </form>

            </div>
            {googleError && (
                <Popup
                    message={'No users in database with your Google mail: ' + usermail + " . Please register first!"}
                    onClose={() => {
                        setGoogleError(false)
                    }}

                />
            )}
            {loginError && (
                <Popup
                    message={loginError}
                    onClose={() => {
                        setLoginError("")
                    }}

                />
            )}
        </div>


    )
        ;
};

export default Login;