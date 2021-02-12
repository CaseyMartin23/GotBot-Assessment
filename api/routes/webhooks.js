const router = require("express").Router();
const axios = require("axios");

const callSendApi = (senderPsid, response) => {
  axios({
    method: "POST",
    url: `https://graph.facebook.com/v9.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
    data: {
      recipient: { id: senderPsid },
      message: response,
    },
  })
    .then(() => {
      console.log("message sent!!!");
    })
    .catch((err) => {
      console.error("Unable to send message:", err);
    });
};

const handleMessage = (senderPsid, receivedMessage) => {
  let response;

  if (receivedMessage.text) {
    response = {
      text: `You sent the message: "${receivedMessage.text}". Now send me an image!`,
    };
  }
  if (receivedMessage.attachments) {
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [],
        },
      },
    };

    receivedMessage.attachments.forEach((attachment) => {
      const element = {
        title: "Is this the right picture?",
        subtitle: "Tap a button to answer.",
        image_url: attachment.payload.url,
        buttons: [
          {
            type: "postback",
            title: "Yes!",
            payload: "yes",
          },
          {
            type: "postback",
            title: "No!",
            payload: "no",
          },
        ],
      };

      response.attachment.payload.elements = [
        ...response.attachment.payload.elements,
        element,
      ];
    });
  }

  callSendApi(senderPsid, JSON.stringify(response));
};

const handlePostback = (senderPsid, receivedPostback) => {
  let response;
  let payload = receivedPostback.payload;

  if (payload === "yes") {
    response = { text: "Thanks!" };
  }
  if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }

  callSendApi(senderPsid, response);
};

router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode &&
    token &&
    mode === "subscribe" &&
    token === process.env.VERIFY_TOKEN
  ) {
    console.log("WEBHOOK_VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post("/webhook", (req, res) => {
  const body = req.body;

  if (body && body.object === "page" && body.entry) {
    body.entry.forEach((event) => {
      const [webhook_event] = event.messaging;
      console.log(webhook_event);

      const sender_psid = webhook_event.sender.id;
      console.log(`Sender PSID: ${sender_psid}`);

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
