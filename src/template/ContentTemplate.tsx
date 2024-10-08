import React, { ReactNode } from "react";

interface IContentTemplate {
  children: ReactNode;
  className?: string;
}

export default function ContentTemplate({
  children,
  className,
}: IContentTemplate) {
  return <section className={className}>{children}</section>;
}
