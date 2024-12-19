import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RadioGenderHorizontalList from '../GenderRadioList.tsx'
import Popup from '../Popup.tsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type RegisterProps = {
    data: string;
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [registrationError, setRegistrationError] = useState('');
    const [popupVisible, setPopupVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setErrorUsername(value === '' ? 'Username is required.' : '');
    };
    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrorEmail(value === '' ? 'Email is required.' : '');
        if(errorEmail==''&&!isValidEmail(value)) {
            setErrorEmail('Please enter a valid email address');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setErrorPassword(value === '' ? 'Password is required.' : '');
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setErrorConfirmPassword(value !== password ? 'Passwords do not match.' : '');
    };


    const handleGenderChange = (value: string):void => {
        setSelectedGender(value);
    };

    const changeInput = ({ data, error, handleChange }: RegisterProps, type: string, placeholder: string, id: string): JSX.Element => {
        return (
            <div>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline ${
                        error ? 'border-red-500' : 'border-gray-700'
                    }`}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={data}
                    onChange={handleChange}
                />

                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;

        if (errorUsername!="") {
            valid = false;
        }

        if (errorEmail!="") {
            valid = false;
        }

        if (errorPassword!="") {
            valid = false;
        }

        if (!selectedGender) {
            setRegistrationError("Please select your gender.");
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            const response = await axios.post('http://${import.meta.env.VITE_IP}:${import.meta.env.VITE_PORT}/register', {
                username,
                email,
                password,
                gender: selectedGender,
            });
            console.log('Registration successful:', response.data);
            //Reset po pszesłaniu
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setSelectedGender(null);
            setPopupVisible(true)
        } catch (error) {
            console.error('Error registering:', error);
            if (axios.isAxiosError(error)) {
                setRegistrationError(error.response?.data?.error || 'An error occurred');
            } else if (error instanceof Error) {
                setRegistrationError(error.message);
            } else {
                setRegistrationError('An unknown error occurred');
            }
        }
    };



    return (
        <div className="flex items-center justify-center h-full">
            <div className="">
                <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down">
                    <h1 className="text-white">Register Form</h1>
                    <h2 className="text-white">Create a new account</h2>
                </div>
                <form
                    className="overflow-y-auto max-h-[60vh] darkened-background shadow-md rounded px-8 pt-8 pb-8 mb-4 animate-fade-in-up">
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        {changeInput({
                            data: username,
                            error: errorUsername,
                            handleChange: handleUsernameChange
                        }, 'text', 'Username', 'username')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        {changeInput({
                            data: email,
                            error: errorEmail,
                            handleChange: handleEmailChange
                        }, 'email', 'Email', 'email')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        {changeInput({
                            data: password,
                            error: errorPassword,
                            handleChange: handlePasswordChange
                        }, 'password', 'Password', 'password')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        {changeInput({
                            data: confirmPassword,
                            error: errorConfirmPassword,
                            handleChange: handleConfirmPasswordChange
                        }, 'password', 'Confirm Password', 'confirm-password')}
                    </div>

                    <RadioGenderHorizontalList selectedGender={selectedGender} onGenderChange={handleGenderChange}>
                    </RadioGenderHorizontalList>

                    <button className="custom-button" type="submit" onClick={handleSubmit}>Register</button>

                    <div className="text-center">
                        <span className="text-white">Already have an account? <Link to="/login"
                                                                                    className="text-blue-500 hover:text-blue-200">Login</Link></span>
                    </div>
                    {registrationError && <p className="text-red-500 text-xs italic">{registrationError}</p>}
                    {registrationError && (
                        <Popup
                            message={registrationError}
                            onClose={() => setRegistrationError("")}
                        />
                    )}
                    {popupVisible && (
                        <Popup
                            message="You have successfully registered!"
                            onClose={()=>navigate('/')}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default Register;
