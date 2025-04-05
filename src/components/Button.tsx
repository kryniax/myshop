import { ButtonHTMLAttributes } from "react";

const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
