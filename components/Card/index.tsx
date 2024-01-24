import { CardProps } from "@/common/types";

const Card = ({
  className = "",
  loading = false,
  children,
  ...props
}: CardProps) => (
  <div
    className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
