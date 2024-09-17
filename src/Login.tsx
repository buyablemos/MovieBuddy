import { Link } from 'react-router-dom';
import React, { useState } from 'react';

type LoginProps = {
    data: string;
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');

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


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="pt-20">
                <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down" >
                    <h1 className="text-white">Login Form</h1>
                    <h2 className="text-white"> Please login to the system</h2>
                </div>
                <form className="darkened-background shadow-md rounded px-8 pt-8 pb-8 mb-4 animate-fade-in-up">
                    <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                        {changeUsernameInput({data: username, error: error2, handleChange: handleUsernameChange })}
                    </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    {changePasswordInput({data: password, error: error, handleChange: handlePasswordChange })}
            </div>
            <div className="tems-center justify-between mb-4">
                <label className="block text-gray-400 font-bold text-center">
                    <input type="checkbox"/>
                    <span className="text-sm px-3 mb-4">
                        Remember Me</span>
                </label>
            </div>
            <button className="mb-4" type="submit">Login</button>
                <div className="items-center justify-between">
                    <span className="text-white">New here? <Link to="/register" className="text-blue-500 hover:text-blue-200">Create an account</Link></span>
                </div>
            </form>
            </div>
        </div>


    )
;
};

export default Login;