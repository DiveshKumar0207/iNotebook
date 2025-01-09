import { useEffect } from "react";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import NotesContainer from "./NotesContainer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
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
