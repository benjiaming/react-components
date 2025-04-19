import { render, fireEvent } from "@testing-library/react";
import Accordion from "./Accordion";
import React from "react";

// filepath: /workspaces/react-components/accordion/src/Accordion.test.tsx

describe("Accordion Component", () => {
    test("renders all titles from data", () => {
        const { getByText } = render(<Accordion />);
        expect(getByText("HTML")).toBeInTheDocument();
        expect(getByText("CSS")).toBeInTheDocument();
        expect(getByText("JavaScript")).toBeInTheDocument();
    });

    test("displays content when a title is clicked", () => {
        const { getByText } = render(<Accordion />);
        const htmlTitle = getByText("HTML");
        fireEvent.click(htmlTitle);
        expect(
            getByText(
                "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
            )
        ).toBeInTheDocument();
    });

    test("hides content when the same title is clicked again", () => {
        const { getByText, queryByText } = render(<Accordion />);
        const htmlTitle = getByText("HTML");
        fireEvent.click(htmlTitle); // Open
        fireEvent.click(htmlTitle); // Close
        expect(
            queryByText(
                "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
            )
        ).not.toBeInTheDocument();
    });

    test("only one content section is visible at a time", () => {
        const { getByText, queryByText } = render(<Accordion />);
        const htmlTitle = getByText("HTML");
        const cssTitle = getByText("CSS");

        fireEvent.click(htmlTitle); // Open HTML
        expect(
            getByText(
                "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
            )
        ).toBeInTheDocument();

        fireEvent.click(cssTitle); // Open CSS
        expect(
            getByText(
                "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
            )
        ).toBeInTheDocument();

        // Ensure HTML content is hidden
        expect(
            queryByText(
                "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
            )
        ).not.toBeInTheDocument();
    });
});