import { useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Badge,
} from "@material-tailwind/react";
import PropType from "prop-types";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import NoteContext from "../context/notes/NoteContext";
import { showToast } from "../utils/ToastHandler";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote, openEditForm } = context;

  const { note } = props;
  return (
    <div>
      <Badge
        color="amber"
        content={note.tag}
        className="absolute right-6 top-0 px-[10px]  py-[5px]"
      >
        <Card className=" w-64 border-2 border-[#e0e0e0] p-0">
          <CardBody className="p-0">
            <div className=" px-4 pt-3">
              <Typography variant="h6" color="blue-gray">
                {note.title}
              </Typography>
            </div>

            <div className=" px-4 py-3">
              <Typography variant="small">{note.description}</Typography>
            </div>
          </CardBody>
          <CardFooter className=" flex h-12 gap-4 px-3 pb-2 pt-0">
            <TrashIcon
              strokeWidth={2}
              className=" w-5 cursor-pointer"
              onClick={() => {
                deleteNote(note._id);
                showToast("Note has been deleted !", "success");
              }}
            />
            <PencilSquareIcon
              strokeWidth={2}
              className=" w-5 cursor-pointer"
              onClick={() => {
                openEditForm(note);
              }}
            />
          </CardFooter>
        </Card>
      </Badge>
    </div>
  );
}

NoteItem.propTypes = {
  note: PropType.object,
};
