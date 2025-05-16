import { describe, it, expect } from "vitest";// Import necessary testing funcions from Vitest
import { render,screen } from "@testing-library/react";// Import the renderand screen function from React Testing Library to render React components ina test environment

import React from "react"; // Import React to support JSX syntax
import "@testing-library/jest-dom"; //import jest-dom testing library
import About from "../src/Components/About";


// Test Case 1
it("should render the main heading", () => {
    render(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/meet the development team/i);
  });
// Test case 2
it("should show developer Mohammed Al-Balushi", () => {
  render(<About />);
  const dev = screen.getByText(/Mohammed Al-Balushi/i);
  expect(dev).toBeInTheDocument();
});

// tset case 3





