import { useState } from "react";
import PropType from "prop-types";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:3000";

  const [allNotes, setAllNotes] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editFormInitialValues, setEditFormInitialValues] = useState("");

  const openEditForm = (noteData) => {
    setEditFormInitialValues(noteData);
    setIsEditFormOpen(true);
    setAllNotes(allNotes);
  };

  // === FETCH NOTES FUNCTION ====
  const fetchNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/note/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWZiM2EzMThlM2ZhMDJmMDMwZTgyMCJ9LCJpYXQiOjE3MDEwMTcwMjd9.X51ZQndUB1DX06ew0Tkz2MjCHAmBGTZtgYlL6aZ1oxE",
      },
    });
    const data = await response.json();

    // setting allNotes via useState hook(client side work)
    setAllNotes(data);
  };

  // === ADD A NOTE ===
  const addNote = async (inputValue) => {
    const { title, description, tag } = inputValue;
    // api call
    const response = await fetch(`${host}/api/note/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWZiM2EzMThlM2ZhMDJmMDMwZTgyMCJ9LCJpYXQiOjE3MDEwMTcwMjd9.X51ZQndUB1DX06ew0Tkz2MjCHAmBGTZtgYlL6aZ1oxE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();

    // logic to update state for adding note(client side part only)
    const newNote = {
      ...inputValue,
      _id: data.note._id,
    };
    console.log("New note added with values: ");

    setAllNotes(allNotes.concat(newNote));
  };

  // === UPDATE A NOTE ===
  const updateNote = async (id, inputValue) => {
    const { title, description, tag } = inputValue;
    // api call
    await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWZiM2EzMThlM2ZhMDJmMDMwZTgyMCJ9LCJpYXQiOjE3MDEwMTcwMjd9.X51ZQndUB1DX06ew0Tkz2MjCHAmBGTZtgYlL6aZ1oxE",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const newNotes = JSON.parse(JSON.stringify(allNotes));
    for (let index = 0; index < newNotes.length; index++) {
      const note = newNotes[index];

      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
        break;
      }
    }
    setAllNotes(newNotes);
    console.log("note updated");
  };

  // === DELETE A NOTE ===
  const deleteNote = async (id) => {
    // api call
    await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY1NWZiM2EzMThlM2ZhMDJmMDMwZTgyMCJ9LCJpYXQiOjE3MDEwMTcwMjd9.X51ZQndUB1DX06ew0Tkz2MjCHAmBGTZtgYlL6aZ1oxE",
      },
    });

    // logic to update state  for del note(client side part only)
    const newNotes = allNotes.filter((note) => {
      return note._id !== id;
    });
    setAllNotes(newNotes);
    console.log("deleted note");
  };

  return (
    <NoteContext.Provider
      value={{
        allNotes,
        setAllNotes,
        isEditFormOpen,
        setIsEditFormOpen,
        editFormInitialValues,
        setEditFormInitialValues,
        openEditForm,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

NoteState.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node,
  ]),
};

export default NoteState;
