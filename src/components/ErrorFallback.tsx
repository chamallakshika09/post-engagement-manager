import { useNavigate } from 'react-router-dom';

export const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen space-y-4">
      <h4 className="text-2xl font-semibold text-center">Something's not right...</h4>
      <h6 className="text-xl font-medium text-center">We're having trouble displaying the page you're looking for.</h6>
      <div className="flex justify-center items-center space-x-4">
        <button onClick={() => window.location.reload()} className="bg-blue-500 text-white py-2 px-4 rounded">
          Refresh Page
        </button>
        <button onClick={() => navigate('/post-engagement')} className="bg-gray-500 text-white py-2 px-4 rounded">
          Go to Post Engagement Manager
        </button>
      </div>
    </div>
  );
};
