"use client";

import posthog from "posthog-js";

type CtaLinkProps = {
  href: string;
  className: string;
  section: string;
  children: React.ReactNode;
};

export function CtaLink({ href, className, section, children }: CtaLinkProps) {
  const handleClick = () => {
    posthog.capture("cta_clicked", { section });
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
