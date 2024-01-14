import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import AlertContext from "../context/alert/AlertContext";

export default function AlertDialog() {
  const alertContext = useContext(AlertContext);
  const { isAlertDialogOpen, handleAlertDialogOpen } = alertContext;

  return (
    <>
      <Dialog
        open={isAlertDialogOpen}
        size={"xs"}
        handler={handleAlertDialogOpen}
      >
        <DialogHeader>Please Login First.</DialogHeader>
        <DialogBody>
          Your session has been expired.<br></br>{" "}
        </DialogBody>
        <DialogFooter>
          {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
          <Button
            variant="gradient"
            color="light-green"
            onClick={handleAlertDialogOpen}
          >
            <span>Okay !</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
