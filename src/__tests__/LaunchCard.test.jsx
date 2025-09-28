import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LaunchCard from "../components/LaunchCard";
import { FavoritesProvider } from "../context/FavoritesContext";
import { MemoryRouter } from "react-router-dom";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// Test launch data
const launch = {
  id: "test-1",
  mission_name: "Test Launch",
  date_utc: "2023-01-01T00:00:00.000Z",
  rocket: { name: "Unknown" },
  links: { patch: { small: "/default-patch.png" } },
  launch_success: false,
};

const renderWithProviders = (ui) =>
  render(
    <MemoryRouter>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </MemoryRouter>
  );

describe("LaunchCard Component", () => {
  test("renders launch name and date", () => {
    renderWithProviders(<LaunchCard launch={launch} />);
    expect(screen.getByText(/Test Launch/i)).toBeInTheDocument();
    expect(screen.getByText(/1\/1\/2023/)).toBeInTheDocument();
  });

  test("allows toggling favorites", () => {
    renderWithProviders(<LaunchCard launch={launch} />);
    const button = screen.getByRole("button", { name: /Add to favorites/i });
    fireEvent.click(button);
    expect(button).toHaveTextContent("★"); // toggled
  });
});
