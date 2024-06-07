import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen space-y-4">
      <h4 className="text-2xl font-semibold text-center">Page not found :(</h4>
      <h6 className="text-lg text-center">
        Maybe the page you are looking for has been removed, or you typed in the wrong URL
      </h6>
      <button
        onClick={() => navigate('/post-engagement')}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go to Post Engagement Manager
      </button>
    </div>
  );
};

export default NotFound;
