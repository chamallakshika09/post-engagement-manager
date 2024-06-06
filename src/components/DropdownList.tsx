import { DropdownListItem } from '../types/ui';
import DownArrowIcon from '../assets/icons/DownArrow.icon';
import useOutsideClick from '../hooks/useOutsideClick';
import { useState } from 'react';

const DropdownList = ({
  items,
  size = 'xs',
  additionalClasses = '',
  icon,
  buttonText,
}: {
  items: DropdownListItem[];
  buttonText: string;
  size?: 'xs' | 'sm';
  additionalClasses?: string;
  icon?: boolean;
}) => {
  const menuSizeClass = size === 'xs' ? 'menu-xs' : 'menu-sm';
  const buttonSizeClass = size === 'xs' ? 'btn-xs' : 'btn-sm';

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useOutsideClick(() => setDropdownVisible(false));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      <button className={`btn ${buttonSizeClass} btn-outline`} onClick={toggleDropdown}>
        {buttonText}
        {icon && <DownArrowIcon />}
      </button>
      <ul
        className={`menu dropdown-content p-2 bg-base-100 rounded-box shadow z-10 ${menuSizeClass} ${additionalClasses}`}
      >
        {items.map((item) => (
          <li key={item.key}>
            <button onClick={item.onClick}>{item.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
