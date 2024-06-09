import './ReactionBadge.css';

const ReactionBadge = ({ reaction, onRemove }: { reaction: string; onRemove: () => void }) => {
  if (reaction === 'like') {
    return (
      <div className="badge">
        <span data-reaction="like">
          <span className="like-btn-like inline pr-5"></span>
          <span className="ml-1">like</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }

  if (reaction === 'love') {
    return (
      <div className="badge">
        <span data-reaction="love">
          <span className="like-btn-love inline pr-5"></span>
          <span className="ml-1">love</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }

  if (reaction === 'haha') {
    return (
      <div className="badge">
        <span data-reaction="haha">
          <span className="like-btn-haha inline pr-5"></span>
          <span className="ml-1">haha</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }

  if (reaction === 'wow') {
    return (
      <div className="badge">
        <span data-reaction="wow">
          <span className="like-btn-wow inline pr-5"></span>
          <span className="ml-1">wow</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }

  if (reaction === 'sad') {
    return (
      <div className="badge">
        <span data-reaction="sad">
          <span className="like-btn-sad inline pr-5"></span>
          <span className="ml-1">sad</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }

  if (reaction === 'angry') {
    return (
      <div className="badge">
        <span data-reaction="angry">
          <span className="like-btn-angry inline pr-5"></span>
          <span className="ml-1">angry</span>
          <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
            ✕
          </span>
        </span>
      </div>
    );
  }
};

export default ReactionBadge;
