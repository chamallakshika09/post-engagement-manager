const MenuTitle = ({ title }: { title: string }) => {
  return (
    <li className="menu-title">
      <span>{title}</span>
    </li>
  );
};

export default MenuTitle;
