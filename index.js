const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');


const app = express();

const http = require("http").Server(app);

let DB_URL = config.DB.URL

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.use(routes);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = config.PORT;
    const HOST = config.HOST;
    http.listen(PORT, HOST, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on "
        )} http://${chalk.bgMagenta.white(HOST)}:${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(chalk.red(err)));