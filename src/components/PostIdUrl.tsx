import { useState } from 'react';
import ButtonedInput from './ButtonedInput';

const PostIdUrl = () => {
  const [postId, setPostId] = useState('');

  const handleClick = () => {};

  return (
    <div className="flex place-content-center">
      <div className="join mt-10">
        <ButtonedInput
          placeholder="Post ID / URL"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          onClick={handleClick}
          buttonText="Grab Post"
          widthClass="w-96"
        />
      </div>
    </div>
  );
};

export default PostIdUrl;
