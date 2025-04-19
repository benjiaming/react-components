import React, { forwardRef, ReactNode } from "react";

interface ModalDialogProps {
  children: ReactNode;
}

export const ModalDialog = forwardRef<HTMLDialogElement, ModalDialogProps>(
  ({ children, ...props }, ref) => {
    return (
      <dialog ref={ref} {...props}>
        {children}
      </dialog>
    );
  }
);
