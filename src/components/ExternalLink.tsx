import { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink = ({ href, children, ...rest }: Props) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
