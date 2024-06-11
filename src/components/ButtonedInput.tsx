import { ChangeEvent, KeyboardEvent } from 'react';

const ButtonedInput = ({
  placeholder,
  value,
  onChange,
  onClick,
  buttonText,
  widthClass,
}: {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  buttonText: string;
  widthClass?: string;
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <>
      <input
        placeholder={placeholder}
        className={`input join-item input-bordered focus:outline-offset-0 ${widthClass}`}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn join-item btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
};

export default ButtonedInput;
