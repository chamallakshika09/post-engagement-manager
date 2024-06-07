import { useState } from 'react';
import './ReactionBox.css';

// const reactions = [
//   { key: 'like', name: 'Like', imgSrc: 'images/reactions_like.png' },
//   { key: 'love', name: 'Love', imgSrc: 'images/reactions_love.png' },
//   { key: 'haha', name: 'HaHa', imgSrc: 'images/reactions_haha.png' },
//   { key: 'wow', name: 'Wow', imgSrc: 'images/reactions_wow.png' },
//   { key: 'sad', name: 'Sad', imgSrc: 'images/reactions_sad.png' },
//   { key: 'angry', name: 'Angry', imgSrc: 'images/reactions_angry.png' },
// ];

const ReactionBox = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div id="add_positive_reaction" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <ul className={`positive reactions-box ${isHovered ? 'active' : ''}`}>
        <li className="reaction reaction-like" data-reaction="Like"></li>
        <li className="reaction reaction-love" data-reaction="Love"></li>
        <li className="reaction reaction-haha" data-reaction="HaHa"></li>
        <li className="reaction reaction-wow" data-reaction="Wow"></li>
        <li className="reaction reaction-sad" data-reaction="Sad"></li>
        <li className="reaction reaction-angry" data-reaction="Angry"></li>
      </ul>
      <button className="btn btn-primary w-full">Require reaction</button>
    </div>
  );
};

export default ReactionBox;
