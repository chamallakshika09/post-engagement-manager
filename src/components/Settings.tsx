import { useState } from 'react';
import EnableOption from './EnableOption';
import KeywordInput from './KeywordInput';
import ReactionBox from './ReactionBox';
import SelectInput from './SelectInput';
import { Post } from '../types/data';
import ReactionBadge from './ReactionBadge';

const messageTypeOptions = [
  { value: 'flow', label: 'Flow' },
  { value: 'single-message', label: 'Single Message' },
];

const flowOptions = [
  { value: 'welcome', label: 'Welcome Message' },
  { value: 'default', label: 'Default Reply' },
];

const messageOptions = [
  { value: 'card1', label: 'Text Card #1' },
  { value: 'card2', label: 'Text Card #2' },
];

const Settings = ({ post, updatePost }: { post: Post; updatePost: (post: Post) => void }) => {
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [triggerKeywords, setTriggerKeywords] = useState('');

  return (
    <div className="h-[76vh] overflow-y-auto px-6 py-3.5 text-sm">
      <div style={{ opacity: 1, transform: 'none', zIndex: 1 }}>
        <EnableOption
          label="Enable To Privately Reply To First-Level Comments Only"
          checked={post.enablePrivateReply}
          onChange={() => updatePost({ ...post, enablePrivateReply: !post.enablePrivateReply })}
        />
        <EnableOption
          label="Send Message To The Same User Only Once Per Post"
          checked={post.sendOncePerPost}
          onChange={() => updatePost({ ...post, sendOncePerPost: !post.sendOncePerPost })}
        />
        <br />
        <h1 className="sub-header">Require a Post Reaction</h1>
        <br />
        {post.requiredReactions.map((reaction) => (
          <ReactionBadge
            key={reaction}
            reaction={reaction}
            onRemove={() =>
              updatePost({ ...post, requiredReactions: post.requiredReactions.filter((r) => r !== reaction) })
            }
          />
        ))}
        <div className="mt-2.5">
          <ReactionBox
            onAdd={(reaction: string) =>
              updatePost({ ...post, requiredReactions: [...post.requiredReactions, reaction] })
            }
          />
        </div>

        <br />
        <KeywordInput
          label="Exclude Comments With These Keywords"
          placeholder="Specify Keywords"
          value={excludeKeywords}
          onChange={(e) => setExcludeKeywords(e.target.value)}
          onAdd={() => {
            updatePost({ ...post, excludeKeywords: [...post.excludeKeywords, excludeKeywords] });
            setExcludeKeywords('');
          }}
          tags={post.excludeKeywords}
          onRemove={(kw: string) =>
            updatePost({ ...post, excludeKeywords: post.excludeKeywords.filter((w) => w !== kw) })
          }
        />
        <br />
        <KeywordInput
          label="Only Trigger For Comments With These Keywords"
          placeholder="Specify Keywords"
          value={triggerKeywords}
          onChange={(e) => setTriggerKeywords(e.target.value)}
          onAdd={() => {
            updatePost({ ...post, triggerKeywords: [...post.triggerKeywords, triggerKeywords] });
            setTriggerKeywords('');
          }}
          tags={post.triggerKeywords}
          onRemove={(kw: string) =>
            updatePost({ ...post, triggerKeywords: post.triggerKeywords.filter((w) => w !== kw) })
          }
        />
        <br />
        <h1 className="sub-header">Private Reply After Post Engagement</h1>
        <SelectInput
          label="Select message type"
          value={post.messageType}
          options={messageTypeOptions}
          onChange={(v) => updatePost({ ...post, messageType: v })}
        />
        <SelectInput
          label="Select flow"
          value={post.flow}
          options={flowOptions}
          onChange={(v) => updatePost({ ...post, flow: v })}
          disabledOption={{ value: '', label: 'Select' }}
        />

        {post.messageType === 'single-message' && (
          <SelectInput
            label="Select message"
            value={post.message}
            options={messageOptions}
            onChange={(v) => updatePost({ ...post, message: v })}
          />
        )}
      </div>
      <br />
    </div>
  );
};

export default Settings;
