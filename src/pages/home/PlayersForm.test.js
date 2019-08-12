import React from "react";
import { cleanup, render } from "react-testing-library";
import PlayersForm from "./PlayersForm";

afterEach(cleanup);

function renderPlayersForm(args) {
  let defaultProps = {
    game: {},
    errors: {},
    onSubmit: () => { },
    handleChange: () => { },
    handleBlur: () => { }
  };

  const props = { ...defaultProps, ...args };
  return render(<PlayersForm {...props} />);
}

it("should render Player one name", () => {
  const { getByText } = renderPlayersForm();
  getByText("Player one name");
});

it('should render Player two name', () => {
  const { getByText } = renderPlayersForm();
  getByText("Player two name");
});

it('should render Player two name', () => {
  const { getByValue } = renderPlayersForm({ saving: true });
  getByValue("Start");
});
