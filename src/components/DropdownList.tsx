import { useState } from 'react';
import { DropdownListItem } from '../types/ui';
import DownArrowIcon from '../assets/icons/DownArrow.icon';
import useOutsideClick from '../hooks/useOutsideClick';

const DropdownList = <T,>({
  menuItems,
  size = 'xs',
  additionalClasses = '',
  icon,
  buttonText,
  direction = 'dropdown-end',
  item,
}: {
  menuItems: DropdownListItem<T>[];
  buttonText: string;
  size?: 'xs' | 'sm';
  additionalClasses?: string;
  icon?: boolean;
  direction?: 'dropdown-end' | 'dropdown-top';
  item?: T;
}) => {
  const menuSizeClass = size === 'xs' ? 'menu-xs' : 'menu-sm';
  const buttonSizeClass = size === 'xs' ? 'btn-xs' : 'btn-sm';

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useOutsideClick(() => setDropdownVisible(false));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`dropdown ${direction}`} ref={dropdownRef}>
      <button className={`btn ${buttonSizeClass} btn-outline`} onClick={toggleDropdown}>
        {buttonText}
        {icon && <DownArrowIcon />}
      </button>
      <ul
        className={`menu dropdown-content p-2 bg-base-100 rounded-box shadow z-50 ${menuSizeClass} ${additionalClasses}`}
      >
        {menuItems.map((menuItem) => (
          <li key={menuItem.key}>
            <button onClick={() => menuItem.onClick(item)}>{menuItem.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
