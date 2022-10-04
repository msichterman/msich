import { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  to: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink = ({ to, children, ...rest }: Props) => {
  return (
    <a href={to} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
