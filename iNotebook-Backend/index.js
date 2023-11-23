const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("./db/connections/connect");
const routes = require("./server/routes/route");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(
    `server running at ${PORT} || http://127.0.0.1:${PORT} || http://localhost:${PORT}`
  );
});
