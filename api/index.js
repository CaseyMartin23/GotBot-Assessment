const app = require("express")();
const server = require("http").createServer(app);
const axios = require("axios");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./db/userModel");
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
      require("./routes/webhooks").setSocket(io);
      console.log("a user connected");

      socket.emit("test-event", "message for user");

      socket.on("agent-message", (data) => {
        const message = data.response.message;
        axios({
          method: "POST",
          url: `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
          data: {
            recipient: { id: data.userId },
            message: { text: message },
          },
        })
          .then(() => {
            UserModel.findOne({ user_id: data.userId }).then((user) => {
              if (user) {
                user.messages.push(data.response);
                user.save();
              }
            });
            console.log("message sent!!!");
          })
          .catch((err) => {
            console.error("Unable to send message:", err);
          });
      });
    });

    server.listen(PORT, () => {
      console.log(`Server listening on PORT: ${PORT}...`);
    });
  });
