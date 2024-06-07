import { ReactNode, useState } from 'react';

type Tab = {
  label: string;
  content: ReactNode;
};

const TabList = ({
  tabs,
  initialActiveTab,
  className,
  tabListClassName,
}: {
  tabs: Tab[];
  initialActiveTab?: string;
  className?: string;
  tabListClassName?: string;
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab ?? tabs[0].label);

  return (
    <div className={className}>
      <div role="tablist" className={tabListClassName}>
        {tabs.map((tab) => (
          <button
            key={tab.label}
            role="tab"
            className={`tab ${activeTab === tab.label ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.find((tab) => tab.label === activeTab)?.content}
    </div>
  );
};

export default TabList;
