import {
  SwitchContainer,
  SwitchInput,
  SwitchSlider,
  SwitchText,
} from "../app/Styles";
import { useState } from "react";

const SelectRol = ({ labelOn, labelOff, isChecked, onChange, theme }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    setChecked(!checked);
    onChange && onChange(!checked); // Call provided onChange function
  };

  return (
    <SwitchContainer theme={theme}>
      <SwitchInput type="checkbox" checked={checked} onChange={handleToggle} />
      <SwitchSlider isChecked={checked} theme={theme} />
      <SwitchText isChecked={checked}>
        {checked ? labelOn : labelOff}
      </SwitchText>
    </SwitchContainer>
  );
};

SelectRol.defaultProps = {
  labelOn: "On",
  labelOff: "Off",
  isChecked: false,
  theme: {
    background: "#ccc",
    toggleActive: "#03e9f4", // Green
    toggleInactive: "#f40e03", // Red
    text: "#000",
  },
};

export default SelectRol;