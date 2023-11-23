const notes = require("../../db/models/Note");
const {body, matchedData, validationResult} = require("express-validator");

exports.note = async (req, res) => {
  // validaion error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // get validated data
  const validatedData = matchedData(req);
  try {
    const note = new notes(validatedData);

    await note.save();
    return res.status(201).json({message: "notes created successfully"});
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
