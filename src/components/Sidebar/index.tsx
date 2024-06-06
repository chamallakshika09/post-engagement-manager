import { useState } from 'react';
import CheckboxPluginIcon from '../../assets/icons/CheckboxPlugin.icon';
import JSONGeneratorIcon from '../../assets/icons/JSONGenerator.icon';
import LinksLibraryIcon from '../../assets/icons/LinksLibrary.icon';
import MessengerCodeIcon from '../../assets/icons/MessengerCode.icon';
import PostEngagementIcon from '../../assets/icons/PostEngagement.icon';
import SendToMessengerIcon from '../../assets/icons/SendToMessenger.icon';
import MenuItem from './MenuItem';
import MenuTitle from './MenuTitle';

const menuItems = [
  { key: 'links-library', href: '#', icon: <LinksLibraryIcon />, label: 'Links Library' },
  { key: 'json-generator', href: '#', icon: <JSONGeneratorIcon />, label: 'JSON Generator' },
  { key: 'checkbox-plugin', href: '#', icon: <CheckboxPluginIcon />, label: 'Checkbox Plugin' },
  { key: 'messenger-code', href: '#', icon: <MessengerCodeIcon />, label: 'Messenger Code' },
  { key: 'post-engagement', href: '#', icon: <PostEngagementIcon />, label: 'Post Engagement' },
  { key: 'send-to-messenger', href: '#', icon: <SendToMessengerIcon />, label: 'Send To Messenger' },
] as const;

type MenuItemKey = (typeof menuItems)[number]['key'];

const Sidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemKey>('post-engagement');

  return (
    <div className="px-6 col-span-2 lg:block hidden">
      <ul className="menu menu-vertical bg-base-100 rounded-box">
        <MenuTitle title="Capture Tools" />
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={activeMenuItem === item.key}
            onClickItem={() => setActiveMenuItem(item.key)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
