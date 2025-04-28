interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
  }
  
  const Button = ({ children, onClick, disabled, type = "button" }: ButtonProps) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  