import { useState } from "react";
import AlertContext from "./AlertContext";
import PropType from "prop-types";

const AlertStates = (props) => {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleAlertDialogOpen = () => {
    setIsAlertDialogOpen(!isAlertDialogOpen);
  };

  const [alertBar, setAlertBar] = useState({
    state: "hidden",
    message: "",
  });

  const handleAlertBar = (usermsg) => {
    setAlertBar({
      state: "block",
      message: usermsg,
    });

    setTimeout(() => {
      setAlertBar({
        state: "hidden",
        message: "",
      });
    }, 1500);
  };

  return (
    <AlertContext.Provider
      value={{
        isAlertDialogOpen,
        setIsAlertDialogOpen,
        handleAlertDialogOpen,
        alertBar,
        handleAlertBar,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

AlertStates.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
  ]),
};

export default AlertStates;
