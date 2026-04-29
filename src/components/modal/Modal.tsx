import type React from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  style,
}: {
  children: React.ReactNode;
  style: React.CSSProperties | undefined;
}) {
  return createPortal(
    <div style={style}>{children}</div>,
    document.getElementById("modal") as HTMLElement,
  );
}
