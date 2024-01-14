import { useContext, useEffect } from "react";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import NotesContainer from "./NotesContainer";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";

export default function Home() {
  const navigate = useNavigate();

  const alertContext = useContext(AlertContext);
  const { setIsAlertDialogOpen } = alertContext;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
      setIsAlertDialogOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {localStorage.getItem("token") && (
        <div>
          <div className="px-16 py-12">
            <div className="sticky top-24 z-10 overflow-hidden ">
              <AddNoteForm />
              <EditNoteForm />
            </div>

            <NotesContainer />
          </div>
        </div>
      )}
    </>
  );
}
