import React, { ReactNode } from "react";

interface IContentTemplate {
  children: ReactNode;
}

export default function ContentTemplate({ children }: IContentTemplate) {
  return (
    <section
      className={`w-full flex max-w-7xl px-4 xl:px-0 flex-col max-h-full gap-8`}
    >
      {children}
    </section>
  );
}
