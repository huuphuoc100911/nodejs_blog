const express = require("express");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
var path = require("path");
const app = express();
const port = 3000;

const route = require("./routes");

//Config thư mục public
app.use(express.static(path.join(__dirname, "public")));

//Middleware, display post formData
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// XMLHttpRequest, fetch, axios

// app.use(morgan("combined"));

//Template Engine
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
//Config thư mục views
app.set("views", path.join(__dirname, "resources/views"));

//Router init
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
