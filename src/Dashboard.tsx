import MovieContainer from "./MovieContainer.tsx";

const Dashboard = () => {
    return (
        <div className="flex flex-col min-h-screen text-white">
            <MovieContainer apiUrl="http://127.0.0.1:5000/reccomend_on_user_NN_CF?user_id=50&n_reccomend=20"> </MovieContainer>
        </div>
    );
};

export default Dashboard;