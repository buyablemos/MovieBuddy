import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        setErrorUsername(value === '' ? 'Username is required.' : '');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setErrorEmail(value === '' ? 'Email is required.' : '');
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

    return (
        <div className="mt-10 flex items-center justify-center h-full">
            <div className="">
                <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down">
                    <h1 className="text-white">Register Form</h1>
                    <h2 className="text-white">Create a new account</h2>
                </div>
                <form className="overflow-y-auto max-h-[50vh] darkened-background shadow-md rounded px-8 pt-8 pb-8 mb-4 animate-fade-in-up">
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        {changeInput({ data: username, error: errorUsername, handleChange: handleUsernameChange }, 'text', 'Username', 'username')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        {changeInput({ data: email, error: errorEmail, handleChange: handleEmailChange }, 'email', 'Email', 'email')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        {changeInput({ data: password, error: errorPassword, handleChange: handlePasswordChange }, 'password', 'Password', 'password')}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        {changeInput({ data: confirmPassword, error: errorConfirmPassword, handleChange: handleConfirmPasswordChange }, 'password', 'Confirm Password', 'confirm-password')}
                    </div>

                    <button className="mb-4" type="submit">Register</button>

                    <div className="text-center">
                    <span className="text-white">Already have an account? <Link to="/" className="text-blue-500 hover:text-blue-200">Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
