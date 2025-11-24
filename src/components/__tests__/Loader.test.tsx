/**
 * Test unitaire pour le composant Loader
 */

import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders the loader with default size", () => {
    render(<Loader />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass("w-8", "h-8");
  });

  it("renders the loader with small size", () => {
    render(<Loader size="sm" />);
    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("w-4", "h-4");
  });

  it("renders the loader with large size", () => {
    render(<Loader size="lg" />);
    const loader = screen.getByRole("status");
    expect(loader).toHaveClass("w-12", "h-12");
  });

  it("has accessible label", () => {
    render(<Loader />);
    expect(screen.getByLabelText("Chargement en cours")).toBeInTheDocument();
  });
});

