const Breadcrumbs = () => {
  return (
    <div className="-mt-5 mb-2 flex items-center justify-between px-8">
      <div className="breadcrumbs text-lg">
        <ul>
          <li>
            <a href="/post-engagement">Capture Tools</a>
          </li>
          <li>
            <a href="/post-engagement">Post Engagement</a>
          </li>
          <li>Edit</li>
        </ul>
      </div>
      <div>
        <button className="btn btn-sm btn-primary">Save</button>
      </div>
    </div>
  );
};

export default Breadcrumbs;
