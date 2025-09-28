// src/tests/Home.test.jsx
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import { vi } from "vitest";

// Mock child components
vi.mock("../components/LaunchCard", () => ({
  default: ({ launch }) => <div>{launch.name}</div>,
}));
vi.mock("../components/Loader", () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock("../components/Filters", () => ({
  default: ({ filter, setFilter }) => <div>Filters Component</div>,
}));

describe("Home", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: "1", name: "Falcon 9", success: true },
            { id: "2", name: "Starship", success: false },
          ]),
      })
    );
  });

  it("renders list of launches after loading", async () => {
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const launch1 = await screen.findByText("Falcon 9");
    const launch2 = await screen.findByText("Starship");
    expect(launch1).toBeInTheDocument();
    expect(launch2).toBeInTheDocument();
  });
});
