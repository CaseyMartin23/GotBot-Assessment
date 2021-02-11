"use strict";

const app = require("express")();
const bodyParser = require("body-parser");
const routes = require("./routes");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => console.log(`Webhook running on PORT: ${PORT}...`));
