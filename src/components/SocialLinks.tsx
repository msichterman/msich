import clsx from "clsx";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import { ElementType, ReactNode } from "react";
import ExternalLink from "./ExternalLink";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  icon: ElementType;
  href: string;
  children: ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <ExternalLink
        href={href}
        className="group flex text-sm font-medium text-gray-800 transition hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-500"
      >
        <Icon className="h-6 w-6 flex-none stroke-gray-500 stroke-[1.5] transition group-hover:stroke-sky-500" />
        <span className="ml-4">{children}</span>
      </ExternalLink>
    </li>
  );
}

export default function SocialLinks() {
  return (
    <ul role="list">
      <SocialLink href="https://twitter.com/mattsichterman" icon={Twitter}>
        Follow on Twitter
      </SocialLink>
      <SocialLink
        href="https://www.instagram.com/mattsichterman"
        icon={Instagram}
        className="mt-4"
      >
        Follow on Instagram
      </SocialLink>
      <SocialLink
        href="https://github.com/msichterman"
        icon={Github}
        className="mt-4"
      >
        Follow on GitHub
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/msichterman"
        icon={Linkedin}
        className="mt-4"
      >
        Follow on LinkedIn
      </SocialLink>
      <SocialLink
        href="mailto:msichterman1@gmail.com"
        icon={Mail}
        className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-700/40"
      >
        msichterman1@gmail.com
      </SocialLink>
    </ul>
  );
}
