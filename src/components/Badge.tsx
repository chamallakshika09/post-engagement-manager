import './Badge.css';

const Badge = ({ text, onRemove }: { text: string; onRemove: () => void }) => {
  return (
    <div className="badge">
      {text}
      <span className="ml-1 cursor-pointer text-xs hover:text-error" onClick={onRemove}>
        ✕
      </span>
    </div>
  );
};

export default Badge;
