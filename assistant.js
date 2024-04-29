require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
// import Anthropic from "@anthropic-ai/sdk";
const { Anthropic } = require("@anthropic-ai/sdk");

const PORT = process.env.PORT || 3400;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

app.post("/assistant", async (req, res) => {
  const { role, content } = req.body;
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1024,
    messages: [{ role, content }],
  });
  console.log(msg);
  res.json(msg.content.map((m) => m.text));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
