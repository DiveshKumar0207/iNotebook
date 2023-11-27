import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

export default function NotesContainer() {
  const context = useContext(NoteContext);
  const { allNotes, fetchNotes } = context;

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-8 flex flex-wrap gap-6 ">
      {allNotes.map((note) => {
        return (
          <div key={note._id}>
            <NoteItem note={note} />
          </div>
        );
      })}
    </div>
  );
}
