import { useState, type FC } from "react";

interface Props {
  text: string;
  design?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fn?: () => void;
}
const Button: FC<Props> = ({ text, design, disabled, type, fn }) => {

  return (
    <button onClick={fn} type={type} disabled={disabled} className={`custom-btn ${design}`}>
      {text}
    </button>
  );
};

export default Button;
