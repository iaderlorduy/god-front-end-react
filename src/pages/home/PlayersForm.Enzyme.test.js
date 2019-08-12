import React from "react";
import PlayersForm from "./PlayersForm";
import { shallow } from "enzyme";

function renderPlayersForm(args) {
  const defaultProps = {
    game: {},
    errors: {},
    onSubmit: () => { },
    handleChange: () => { },
    handleBlur: () => { }
  };

  const props = { ...defaultProps, ...args };
  return shallow(<PlayersForm {...props} />);
}

it("renders form and input", () => {
  const wrapper = renderPlayersForm();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("input").get(0).props.value).toEqual("Start");
});

it('render two TextInput', () => {
  const wrapper = renderPlayersForm();
  expect(wrapper.find("TextInput").length).toBe(2);
});

