import { useNavigate } from "react-router-dom";

const Missing = () => {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <article className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-8">Page Not Found</p>
     
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-100 transition duration-300"
      >
        Visit Our Homepage
      </button>
    </article>
  );
};

export default Missing;
