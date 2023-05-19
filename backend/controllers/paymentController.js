const Razorpay = require("razorpay");
const payment = async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  instance.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
  res.status(201).send({ success: true, order, amount });
};
