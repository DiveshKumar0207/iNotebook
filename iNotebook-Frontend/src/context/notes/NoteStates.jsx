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
    try {
      // api call
      const response = await fetch(`${host}/api/note/fetchnote`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // setting allNotes via useState hook(client side work)
      setAllNotes(data);
      //
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  // === ADD A NOTE ===
  const addNote = async (inputValue) => {
    const { title, description, tag } = inputValue;

    try {
      // api call
      const response = await fetch(`${host}/api/note/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // logic to update state for adding note(client side part only)
      const newNote = {
        ...inputValue,
        _id: data.note._id,
      };
      console.log("New note added with values ! ");

      setAllNotes(allNotes.concat(newNote));
      //
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  // === UPDATE A NOTE ===
  const updateNote = async (id, inputValue) => {
    const { title, description, tag } = inputValue;

    try {
      // api call
      const response = await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
      //
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  // === DELETE A NOTE ===
  const deleteNote = async (id) => {
    try {
      // api call
      const response = await fetch(`${host}/api/note/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // logic to update state  for del note(client side part only)
      const newNotes = allNotes.filter((note) => {
        return note._id !== id;
      });
      setAllNotes(newNotes);
      console.log("deleted note");
    } catch (error) {
      console.log("Error : ", error.message);
    }
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
