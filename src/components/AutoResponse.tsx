import EnableOption from './EnableOption';
import CommentInput from './CommentInput';
import SelectInput from './SelectInput';
import { Post } from '../types/data';

const commentTypeOptions = [
  { value: 'static', label: 'Static' },
  { value: 'open-ai', label: 'Open AI' },
];

const integrationTypeOptions = [
  { value: 'int1', label: 'Integration 1' },
  { value: 'int2', label: 'Integration 2' },
];

const assistanceTypeOptions = [
  { value: 'ass1', label: 'Assistance 1' },
  { value: 'ass2', label: 'Assistance 2' },
];

const AutoResponse = ({ post, updatePost }: { post: Post; updatePost: (post: Post) => void }) => {
  return (
    <div className="h-[76vh] overflow-y-auto px-6 py-3.5 text-sm">
      <div style={{ opacity: 1, transform: 'none', zIndex: 1 }}>
        <EnableOption
          label="Enable To Automatically Like Comments"
          checked={post.enableAutoLike}
          onChange={() => updatePost({ ...post, enableAutoLike: !post.enableAutoLike })}
        />
        <br />
        <h1 className="sub-header">Reply In Comments</h1>
        <SelectInput
          label="Comment type"
          value={post.commentType}
          options={commentTypeOptions}
          onChange={(v) => updatePost({ ...post, commentType: v })}
          additionalClasses="w-full"
        />
        {post.commentType === 'static' && (
          <div className="text-center">
            <br />
            {post.comments.map((comment, index) => (
              <CommentInput
                key={index}
                value={comment}
                onChange={(v) => updatePost({ ...post, comments: post.comments.map((c, i) => (i === index ? v : c)) })}
                onRemove={() => updatePost({ ...post, comments: post.comments.filter((_, i) => i !== index) })}
              />
            ))}
            <br />
            <button
              className="btn btn-primary"
              onClick={() => updatePost({ ...post, comments: [...post.comments, ''] })}
            >
              Add Comment
            </button>
          </div>
        )}

        {post.commentType === 'open-ai' && (
          <>
            <SelectInput
              label="Select Integration"
              value={post.integrationType}
              options={integrationTypeOptions}
              onChange={(v) => updatePost({ ...post, integrationType: v })}
              additionalClasses="w-full"
            />
            <SelectInput
              label="Select Assistance"
              value={post.assistanceType}
              options={assistanceTypeOptions}
              onChange={(v) => updatePost({ ...post, assistanceType: v })}
              additionalClasses="w-full"
            />
          </>
        )}
        <br />
      </div>
      <br />
    </div>
  );
};

export default AutoResponse;
