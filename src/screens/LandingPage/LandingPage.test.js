import React from "react";
import {render, fireEvent} from "@testing-library/react-native";

import LandingPage from "./LandingPage";
import {Screens} from "../../lib/constants";

describe("Home screen", () => {
  it("should have welcome text", () => {
    const navigation = {navigate: () => {}};
    spyOn(navigation, "navigate");
    const {queryByText} = render(<LandingPage navigation={navigation} />);

    expect(queryByText("Welcome To Our Application")).not.toBeNull();
  });

  it("should navigate to questions screen", () => {
    const navigation = {navigate: () => {}};
    spyOn(navigation, "navigate");
    const screen = render(<LandingPage navigation={navigation} />);
    const nextButton = screen.getByTestId("nextButton");

    fireEvent.press(nextButton);

    expect(navigation.navigate).toHaveBeenCalledWith(Screens.HOME);
  });
});
