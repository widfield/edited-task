import "./Input.css";

interface InputProps {
  placeholder?: string;
  type?: string;
  id: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  title?: string;
  required?: boolean;
}

const Input = ({
  placeholder,
  type = "text",
  id,
  value,
  onChange,
  pattern,
  title,
  required,
}: InputProps) => {
  return (
    <input
      id={id}
      value={value}
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      pattern={pattern}
      title={title}
      required={required}
    />
  );
};

export default Input;
