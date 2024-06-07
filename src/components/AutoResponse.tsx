import { useState } from 'react';
import EnableOption from './EnableOption';
import CommentInput from './CommentInput';
import SelectInput from './SelectInput';

const AutoResponse = () => {
  const [comments, setComments] = useState([
    { key: '1', value: 'test comment 1' },
    { key: '2', value: 'test comment 2' },
    { key: '3', value: 'test comment 3' },
  ]);
  const [commentType, setCommentType] = useState('static');
  const [shouldLikeComments, setShouldLikeComments] = useState(false);

  const commentTypeOptions = [
    { value: 'static', label: 'Static' },
    { value: 'open-ai', label: 'Open AI' },
  ];

  const removeComment = (key: string) => {
    setComments(comments.filter((comment) => comment.key !== key));
  };

  return (
    <div className="h-[76vh] overflow-y-auto px-6 py-3.5 text-sm">
      <div style={{ opacity: 1, transform: 'none', zIndex: 1 }}>
        <EnableOption
          label="Enable To Automatically Like Comments"
          checked={shouldLikeComments}
          onChange={setShouldLikeComments}
        />
        <br />
        <h1 className="sub-header">Reply In Comments</h1>
        <SelectInput
          label="Comment type"
          value={commentType}
          options={commentTypeOptions}
          onChange={setCommentType}
          additionalClasses="w-full"
        />
        <div className="text-center">
          <br />
          {comments.map((comment) => (
            <CommentInput
              key={comment.key}
              name={comment.key}
              value={comment.value}
              onRemove={() => removeComment(comment.key)}
            />
          ))}
          <br />
          <button className="btn btn-primary">Add Comment</button>
        </div>
        <br />
      </div>
      <br />
    </div>
  );
};

export default AutoResponse;
