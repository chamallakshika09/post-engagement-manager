import { useState } from 'react';
import EnableOption from './EnableOption';
import KeywordInput from './KeywordInput';
import ReactionBox from './ReactionBox';
import SelectInput from './SelectInput';

const Settings = () => {
  const [isFirstLevelCommentsOnly, setIsFirstLevelCommentsOnly] = useState(false);
  const [sendOncePerPost, setSendOncePerPost] = useState(false);
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [triggerKeywords, setTriggerKeywords] = useState('');
  const [messageType, setMessageType] = useState('flow');
  const [flow, setFlow] = useState('');

  const messageTypeOptions = [
    { value: 'flow', label: 'Flow' },
    { value: 'single-message', label: 'Single Message' },
  ];

  const flowOptions = [
    { value: 'welcome', label: 'Welcome Message' },
    { value: 'default', label: 'Default Reply' },
  ];

  return (
    <div className="h-[76vh] overflow-y-auto px-6 py-3.5 text-sm">
      <div style={{ opacity: 1, transform: 'none', zIndex: 1 }}>
        <EnableOption
          label="Enable To Privately Reply To First-Level Comments Only"
          checked={isFirstLevelCommentsOnly}
          onChange={setIsFirstLevelCommentsOnly}
        />
        <EnableOption
          label="Send Message To The Same User Only Once Per Post"
          checked={sendOncePerPost}
          onChange={setSendOncePerPost}
        />
        <br />
        <h1 className="sub-header">Require a Post Reaction</h1>
        <br />
        <div className="mt-2.5">
          <ReactionBox />
        </div>

        <br />
        <KeywordInput
          label="Exclude Comments With These Keywords"
          placeholder="Specify Keywords"
          value={excludeKeywords}
          onChange={(e) => setExcludeKeywords(e.target.value)}
          onAdd={() => {}}
        />
        <br />
        <KeywordInput
          label="Only Trigger For Comments With These Keywords"
          placeholder="Specify Keywords"
          value={triggerKeywords}
          onChange={(e) => setTriggerKeywords(e.target.value)}
          onAdd={() => {}}
        />
        <br />
        <h1 className="sub-header">Private Reply After Post Engagement</h1>
        <SelectInput
          label="Select message type"
          value={messageType}
          options={messageTypeOptions}
          onChange={setMessageType}
        />
        <SelectInput
          label="Select flow"
          value={flow}
          options={flowOptions}
          onChange={setFlow}
          disabledOption={{ value: '', label: 'Select' }}
        />
      </div>
      <br />
    </div>
  );
};

export default Settings;
