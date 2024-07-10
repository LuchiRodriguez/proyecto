import {
  SwitchContainer,
  SwitchInput,
  SwitchSlider,
  SwitchText,
} from "../app/Styles";
import { useState } from "react";

const SelectRol = ({
  labelOn,
  labelOff,
  ischecked,
  onChange,
  theme,
  setRol,
}) => {
  const [checked, setChecked] = useState(ischecked);

  const handleToggle = () => {
    setChecked(!checked);
    onChange && onChange(!checked); // Call provided onChange function
    if (!checked) {
      setRol("player");
    } else {
      setRol("watcher");
    }
  };

  return (
    <SwitchContainer theme={theme}>
      <SwitchInput
        type="checkbox"
        checked={checked}
        onChange={() => handleToggle()}
      />
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
    text: "#202124",
  },
};

export default SelectRol;
