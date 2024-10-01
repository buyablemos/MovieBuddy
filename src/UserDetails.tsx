import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Popup from "./Popup.tsx";

interface User {
    username: string;
    email: string;
    gender: string;
    age: number;
    occupation: string;
    zipcode: string;
}

type changeInputProps = {
    data: string;
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UserDetails: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [errorInfo, setErrorInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorEmail, setErrorEmail] = useState('');
    const [returnMessage, setReturnMessage] = useState('');

    const [email, setEmail] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [age, setAge] = useState<number | string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>('');

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

    const changeInput = ({ data, error, handleChange }: changeInputProps, type: string, placeholder: string, id: string): JSX.Element => {
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

    const fetchUserData = async () => {
        const username = localStorage.getItem('user'); // Załóżmy, że przechowujesz nazwę użytkownika
        if (!username) return;

        try {
            const response = await axios.get(`http://127.0.0.1:5000/users/${username}`);
            setUser(response.data);
            setEmail(response.data.email);
            setGender(response.data.gender);
            setAge(response.data.age);
            setOccupation(response.data.occupation);
            setZipcode(response.data.zipcode);
        } catch (error) {
            console.error(error);
            setErrorInfo('Failed to fetch user data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        const username = localStorage.getItem('user');
        if (!username) return;
        if (errorEmail!='') return;

        e.preventDefault()
        try {
            const response = await axios.put(`http://127.0.0.1:5000/users/${username}`, {
                email,
                gender,
                age,
                occupation,
                zipcode,
            });
            setReturnMessage(response.data.message)
        } catch (error) {
            console.error(error);
            setErrorInfo('Failed to update user data.');
        }
        fetchUserData();
    };

    if (loading) return <h1 className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white">Loading...</h1>;
    if (errorInfo) return (
        <div>
        <h1 className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white">{errorInfo}</h1>
        <h2 className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 animate-fade-in-down text-white"> Refresh the page and try one more time</h2>
        </div>);

    return (
        <div className="darkened-background shadow-md rounded pt-1 pb-1 mb-4 text-white">
            <h1 className="animate-fade-in-down">User Details</h1>
            <form
                className="overflow-y-auto max-h-[70vh] darkened-background shadow-md rounded px-8 pt-8 pb-8 mb-4 animate-fade-in-up">
                <div className="mb-4">
                    <label className="block text-gray-200 text-2xl font-bold mb-2" htmlFor="username">
                        Username: {user?.username}
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    {changeInput({
                        data: email,
                        error: errorEmail,
                        handleChange: handleEmailChange
                    }, 'email', 'Email', 'email')}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="gender">
                        Gender:
                    </label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="age">
                        Age:
                    </label>
                    <select
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Age Group</option>
                        <option value="Under 18">Under 18</option>
                        <option value="18">18-24</option>
                        <option value="25">25-34</option>
                        <option value="35">35-44</option>
                        <option value="45">45-49</option>
                        <option value="50">50-55</option>
                        <option value="56">56+</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="occupation">
                        Occupation:
                    </label>
                    <select
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Occupation</option>
                        <option value="0">Other or Not Specified</option>
                        <option value="1">Academic/Educator</option>
                        <option value="2">Artist</option>
                        <option value="3">Clerical/Admin</option>
                        <option value="4">College/Grad Student</option>
                        <option value="5">Customer Service</option>
                        <option value="6">Doctor/Health Care</option>
                        <option value="7">Executive/Managerial</option>
                        <option value="8">Farmer</option>
                        <option value="9">Homemaker</option>
                        <option value="10">K-12 Student</option>
                        <option value="11">Lawyer</option>
                        <option value="12">Programmer</option>
                        <option value="13">Retired</option>
                        <option value="14">Sales/Marketing</option>
                        <option value="15">Scientist</option>
                        <option value="16">Self-Employed</option>
                        <option value="17">Technician/Engineer</option>
                        <option value="18">Tradesman/Craftsman</option>
                        <option value="19">Unemployed</option>
                        <option value="20">Writer</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="zipcode">
                        Zipcode:
                    </label>
                    <input
                        type="number"
                        id="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button className="custom-button"
                        type="submit" onClick={handleUpdate}>
                    Update
                </button>
                <div className="text-center">
                    <Link to="/dashboard" className="text-blue-500 hover:text-blue-200">Move to dashboard</Link>
                </div>
            </form>
            {returnMessage && (
                <Popup
                    message={returnMessage}
                    onClose={() => {
                        setReturnMessage("")
                    }}

                />
            )}
        </div>
    );
};

export default UserDetails;

