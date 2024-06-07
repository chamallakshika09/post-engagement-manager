const Loader = () => {
  return (
    <div className="flex justify-center items-center my-4 w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-blue-600">Loading...</span>
    </div>
  );
};

export default Loader;
