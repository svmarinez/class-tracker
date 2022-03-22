const router = require("./routes/index");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");
const path = require("path");

//Load config

dotenv.config({ path: "./config/config.env" });

//Connect to database

connectDB();

//Initialize app

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
    defaultLayout: "main",
  })
);

//Register public/stylesheets/related JS scripts
app.use(express.static(path.join(__dirname, "public")));
app.get("/materialize.min.css", function (req, res) {
  res.sendFile(
    __dirname + "/node_modules/materialize-css/dist/css/materialize.min.css"
  );
});
app.get("/materialize.min.js", function (req, res) {
  res.sendFile(
    __dirname + "/node_modules/materialize-css/dist/js/materialize.min.js"
  );
});

//Routing config

app.use("/", require("./routes/index"));

//process.env will call from the config.file
const PORT = process.env.PORT || 3000;

app.listen(
  3000 || 5000,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
