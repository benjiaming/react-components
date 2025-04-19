// ToggleButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleButton } from "./ToggleButton";


describe("ToggleButton", () => {
  test("toggles on click and calls onToggle", () => {
    const handleToggle = () => {}
    render(<ToggleButton onToggle={handleToggle} />);

    const button = screen.getByRole("switch");

    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(true);

    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalledWith(false);
  });
});
