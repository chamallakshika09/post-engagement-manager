import { useNavigate, useParams } from 'react-router-dom';

const PostEngagementBuilder = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  const goBack = () => {
    navigate('/post-engagement');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Post Engagement Builder</h2>
          <button
            onClick={goBack}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
        <div className="text-gray-700">
          <p>
            You are editing post with ID: <span className="font-bold">{id}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostEngagementBuilder;
