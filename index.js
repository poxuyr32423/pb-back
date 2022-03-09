import express from "express";
import bodyParser from "body-parser";
import database from "./database.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/payment-history", async (req, res) => {
  const payments = await database.getPaymentHistory();
  res.json(payments);
});

app.post("/add-payment", async (req, res) => {
  const sender_name = req.body.sender_name;
  const sender_card = req.body.sender_card;
  const receiver_name = req.body.receiver_name;
  const receiver_card = req.body.receiver_card;
  const amount = req.body.amount;
  const day = req.body.day;
  const time = req.body.time;
  await database.addPayment(sender_name, sender_card, receiver_name, receiver_card, amount, day, time);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
