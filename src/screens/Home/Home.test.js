import React from "react";
import {render, waitFor} from "@testing-library/react-native";
import {FlatList} from "react-native";
import Home from "./Home";

describe("Home screen", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    }),
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("should have submit button", () => {
    const screen = render(<Home />);
    const submitButton = screen.getByTestId("submitButton");

    expect(submitButton).not.toBeNull();
  });

  it("renders a list", async () => {
    const screen = render(<Home />);
    await waitFor(() => {
      expect(screen.UNSAFE_getAllByType(FlatList).length).toBe(1);
    });
  });
});
