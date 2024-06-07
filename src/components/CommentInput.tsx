const CommentInput = ({ name, value, onRemove }: { name: string; value: string; onRemove: () => void }) => {
  return (
    <div className="bg-base-200 p-1.5 [&:not(:last-of-type)]:mb-1.5 rounded-md border border-dotted border-base-300">
      <div className="flex flex-row items-center gap-1.5">
        <input
          name={name}
          type="text"
          placeholder="Type your comment here"
          className="input w-full focus:outline-offset-0"
          value={value}
        />
        <button className="btn btn-sm btn-circle btn-ghost" onClick={onRemove}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
