import { forwardRef, useEffect } from 'react';

export const ModalDialog = forwardRef(({ children }, dialogRef) => {
  useEffect(() => {
    const dialogEl = dialogRef?.current;
    function handleClick(e: { target: any; }) {
      if (!dialogEl) return;
      if (e.target === dialogEl) {
        dialogEl.close();
      }
    }
    function handleKeyDown(e: { key: string; }) {
      if (e.key === "Escape") {
        dialogEl.close();
      }
    }
    dialogEl.addEventListener("click", handleClick);
    dialogEl.addEventListener("keydown", handleKeyDown);
    return () => {
      dialogEl.removeEventListener("click", handleClick);
      dialogEl.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <dialog className="dialog" ref={dialogRef}>
      {children}
    </dialog>
  );
});
