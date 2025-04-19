import { render, fireEvent } from "@testing-library/react";
import { ModalDialog } from "./ModalDialog";
import React, { useRef } from "react";

// Helper component to control ref with proper DOM rendering
function TestWrapper() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <ModalDialog ref={ref}>
        <p>Hello Dialog</p>
      </ModalDialog>
      <button onClick={() => ref.current?.showModal()}>Open</button>
    </div>
  );
}

describe("ModalDialog", () => {
  test("renders children", () => {
    const { getByText } = render(<TestWrapper />);
    expect(getByText("Hello Dialog")).toBeInTheDocument();
  });

  test("closes on Escape key press", () => {
    const { container } = render(<TestWrapper />);
    const dialog = container.querySelector("dialog")!;
    const closeSpy = jest.spyOn(dialog, "close");

    // Fire keydown
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(closeSpy).toHaveBeenCalled();
  });

  test("closes on click backdrop", () => {
    const { container } = render(<TestWrapper />);
    const dialog = container.querySelector("dialog")!;
    const closeSpy = jest.spyOn(dialog, "close");

    fireEvent.click(dialog); // simulate backdrop click
    expect(closeSpy).toHaveBeenCalled();
  });
});
