const Notes = require("../../db/models/Note");
const {body, matchedData, validationResult} = require("express-validator");

// ======================== CREATE NOTES OF A USER. Endpoint:  /api/createnote =======================================
exports.createNote = async (req, res) => {
  // validaion error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // get validated data
  const validatedData = matchedData(req);
  try {
    const note = new Notes({
      userid: req.user.id,
      title: validatedData.title,
      description: validatedData.description,
      tag: validatedData.tag,
      date: req.body.date,
    });

    await note.save();

    return res
      .status(201)
      .json({message: "Note created successfully", note: note});
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({message: "Validation error", errors: error.errors});
    } else if (error.code === 11000) {
      // Duplicate key error: Unique constraint violated
      return res
        .status(400)
        .json({message: "Duplicate key error: Unique constraint violated"});
    } else {
      return res.status(500).json({message: "Internal Server Error"});
    }
  }
};

// ======================== FETCH ALL NOTES OF USER. Endpoint:  /api/fetchnote =======================================
exports.fetchNotes = async (req, res) => {
  try {
    const fetchedNotes = await Notes.find({userid: req.user.id});

    return res.status(200).json(fetchedNotes);
    //
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let responseMessage = "Internal Server Error";

    if (error.name === "ValidationError") {
      statusCode = 422;
      responseMessage = "Validation error";
    } else if (error.code === 11000) {
      statusCode = 400;
      responseMessage = "Duplicate key error: Unique constraint violated";
    }

    return res
      .status(statusCode)
      .json({message: responseMessage, errors: error.errors});
  }
};

// ======================== UPDATE  NOTE OF USER. Endpoint:  /api/updatenews =======================================
exports.updateNotes = async (req, res) => {
  // validaion error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // get validated data
  const {title, description, tag} = matchedData(req);

  try {
    const givenNoteID = req.params.id;

    // Create object for updated note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Fetch note and update it
    const note = await Notes.findById(givenNoteID);
    if (!note) return res.status(404).json({message: "Not Found"});

    // Checking is user is accessing its own notes or not
    if (note.userid.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized"});
    }

    // Updating your notess
    const updatedNotes = await Notes.findByIdAndUpdate(givenNoteID, newNote, {
      new: true,
    });

    res.json({message: "Note updated", note: updatedNotes});
    //
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let responseMessage = "Internal Server Error";

    if (error.name === "ValidationError") {
      statusCode = 422;
      responseMessage = "Validation error";
    } else if (error.code === 11000) {
      statusCode = 400;
      responseMessage = "Duplicate key error: Unique constraint violated";
    }

    return res
      .status(statusCode)
      .json({message: responseMessage, errors: error.errors});
  }
};

// ======================== DELETE  NOTE OF USER. Endpoint:  /api/deletenote =======================================
exports.deleteNotes = async (req, res) => {
  try {
    const givenNoteID = req.params.id;

    // Fetch note and Delete it
    const note = await Notes.findById(givenNoteID);
    if (!note) return res.status(404).json({message: "Not Found"});

    // Checking is user is accessing its own notes or not
    if (note.userid.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized"});
    }

    // Updating your notess
    const updatedNotes = await Notes.findByIdAndDelete(givenNoteID);

    res.status(200).json({message: "Note deleted.", note: updatedNotes});
    //
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let responseMessage = "Internal Server Error";

    if (error.name === "ValidationError") {
      statusCode = 422;
      responseMessage = "Validation error";
    } else if (error.code === 11000) {
      statusCode = 400;
      responseMessage = "Duplicate key error: Unique constraint violated";
    }

    return res
      .status(statusCode)
      .json({message: responseMessage, errors: error.errors});
  }
};
