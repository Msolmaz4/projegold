
type ButtonProps = {
  label?: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
  starIcon: string;
  children?: React.ReactNode;

};



const Button = () => {
  return (
    <div>Button</div>
  )
}

export default Button