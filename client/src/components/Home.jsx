import useAuth from '../hooks/useAuth';

const Home = () => {
    const { auth } = useAuth();

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Home</h1>

            <div className="bg-blue-100 shadow-lg rounded-lg p-6 lg:p-8 max-w-lg mx-auto">
                <p className="text-lg md:text-xl text-gray-800">You are logged in! 
                    <span className="text-blue-600 font-semibold"> {auth.user}</span>
                </p>
            </div>
        </section>
    );
}

export default Home;
