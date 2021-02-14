const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

mongoose
  .connect("mongodb://db:27017/messenger_app_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.emit("test-event", "message for user");
    });

    server.listen(PORT, () => {
      console.log(`Server listening on PORT: ${PORT}...`);
    });
  });
