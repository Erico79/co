import React from "react";
import App from "./App";
import { shallow } from "enzyme";

it("should render correctly", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
