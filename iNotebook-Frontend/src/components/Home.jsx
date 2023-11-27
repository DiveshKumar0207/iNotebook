import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import NotesContainer from "./NotesContainer";

export default function Home() {
  return (
    <div>
      <div className="px-16 py-12">
        <div className="sticky top-24 z-10 overflow-hidden ">
          <AddNoteForm />
          <EditNoteForm />
        </div>

        <NotesContainer />
      </div>
    </div>
  );
}
