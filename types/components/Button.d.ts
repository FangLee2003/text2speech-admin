interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
    className?: string;
}
declare const Button: ({ children, onClick, disabled, type, className }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
