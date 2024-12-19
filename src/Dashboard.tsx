import {useEffect, useState} from "react";

const Dashboard = () => {

    const [username,setUsername] = useState<string|null>('');

    useEffect(() => {

        if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
        setUsername(localStorage.getItem('user'))
    }
    }, []);


    return (
        <>
            <div className="NameHeader max-w-[80vw] rounded pt-1 pb-1 mb-4 animate-fade-in-up text-white items-center justify-center">
                <div className="text-center"></div>
                <h1 className="mt-2">Welcome on my recommendation system!</h1>
                {username && <h2 className="mt-4">Your username: {username}</h2>}
                <div className="text-center">
                <div className="mt-10 mb-5">
                        <h2 className="mb-5">Here you get get tailored recommendations based on your profile.</h2>

                        Don't forget to create an account and rate
                        movies that you previously watched.
                        Without profile you can only use recommendation methods based on movie title.
                    </div>
                </div>

        </div>
        </>
    );
};

export default Dashboard;