const MenuItem = ({
  href,
  icon,
  label,
  active,
  onClickItem,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClickItem: () => void;
}) => {
  return (
    <li>
      <a href={href} className={active ? 'active' : ''} onClick={onClickItem}>
        {icon}
        {label}
      </a>
    </li>
  );
};

export default MenuItem;
