import React from "react";
import PropTypes from "prop-types";
import TextInput from "../../components/common/TextInput";

const PlayerForm = ({
  game,
  onSubmit,
  errors = {},
  handleChange,
  handleBlur
}) => {
  return (
    <form onSubmit={onSubmit} noValidate>
      <TextInput
        name="playerOneName"
        label="Player one name"
        value={game.playerOneName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.playerOneName}
      />

      <TextInput
        name="playerTwoName"
        label="Player two name"
        value={game.playerTwoName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.playerTwoName}
      />
      <input className="form-btn" type="submit" value="Start" />
    </form>
  );
};

PlayerForm.propTypes = {
  game: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default PlayerForm;