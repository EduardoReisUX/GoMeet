import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="px-4 max-w-6xl mx-auto w-full">{children}</div>;
}
