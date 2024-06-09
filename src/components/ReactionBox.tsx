import { useState } from 'react';
import './ReactionBox.css';

const ReactionBox = ({ onAdd }: { onAdd: (reaction: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="add_positive_reaction" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ul className={`positive reactions-box ${isHovered ? 'active' : ''}`}>
        <li className="reaction reaction-like" data-reaction="Like" onClick={() => onAdd('like')}></li>
        <li className="reaction reaction-love" data-reaction="Love" onClick={() => onAdd('love')}></li>
        <li className="reaction reaction-haha" data-reaction="HaHa" onClick={() => onAdd('haha')}></li>
        <li className="reaction reaction-wow" data-reaction="Wow" onClick={() => onAdd('wow')}></li>
        <li className="reaction reaction-sad" data-reaction="Sad" onClick={() => onAdd('sad')}></li>
        <li className="reaction reaction-angry" data-reaction="Angry" onClick={() => onAdd('angry')}></li>
      </ul>
      <button className="btn btn-primary w-full">Require reaction</button>
    </div>
  );
};

export default ReactionBox;
