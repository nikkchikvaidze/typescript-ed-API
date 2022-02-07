const express = require("express");
const path = require("path");
const open = require("open");

import webpack from "webpack";
import config from "../webpack.config.js";
import webpackDevMiddleware from "webpack-dev-middleware";

const port = 4000;
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
