import { SwitchButton } from "../app/Styles";

const SelectRol = () => {
  return (
    <SwitchButton>
      <input type="checkbox" />{" "}
      <label htmlFor="switch-button">
        <span>Player</span>
      </label>
    </SwitchButton>
  );
};

export default SelectRol;
