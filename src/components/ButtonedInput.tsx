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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  buttonText: string;
  widthClass?: string;
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        className={`input join-item input-bordered focus:outline-offset-0 ${widthClass}`}
        value={value}
        onChange={onChange}
      />
      <button className="btn join-item btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
};

export default ButtonedInput;
