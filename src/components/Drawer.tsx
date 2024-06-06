import CaptureIcon from '../assets/icons/Capture.icon';

const Drawer = () => {
  return (
    <div className="drawer-side">
      <ul className="menu min-h-full bg-base-100 border-r border-r-base-300 pt-20">
        <li>
          <a className="py-4 active" href="/post-engagement">
            <CaptureIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
